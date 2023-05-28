import React from 'react';
import { Button, Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import WhiteHatLogo from '../../images/ReportForgeBackground.png';

// Define styles
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundImage: `url(${WhiteHatLogo})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
}));

const EnglishMenu = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Box>
        <Link to="/englishReport">
            <Button variant="contained" color="primary" className={classes.button}>
            Create a Report
            </Button>
        </Link>
        <Button variant="contained" color="primary" className={classes.button}>
          Create Scenario
        </Button>
        <Button variant="contained" color="primary" className={classes.button}>
          Approve and Edit Scenario
        </Button>
      </Box>
    </div>
  );
}

export default EnglishMenu;
