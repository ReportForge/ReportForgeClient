import React from "react";
import AppRouter from './AppRouter';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Logo from './images/reportForge.png'
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  logo: {
    maxHeight: '70px', 
    marginBottom: theme.spacing(1),
  },
  topLeft: {
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  }
}));

function App() {
  const [darkMode, setDarkMode] = React.useState(false);
  const theme = darkMode ? darkTheme : lightTheme;
  const classes = useStyles();


  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Switch checked={darkMode} onChange={handleDarkModeToggle} />
      </Box>
      <div className={classes.topLeft}>
        <img
          src={Logo}
          alt="Logo"
          className={classes.logo}
        />
        <Typography variant="h5" className={classes.title} style={{color: '#Oe1625'}}>
          Report Forge
        </Typography>
      </div>
      <AppRouter/>
    </ThemeProvider>
  );
}

export default App;
