import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, TextField, Grid, Button } from '@mui/material';
import logo from '../../images/logo.png';
import testFile from '../../Doc/hebrew report.docx';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import PizZip from 'pizzip';
import ImageModule from 'docxtemplater-image-module-free';
import HebrewScenarioForm from '../ScenarioForm/HebrewScenarioForm';


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

function HebrewReportForm() {
    const classes = useStyles();
    const [imageData, setImageData] = useState('');
    const [formData, setFormData] = useState({companyName: '',documentName: '', imageTag: '',date: ''});
    const [scenariosData, setSceneriosData] = useState('');


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
    

      const AddScenarios = (scenarios) => {
        setSceneriosData(scenarios);
      };
    
      async function generateDocx(formData, scenariosData) {
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
              return [200, 100]; // You can customize the image size here, e.g., [width, height]
            }
          },
        };
      
        const doc = new Docxtemplater()
          .attachModule(new ImageModule(imageModuleOptions))
          .loadZip(zip);
    
        doc.setData({
          ...formData,
          scenarios: (scenariosData).map((scenario, index) => ({
            ...scenario,
            edrRecommendations: scenario.edrRecommendations,
            sysmonRecommendations: scenario.sysmonRecommendations,
            photos: scenario.photos.map((photo) => ({imageTag: photo})),
          })),
        });
        doc.render();
      
        const output = doc.getZip().generate({ type: 'blob' });
        saveAs(output, 'output.docx');
      }
    
      const handleSubmit = (event) => {
        event.preventDefault();    
        generateDocx(formData, scenariosData);
      }

  return (
    <Container component="main" maxWidth="md">
      <div className={classes.formContainer}>
        <img src={logo} alt="Company Logo" className={classes.logo} />
        <Typography component="h1" variant="h5">
          דף פתיחה 
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="title"
                label="כותרת"
                name="title"
                onChange={handleInputChange}
                dir="rtl"
                inputProps={{ style: { textAlign: 'right' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="date"
                label="תאריך"
                name="date"
                type="date"
                dir="rtl"
                inputProps={{ style: { textAlign: 'right' } }}
                InputLabelProps={{
                  shrink: true,
                }}
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
                onChange={(event) => handleImageChange(event, 'imageTag')}
                name="imageTag"
              />
              <label htmlFor="raised-button-file">
                <Grid container justifyContent="center">
                  <Button variant="contained" color="secondary" component="span" className={classes.button}>
                    תמונת החברה 
                  </Button>
                </Grid>
              </label>
            </Grid>
            {imageData && (
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={imageData} alt="Chosen Company" style={{ maxWidth: '25%', height: 'auto' }} />
              </Grid>
            )}
            <Grid item xs={12}>
              <HebrewScenarioForm onAddScenarios={AddScenarios} />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
              >
                שלח
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default HebrewReportForm;
