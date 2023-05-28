import React from "react";
import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";

const ScenarioWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

export default function HebrewScenario({ scenario }) {
  return (
    <ScenarioWrapper sx={{ margin: '16px' }}>
      <Typography variant="h6">תרחיש {scenario.scenarioNumber}: {scenario.scenarioTitle}</Typography>
      <Typography>רמת קושי: {scenario.scenarioDifficulty}</Typography>
      <Typography>רמת סיכון: {scenario.scenarioImpact}</Typography>
      <Typography variant="subtitle1">הגנות EDR:</Typography>
      <ul>
        {scenario.edrRecommendations.map((recommendation, index) => (
          <li key={index}>
            <Typography>{recommendation}</Typography>
          </li>
        ))}
      </ul>
      <Typography variant="subtitle1">הגנות Sysmon:</Typography>
      <ul>
        {scenario.sysmonRecommendations.map((recommendation, index) => (
          <li key={index}>
            <Typography>{recommendation}</Typography>
          </li>
        ))}
      </ul>
      <Typography variant="subtitle1">תמונות שהוספו:</Typography>
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
