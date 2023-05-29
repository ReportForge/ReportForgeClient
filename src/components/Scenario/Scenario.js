import React from "react";
import { Paper, Typography, Grid } from "@mui/material";
import { styled } from "@mui/system";

const ScenarioWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

export default function Scenario({ scenario }) {
  return (
    <ScenarioWrapper sx={{ margin: '16px' }}>
      <Typography sx={{ marginBottom: '16px' }} variant="h6">Scenario {scenario.scenarioNumber}: {scenario.scenarioTitle}</Typography>
      <Typography>Difficulty: {scenario.scenarioDifficulty}</Typography>
      <Typography sx={{ marginBottom: '16px' }}> Level of Impact: {scenario.scenarioImpact}</Typography>
      <Typography variant="subtitle1">Tactic – Code Execution and Persistence:</Typography>
      <Typography sx={{ marginBottom: '16px' }}>{scenario.tactic}</Typography>
      <Typography variant="subtitle1">Description of the Attack:</Typography>
      <Typography sx={{ marginBottom: '16px' }}>{scenario.description}</Typography>
      <Typography variant="subtitle1">Attack Flow:</Typography>
      <div>
        {(scenario.attackFlowToShow && scenario.attackFlowToShow.length > 0)
          ? scenario.attackFlowToShow.map((photo, index) => (
              <img
                key={index}
                src={URL.createObjectURL(photo)}
                alt={`scenario-${index}`}
                style={{ maxWidth: "400px", maxHeight: "300px" }}
              />
            ))
          : scenario.attackFlow.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`scenario-${index}`}
                style={{ maxWidth: "400px", maxHeight: "300px" }}
              />
            ))}
      </div>
      <Typography variant="subtitle1">Proof of Concept:</Typography>
      <div>
        {(scenario.photosToShow && scenario.photosToShow.length > 0)
          ? scenario.photosToShow.map((photo, index) => (
              <img
                key={index}
                src={URL.createObjectURL(photo)}
                alt={`scenario-${index}`}
                style={{ maxWidth: "400px", maxHeight: "300px" }}
              />
            ))
          : scenario.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`scenario-${index}`}
                style={{ maxWidth: "400px", maxHeight: "300px" }}
              />
            ))}
      </div>
      <Typography variant="subtitle1">Mitigations:</Typography>
      <ul>
        {scenario.recommendations.map((recommendation, index) => (
          <li key={index}>
            <Typography>{recommendation}</Typography>
          </li>
        ))}
      </ul>
    </ScenarioWrapper>
  );
}
