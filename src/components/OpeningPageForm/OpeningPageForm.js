import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, TextField, Grid, Button, Checkbox, FormControlLabel, CircularProgress, Paper, Box } from '@mui/material';
import logo from '../../images/logo.png';
import testFile from '../../Doc/test.docx';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import PizZip from 'pizzip';
import ImageModule from 'docxtemplater-image-module-free';
import { useApi } from "../../api";
import Scenario from "../Scenario/Scenario";
import { useTheme } from '@mui/material/styles';

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


function OpeningPageForm() {
  const classes = useStyles();
  const { getScenarios } = useApi();
  const [selectedScenarios, setSelectedScenarios] = useState([]);
  const [imageData, setImageData] = useState('');
  const [formData, setFormData] = useState({companyName: '',documentName: '', imageTag: '',date: ''});
  const [scenarios, setScenarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');  
  const theme = useTheme();

  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        const response = await getScenarios();
        const approvedScenarios = response.data.filter(scenario => scenario.status === 'Approved');
        setScenarios(approvedScenarios);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchScenarios();
  },[getScenarios]);
  

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

  // const AddScenarios = (scenarios) => {
  //   setSceneriosData(scenarios);
  // };

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
  
    const output = doc.getZip().generate({ type: 'blob' });
    saveAs(output, 'output.docx');
  }
  

  const handleSubmit = (event) => {
    event.preventDefault();    
    generateDocx(formData, selectedScenarios);
    setSelectedScenarios([]);
  }

  
  
  return (
    
    <Container component="main" maxWidth="md">
      <div className={classes.formContainer}>
        <img src={logo} alt="Company Logo" className={classes.logo} />
        <Typography component="h1" variant="h5" style={{color: "#Oe1625"}}>
          Opening Page
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="documentName"
                label={<span style={{ color: theme.palette.mode === 'dark' ? '#45edf2' : '#49299a', fontWeight: 'bold' }}>Document Name</span>}
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
                label={<span style={{ color: theme.palette.mode === 'dark' ? '#45edf2' : '#49299a' , fontWeight: 'bold' }}>Date</span>}
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
                label={<span style={{ color: theme.palette.mode === 'dark' ? '#45edf2' : '#49299a' , fontWeight: 'bold' }}>Company Name</span>}
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
                  Add Company Image
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
                Select Scenarios
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", marginBottom: '16px' }}>
                <Paper elevation={3}>
                  <TextField
                    label={<span style={{ color: theme.palette.mode === 'dark' ? '#45edf2' : '#49299a' }}>Search Scenarios</span>}
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </Paper>
              </Box>
              {!isLoading ? (
                filteredScenarios.map((scenario, index) => (
                  <div key={index}>
                    <Scenario scenario={scenario} />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedScenarios.includes(scenario)}
                          onChange={(event) => handleScenarioSelectionChange(scenario, event.target.checked)}
                          name={scenario.name}
                          color="primary"
                        />
                      }
                      label={
                        <span style={{ color: '#Oe1625', fontWeight: 'bold' }}>
                          Select this scenario ({scenario.scenarioTitle})
                        </span>
                      }
                    />
                  </div>
                ))
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
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default OpeningPageForm;
