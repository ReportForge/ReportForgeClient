import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container } from '@material-ui/core';
import WhiteHatLogo from '../../images/ReportForgeBackground.png';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${WhiteHatLogo})`,
    backgroundSize: 'cover',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: theme.spacing(5),
    fontSize: '2rem',
    fontWeight: 'bold',
    padding: '1rem 2rem',
    marginLeft: '4rem',
  }
}));

function HomePage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Container >
          <Link to="/english">
            <Button className={classes.button} variant="contained" color="primary">
                Create English Report
            </Button>
          </Link>
          <Link to="/Hebrew">
            <Button className={classes.button} variant="contained" color="secondary">
              Create Hebrew Report
            </Button>
          </Link>
        </Container>
    </div>
  );
}

export default HomePage;
