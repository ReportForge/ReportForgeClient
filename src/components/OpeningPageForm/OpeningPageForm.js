import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import logo from '../../images/logo.png';
import testFile from '../../Doc/test.docx';


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
}));

function OpeningPageForm() {
  const classes = useStyles();
  const [templateFile, setTemplateFile] = useState(null);
  const [documentName, setDocumentName] = useState('');
  const [date, setDate] = useState('');
  const [companyName, setCompanyName] = useState('');

  

  const handleSubmit = (event) => {
    event.preventDefault();

   
  }

  return (
    <Container component="main" maxWidth="md">
      <div className={classes.formContainer}>
        <img src={logo} alt="Company Logo" className={classes.logo} />
        <Typography component="h1" variant="h5">
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
                label="Document Name"
                name="documentName"
                onChange={(event) => setDocumentName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="date"
                label="Date"
                name="date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => setDate(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="companyName"
                label="Company Name"
                name="companyName"
                onChange={(event) => setCompanyName(event.target.value)}
              />
            </Grid>
            <button onClick={handleSubmit}>Submit</button>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default OpeningPageForm;
