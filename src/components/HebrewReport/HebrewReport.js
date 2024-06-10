import React from 'react';
import { useState, useEffect,useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, TextField, Grid, Button, Checkbox, FormControlLabel, CircularProgress, Paper, Box } from '@mui/material';
import logo from '../../images/logo.png';
import testFile from '../../Doc/hebrewReport.docx';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import PizZip from 'pizzip';
import ImageModule from 'docxtemplater-image-module-free';
import { useApi } from "../../api";
import { useTheme } from '@mui/material/styles';
import HebrewScenario from '../Scenario/HebrewScenario';
import Back from '../../images/back-button.png';
import whiteBack from '../../images/white-back.png';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    width: '200px',
    marginBottom: '30px',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  input: {
    display: 'none',
  },
  button: {
    margin: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


function HebrewReport() {
  const classes = useStyles();
  const { getHebrewScenarios, removeAllPhotosFromHebrewScenarios } = useApi();
  const [selectedScenarios, setSelectedScenarios] = useState([]);
  const [imageData, setImageData] = useState('');
  const [formData, setFormData] = useState({companyName: '',documentName: '', imageTag: '',date: ''});
  const [scenarios, setScenarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');  
  const theme = useTheme();

  const fetchScenarios = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getHebrewScenarios();
      const approvedScenarios = response.data.filter(scenario => scenario.status === 'Approved');
      setScenarios(approvedScenarios);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [getHebrewScenarios]); // Assuming getScenarios doesn't change, or include its dependencies as needed



  useEffect(() => {
    fetchScenarios();
  }, [fetchScenarios]);

  

  const handleScenarioSelectionChange = (scenario, isChecked) => {
    if (isChecked) {
      setSelectedScenarios((prevScenarios) => [...prevScenarios, scenario]);
    } else {
      setSelectedScenarios((prevScenarios) => prevScenarios.filter((sc) => sc.name !== scenario.name));
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredScenarios = scenarios.filter(scenario =>
    scenario.scenarioTitle?.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleImageChange = (event, name) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({...formData, [name]: reader.result});
        setImageData(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({...formData,[name]: value,});
  };


  async function generateDocx(formData, scenarios) {
    var counter = 0;
    const templateResponse = await fetch(testFile);
    const templateArrayBuffer = await templateResponse.arrayBuffer();
    const zip = new PizZip(templateArrayBuffer);
  
    const imageModuleOptions = {
      centered: false,
      getImage: (tagValue, tagName) => {
        // Only handle imageTag
        if (tagName === 'imageTag') {
          return atob(tagValue.split(',')[1]);
        }
      },
      getSize: (img, tagValue, tagName) => {
        // Only handle imageTag
        if (tagName === 'imageTag') {
          return [600, 150]; // You can customize the image size here, e.g., [width, height]
        }
      },
    };

    console.log(scenarios);
  
    const doc = new Docxtemplater()
      .attachModule(new ImageModule(imageModuleOptions))
      .loadZip(zip);
  
    doc.setData({
      ...formData,
      scenarios: (scenarios).map((scenario, index) => ({
        ...scenario,
        scenarioNumber: ++counter,
        recommendations: scenario.recommendations,
        photos: scenario.photos.map((photo) => ({imageTag: photo})),
        attackFlow: scenario.attackFlow.map((attackFlow) => ({imageTag: attackFlow})),
        // Add any other necessary transformations to the scenario object here
      })),
    });
    doc.render();
    console.log(doc);
    const output = doc.getZip().generate({ type: 'blob' });
    saveAs(output, `${formData.documentName}.docx`);
    await removeAllPhotosFromHebrewScenarios();
    setSelectedScenarios([]);
    fetchScenarios();
  }
  

  const handleSubmit = (event) => {
    event.preventDefault();    
    generateDocx(formData, selectedScenarios);
  }

  
  
  return (
    
    <Container component="main" maxWidth="md">
      <div className={classes.formContainer}>
        <img src={logo} alt="Company Logo" className={classes.logo} />
        <Typography component="h1" variant="h5" style={{color: "#Oe1625"}}>
          דף הפתיחה
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="documentName"
                label={<span style={{ color: theme.palette.mode === 'dark' ? '#45edf2' : '#49299a', fontWeight: 'bold' }}>כותרת הדוח</span>}
                name="documentName"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="date"
                label={<span style={{ color: theme.palette.mode === 'dark' ? '#45edf2' : '#49299a' , fontWeight: 'bold' }}>תאריך</span>}
                name="date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="companyName"
                label={<span style={{ color: theme.palette.mode === 'dark' ? '#45edf2' : '#49299a' , fontWeight: 'bold' }}>שם החברה</span>}
                name="companyName"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                accept="image/*"
                className={classes.input}
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={(event)=> handleImageChange(event,'imageTag')}
                name='imageTag'
              />
              <label htmlFor="raised-button-file">
              <Grid container justifyContent="center">
                <Button variant="contained" color="secondary" component="span" className={classes.button} style={{background: theme.palette.mode === 'dark' ? '#45edf2' : '#49299a' , marginBottom: "40px"}}>
                  הוסף תמונת חברה
                </Button>
              </Grid>
              </label>
            </Grid>
              {imageData && (
                <Grid item xs={12} style={{display: 'flex',justifyContent: 'center',alignItems: 'center',}}>
                  <img src={imageData} alt="Chosen Company" style={{ maxWidth: '25%', height: 'auto' }} />
                </Grid>
              )}
            <Grid item xs={12}>
              <Typography variant="h5" style={{color: "#Oe1625"}}>
                בחר תרחישים
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", marginBottom: '16px' }}>
                <Paper elevation={3}>
                  <TextField
                    label={<span style={{ color: theme.palette.mode === 'dark' ? '#45edf2' : '#49299a' }}>חפש תרחישים</span>}
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </Paper>
              </Box>
              {!isLoading ? (
                filteredScenarios.length > 0 ? (
                  filteredScenarios.map((scenario, index) => (
                    <div key={index} >
                      <HebrewScenario refreshScenarios={fetchScenarios} scenario={scenario} uploadPage={true} />
                      <Box display="flex" justifyContent="flex-end">
                        <FormControlLabel
                          style={{ direction: 'rtl',  textAlign: 'right'}}
                          control={
                            <Checkbox
                              checked={selectedScenarios.includes(scenario)}
                              onChange={(event) => handleScenarioSelectionChange(scenario, event.target.checked)}
                              name={scenario.name}
                              color="primary"
                            />
                          }
                          label={
                            <span style={{ color: '#Oe1625', fontWeight: 'bold'}}>
                              בחר את התרחיש הזה : ({scenario.scenarioTitle})
                            </span>
                          }
                        />
                      </Box>
                    </div>
                  ))
                ) : (
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography variant="body1">אין תרחישים</Typography>
                  </Box>
                )
              ) : (
                <CircularProgress /> 
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
                style={{ background: theme.palette.mode === 'dark' ? '#45edf2' : '#49299a'  }}
              >
                צור דוח
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default HebrewReport;
