import React from "react";
import AppRouter from './AppRouter';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

function App() {

  const [darkMode, setDarkMode] = React.useState(false);

  const theme = darkMode ? darkTheme : lightTheme;

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Switch checked={darkMode} onChange={handleDarkModeToggle} />
      </Box>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;