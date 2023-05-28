import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid } from '@material-ui/core';
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
    marginLeft: '8rem',
  },
  gridItem: {
    width: '50%',
  }
}));

function HomePage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Container>
          <Grid container>
            <Grid item xs={12} md={6} className={classes.gridItem}>
              <Link to="/english">
                <Button className={classes.button} variant="contained" color="primary">
                    English Report
                </Button>
              </Link>
            </Grid>
            <Grid item xs={12} md={6} className={classes.gridItem}>
              <Link to="/Hebrew">
                <Button className={classes.button} variant="contained" color="secondary">
                  Hebrew Report
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Container>
    </div>
  );
}

export default HomePage;
