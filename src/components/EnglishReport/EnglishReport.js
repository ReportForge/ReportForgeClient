import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@mui/material';
import OpeningPageForm from '../OpeningPageForm/OpeningPageForm';

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
    <Paper className={classes.root}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h4" className={classes.title} style={{color: "#Oe1625"}}>
          English Report
        </Typography>
      </div>
        <OpeningPageForm/>
    </Paper>
  );
}

export default EnglishReport;
