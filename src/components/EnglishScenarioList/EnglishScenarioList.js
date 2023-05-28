import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useApi } from "../../api"; // Assuming your api.js is in the same directory level
import Scenario from "../Scenario/Scenario";

export default function ScenarioList() {
  const { getScenarios } = useApi();
  const [scenarios, setScenarios] = useState([]);

  useEffect(() => {
    fetchScenarios();
  });

  const fetchScenarios = async () => {
    try {
      const response = await getScenarios();
      setScenarios(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Typography variant="h5" sx={{ margin: '16px' }}>
        Scenarios
      </Typography>
      {scenarios && scenarios.length > 0 ? (
        scenarios.map((scenario, index) => (
          <Scenario key={index} scenario={scenario} />
        ))
      ) : (
        <Typography variant="body1">No scenarios found.</Typography>
      )}
    </div>
  );
}
