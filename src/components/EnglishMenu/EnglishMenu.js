import React from 'react';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import createReport from '../../images/createReport.png'
import Approve from '../../images/approve.png'
import Scenario from '../../images/scenario.png'


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

const EnglishMenu = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid container direction="row" alignItems="center" justifyContent="center">
        <Grid item>
          <Link to="/englishReport" style={{ textDecoration: 'none' }}>
            <Card className={classes.card}>
              <img
                className={classes.media}
                src={createReport}
                alt="Report"
              />
              <CardContent>
                    <Typography variant="h4" style={{ color: '#1d3557', fontWeight: 'bold'}}>
                      Create a Report
                    </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/scenarioCreate" style={{ textDecoration: 'none' }}>
            <Card className={classes.card}>
              <img
                className={classes.media}
                src={Scenario}
                alt="Report"
              />
              <CardContent>
                  <Typography variant="h4" style={{ color: '#1d3557', fontWeight: 'bold'}}>
                    Create Scenario
                    </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/englishScenarioList" style={{ textDecoration: 'none' }}>
            <Card className={classes.card}>
              <img
                className={classes.media}
                src={Approve}
                alt="Report"
              />
              <CardContent>
                  <Typography variant="h5" style={{ color: '#1d3557', fontWeight: 'bold'}}>
                    Approve and Edit Scenarios
                  </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default EnglishMenu;
