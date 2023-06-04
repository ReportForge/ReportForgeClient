import React, { useEffect, useState } from "react";
import { Typography, CircularProgress, Box  } from "@mui/material";
import { useApi } from "../../api"; // Assuming your api.js is in the same directory level
import Scenario from "../Scenario/Scenario";

export default function ScenarioList() {
  const { getScenarios } = useApi();
  const [scenarios, setScenarios] = useState([]);
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
  },[]);

  
  

  return (
    <div>
      <Typography variant="h5" sx={{ margin: '16px' }}>
        Scenarios
      </Typography>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
          <CircularProgress /> 
        </Box>
      ) : (
        scenarios && scenarios.length > 0 ? (
          scenarios.map((scenario, index) => (
            <Scenario key={index} scenario={scenario} />
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
