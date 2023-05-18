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
      <Typography variant="subtitle1">Security Recommendations:</Typography>
      <ul>
        {scenario.recommendations.map((recommendation, index) => (
          <li key={index}>
            <Typography>{recommendation}</Typography>
          </li>
        ))}
      </ul>
      <Typography variant="subtitle1">Attached Photos:</Typography>
      <div>
        {scenario.photosToShow.map((photo, index) => (
          <img
            src={URL.createObjectURL(photo)}
            alt={`uploaded-${index}`}
            key={index}
            style={{ maxWidth: "100px", maxHeight: "100px", marginRight: "8px", marginBottom: "8px" }}
          />
        ))}
      </div>
    </ScenarioWrapper>
  );
}
