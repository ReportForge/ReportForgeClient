import React from "react";
import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";

const ScenarioWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

export default function Scenario({ scenario }) {
  return (
    <ScenarioWrapper sx={{ margin: '16px' }}>
      <Typography variant="h6">Scenario {scenario.scenarioNumber}: {scenario.scenarioTitle}</Typography>
      <Typography>Difficulty: {scenario.scenarioDifficulty}</Typography>
      <Typography>Level of Impact: {scenario.scenarioImpact}</Typography>
    </ScenarioWrapper>
  );
}
