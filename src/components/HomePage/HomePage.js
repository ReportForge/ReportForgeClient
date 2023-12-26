import React from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import EnglishReport from '../../images/EnglishReport.png';
import HebrewReport from '../../images/HebrewReport.png';
import { useApi } from '../../api'; // make sure to import useApi
import { useNavigate } from 'react-router-dom';
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
  topRight: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
  whiteTextButton: {
    color: 'blue',
    background: 'white'
  },
}));

function HomePage() {
  const classes = useStyles();
  const api = useApi(); // get api from useApi hook
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLogout = async () => {
    try {
      await api.logout(); // call the logout function from your api
      localStorage.removeItem('loginResult'); // remove the login result from local storage
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.topRight}>
        <Button className={theme.palette.mode === 'dark' ? classes.whiteTextButton : ''} variant={theme.palette.mode === 'dark' ?"outlined":"contained"} color="primary" onClick={handleLogout}>Logout</Button>
      </div>
      <Grid container direction="row" alignItems="center" justifyContent="center">
        <Grid item>
          <Link to="/english" style={{ textDecoration: 'none' }}>
            <Card className={theme.palette.mode === 'dark' ? classes.cardDark:classes.card}>
              <img
                className={classes.media}
                src={EnglishReport}
                alt="English Report"
              />
              <CardContent>
                <Typography variant="h4" style={{ color: theme.palette.mode === 'dark' ? '#D1D1D1':'#1d3557', fontWeight: 'bold'}}>
                  English Report
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/hebrewMenu" style={{ textDecoration: 'none' }}>
            <Card className={theme.palette.mode === 'dark' ? classes.cardDark:classes.card}>
              <img
                className={classes.media}
                src={HebrewReport}
                alt="Hebrew Report"
              />
              <CardContent>
                <Typography variant="h4" style={{ color: theme.palette.mode === 'dark' ? '#D1D1D1':'#1d3557', fontWeight: 'bold'}}>
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
