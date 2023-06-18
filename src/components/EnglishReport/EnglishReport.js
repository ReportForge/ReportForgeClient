import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@mui/material';
import OpeningPageForm from '../OpeningPageForm/OpeningPageForm';
import Back from '../../images/back-button.png'
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
}));

function EnglishReport() {
  const classes = useStyles();

  return (
    <>
      <Link to="/english" style={{ textDecoration: 'none',position: 'absolute', top: '0', left: '0', marginTop: '100px', marginLeft: '20px'}}>
          <img
            style={{width: "50px", height: "50px"}}
            src={Back}
            alt="Report"
          />
      </Link>
      <Paper className={classes.root}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h4" className={classes.title} style={{color: "#Oe1625"}}>
            English Report
          </Typography>
        </div>
          <OpeningPageForm/>
      </Paper>
    </>
  );
}

export default EnglishReport;
