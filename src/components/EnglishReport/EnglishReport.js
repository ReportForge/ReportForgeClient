import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
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
      <Typography variant="h4" className={classes.title}>
        English Report
      </Typography>
      {/* Add your additional components here */}
        <OpeningPageForm/>
    </Paper>
  );
}

export default EnglishReport;
