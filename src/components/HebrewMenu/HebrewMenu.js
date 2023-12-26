import React from 'react';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import createReport from '../../images/hebrewReportCreate.png'
import Approve from '../../images/hebrewApprove.png'
import Scenario from '../../images/createHebrewSceanrio.png'
import Back from '../../images/back-button.png'
import whiteBack from '../../images/white-back.png'
import { useTheme } from '@mui/material/styles';

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
  cardDark: {
    background: '#161618',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(1),
    width: '300px',
    height: '400px',
    boxShadow: '0 3px 6px rgba(255,255,255,0.6), 0 3px 6px rgba(255,255,255,0.6)',
    borderRadius: '10px',
    transition: "0.3s",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: '0 3px 6px rgba(255,255,255,0.6), 0 3px 6px rgba(255,255,255,0.6)',
    },
  },
  media: {
    height: 200, 
    width: 200,
  },
  
}));

const HebrewMenu = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.container}>
      <Link to="/home" style={{ textDecoration: 'none',position: 'absolute', top: '0', left: '0', marginTop: '100px', marginLeft: '20px'}}>
        <img
          style={{width: "50px", height: "50px"}}
          src={theme.palette.mode === "dark" ?  whiteBack : Back}
          alt="Report"
        />
      </Link>
      <Grid container direction="row" alignItems="center" justifyContent="center">
        <Grid item>
          <Link to="/hebrewReport" style={{ textDecoration: 'none' }}>
            <Card className={theme.palette.mode === 'dark' ? classes.cardDark:classes.card}>
              <img
                className={classes.media}
                src={createReport}
                alt="Report"
              />
              <CardContent>
                    <Typography variant="h4" style={{ color: theme.palette.mode === 'dark' ? '#D1D1D1':'#1d3557', fontWeight: 'bold'}}>
                      יצירת דוח
                    </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/hebrewScenarioCreate" style={{ textDecoration: 'none' }}>
            <Card className={theme.palette.mode === 'dark' ? classes.cardDark:classes.card}>
              <img
                className={classes.media}
                src={Scenario}
                alt="Report"
              />
              <CardContent>
                  <Typography variant="h4" style={{ color: theme.palette.mode === 'dark' ? '#D1D1D1':'#1d3557', fontWeight: 'bold'}}>
                    יצירת תרחיש
                    </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/hebrewScenarioList" style={{ textDecoration: 'none' }}>
            <Card className={theme.palette.mode === 'dark' ? classes.cardDark:classes.card}>
              <img
                className={classes.media}
                src={Approve}
                alt="Report"
              />
              <CardContent>
                  <Typography variant="h5" style={{ color: theme.palette.mode === 'dark' ? '#D1D1D1':'#1d3557', fontWeight: 'bold'}}>
                    אישור ועריכת תרחישים
                  </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default HebrewMenu;
