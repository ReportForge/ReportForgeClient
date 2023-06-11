import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import EnglishReport from '../../images/EnglishReport.png';
import HebrewReport from '../../images/HebrewReport.png';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(1),
    width: '300px',
    height: '400px',
    boxShadow: '0 3px 6px rgba(0,0,0,0.30), 0 3px 6px rgba(0,0,0,0.30)',
    borderRadius: '10px',
    transition: "0.3s",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: '0 5px 15px rgba(0,0,0,0.50), 0 5px 15px rgba(0,0,0,0.50)',
    },
  },
  media: {
    height: 200, 
    width: 200,
  },
}));

function HomePage() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid container direction="row" alignItems="center" justifyContent="center">
        <Grid item>
          <Link to="/english" style={{ textDecoration: 'none' }}>
            <Card className={classes.card}>
              <img
                className={classes.media}
                src={EnglishReport}
                alt="English Report"
              />
              <CardContent>
                <Typography variant="h4" style={{ color: '#1d3557', fontWeight: 'bold'}}>
                  English Report
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/hebrew" style={{ textDecoration: 'none' }}>
            <Card className={classes.card}>
              <img
                className={classes.media}
                src={HebrewReport}
                alt="Hebrew Report"
              />
              <CardContent>
                <Typography variant="h4" style={{ color: '#1d3557', fontWeight: 'bold'}}>
                  Hebrew Report
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default HomePage;
