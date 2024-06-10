import React, { useEffect, useState } from "react";
import { Typography, CircularProgress, Box, TextField, Paper } from "@mui/material";
import HebrewScenario from "../Scenario/HebrewScenario";
import { useApi } from "../../api";
import { useTheme } from '@mui/material/styles';
import Back from '../../images/back-button.png';
import whiteBack from '../../images/white-back.png';
import { Link } from 'react-router-dom';

export default function HebrewScenarioList() {
  const { getHebrewScenarios } = useApi();
  const [hebrewScenarios, setHebrewScenarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchHebrewScenarios = async () => {
      try {
        const response = await getHebrewScenarios();
        setHebrewScenarios(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchHebrewScenarios();
  }, [getHebrewScenarios]);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  }

  const filteredHebrewScenarios = hebrewScenarios.filter(hebrewScenario =>
    hebrewScenario.scenarioTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Typography variant="h5" sx={{ margin: '16px' , color: '#1d3557', fontWeight: 'bold', display: 'flex', justifyContent: 'center'}}>
        תרחישים
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: '16px' }}>
        <Paper elevation={3}>
          <TextField
            label={<span style={{ color: theme.palette.mode === 'dark' ? '#45edf2' : '#49299a', fontWeight: 'bold' }}>חיפוש:</span>}
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
          />
        </Paper>
      </Box>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
          <CircularProgress /> 
        </Box>
      ) : (
        filteredHebrewScenarios && filteredHebrewScenarios.length > 0 ? (
          filteredHebrewScenarios.map((hebrewScenario, index) => (
            <HebrewScenario key={index} scenario={hebrewScenario}/>
          ))
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
            <Typography variant="body1">לא נמצאו תרחישים</Typography>
          </Box>
        )
      )}
    </div>
  );
}
