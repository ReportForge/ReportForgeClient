import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Button, Grid, Typography } from "@mui/material";
import Scenario from "../../components/Scenario/Scenario";

const difficulties = ["low", "medium", "high"];
const impacts = ["low", "medium", "high"];

export default function ScenarioForm({ onAddScenarios }) {
  const [scenarioNumber, setScenarioNumber] = useState(1);
  const [scenarioTitle, setScenarioTitle] = useState("");
  const [scenarioDifficulty, setScenarioDifficulty] = useState("");
  const [scenarioImpact, setScenarioImpact] = useState("");
  const [scenarios, setScenarios] = useState([]);
  var count = 1;

    useEffect(() => {
        onAddScenarios(scenarios);
    }, [scenarios])
    

  const handleSubmit = (e) => {
    e.preventDefault();
    const newScenario = {
        scenarioNumber: scenarioNumber,
        scenarioTitle: scenarioTitle,
        scenarioDifficulty: scenarioDifficulty,
        scenarioImpact: scenarioImpact
    }
    setScenarios([...scenarios, newScenario]);
    setScenarioNumber(scenarioNumber + 1);
  };

  return (
        <form onSubmit={handleSubmit}>
        <Typography component="h1" variant="h5">
            Scenarios Creation
        </Typography>
        <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField
                label="Scenario Number"
                value={scenarioNumber}
                disabled
                fullWidth
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                label="Scenario Title"
                value={scenarioTitle}
                onChange={(e) => setScenarioTitle(e.target.value)}
                required
                fullWidth
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                select
                label="Scenario Difficulty"
                value={scenarioDifficulty}
                onChange={(e) => setScenarioDifficulty(e.target.value)}
                required
                fullWidth
            >
                {difficulties.map((difficulty) => (
                <MenuItem key={difficulty} value={difficulty}>
                    {difficulty}
                </MenuItem>
                ))}
            </TextField>
            </Grid>
            <Grid item xs={12}>
            <TextField
                select
                label="Scenario Level of Impact"
                value={scenarioImpact}
                onChange={(e) => setScenarioImpact(e.target.value)}
                required
                fullWidth
            >
                {impacts.map((impact) => (
                <MenuItem key={impact} value={impact}>
                    {impact}
                </MenuItem>
                ))}
            </TextField>
            </Grid>
            <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
                Add Scenario
            </Button>
            </Grid>
            <div>
                <Typography component="h1" variant="h5" sx={{ margin: '16px' }}>
                    Scenarios
                </Typography>
                <Grid container>
                    {scenarios.map((scenario, index) => (
                        <Grid item key={index}>
                            <Scenario key={index} scenario={scenario} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </Grid>
        </form>
  );
}
