import React, { useEffect, useState } from "react";
import { Typography, CircularProgress, Box, TextField, Paper } from "@mui/material";
import { useApi } from "../../api";
import Scenario from "../Scenario/Scenario";
import { useTheme } from '@mui/material/styles';
import Back from '../../images/back-button.png'
import { Link } from 'react-router-dom';

export default function ScenarioList() {
  const { getScenarios } = useApi();
  const [scenarios, setScenarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        const response = await getScenarios();
        setScenarios(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchScenarios();
  }, [getScenarios]);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  }

  const filteredScenarios = scenarios.filter(scenario =>
    scenario.scenarioTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Link to="/english" style={{ textDecoration: 'none',position: 'absolute', top: '0', left: '0', marginTop: '100px', marginLeft: '20px'}}>
          <img
            style={{width: "50px", height: "50px"}}
            src={Back}
            alt="Report"
          />
      </Link>
      <Typography variant="h5" sx={{ margin: '16px' , color: '#1d3557', fontWeight: 'bold', display: 'flex', justifyContent: 'center'}}>
        Scenarios
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: '16px' }}>
        <Paper elevation={3}>
          <TextField
            label={<span style={{ color: theme.palette.mode === 'dark' ? '#45edf2' : '#49299a', fontWeight: 'bold' }}>Search</span>}
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
        filteredScenarios && filteredScenarios.length > 0 ? (
          filteredScenarios.map((scenario, index) => (
            <Scenario key={index} scenario={scenario}/>
          ))
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
            <Typography variant="body1">No scenarios found.</Typography>
          </Box>
        )
      )}
    </div>
  );
}
