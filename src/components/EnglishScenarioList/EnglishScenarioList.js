import React, { useEffect, useState } from "react";
import { Typography, CircularProgress, Box, TextField, Paper } from "@mui/material";
import { useApi } from "../../api";
import Scenario from "../Scenario/Scenario";

export default function ScenarioList() {
  const { getScenarios } = useApi();
  const [scenarios, setScenarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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
      <Typography variant="h5" sx={{ margin: '16px' }}>
        Scenarios
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: '16px' }}>
        <Paper elevation={3}>
          <TextField
            label="Search"
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
