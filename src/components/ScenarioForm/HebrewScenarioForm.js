import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Button, Grid, Typography } from "@mui/material";
import HebrewScenario from "../Scenario/HebrewScenario";

const difficulties = ["נמוכה", "בינונית", "גבוהה"];
const impacts = ["נמוכה", "בינונית", "גבוהה"];

export default function HebrewScenarioForm({ onAddScenarios }) {
  const [scenarioNumber, setScenarioNumber] = useState(1);
  const [scenarioTitle, setScenarioTitle] = useState("");
  const [scenarioDifficulty, setScenarioDifficulty] = useState("");
  const [scenarioImpact, setScenarioImpact] = useState("");
  const [scenarios, setScenarios] = useState([]);
  const [recommendation, setRecommendation] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [sysmonRecommendation, setSysmonRecommendation] = useState("");
  const [sysmonRecommendations, setSysmonRecommendations] = useState([]);


    useEffect(() => {
        onAddScenarios(scenarios);
    },[scenarios,onAddScenarios])
    
    const handleAddRecommendation = () => {
        setRecommendations([...recommendations, recommendation]);
        setRecommendation("");
        };

    const handleAddSysmonRecommendation = () => {
        setSysmonRecommendations([...sysmonRecommendations, sysmonRecommendation]);
        setSysmonRecommendation("");
        };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newScenario = {
            scenarioNumber: scenarioNumber,
            scenarioTitle: scenarioTitle,
            scenarioDifficulty: scenarioDifficulty,
            scenarioImpact: scenarioImpact,
            edrRecommendations: recommendations,
            sysmonRecommendations: sysmonRecommendations
        }
        setScenarios([...scenarios, newScenario]);
        setScenarioNumber(scenarioNumber + 1);
        setRecommendations([]);
        setSysmonRecommendations([]);
    };

  
  return (
        <div onSubmit={handleSubmit}>
        <Typography component="h1" variant="h5" align="center" sx={{ marginTop: '16px', marginBottom: '16px' }}>
            יצירת תרחישים
        </Typography>
        <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField
                label="מספר התרחיש"
                value={scenarioNumber}
                disabled
                fullWidth
                dir="rtl"
                inputProps={{ style: { textAlign: 'right' } }}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                label="שם התרחיש"
                value={scenarioTitle}
                onChange={(e) => setScenarioTitle(e.target.value)}
                required
                fullWidth
                dir="rtl"
                inputProps={{ style: { textAlign: 'right' } }}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                select
                label="רמת קושי"
                value={scenarioDifficulty}
                onChange={(e) => setScenarioDifficulty(e.target.value)}
                required
                fullWidth
                dir="rtl"
                inputProps={{ style: { textAlign: 'right' } }}
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
                label="רמת סיכון"
                value={scenarioImpact}
                onChange={(e) => setScenarioImpact(e.target.value)}
                required
                fullWidth
                dir="rtl"
                inputProps={{ style: { textAlign: 'right' } }}
            >
                {impacts.map((impact) => (
                <MenuItem key={impact} value={impact}>
                    {impact}
                </MenuItem>
                ))}
            </TextField>
            </Grid>
            <Grid item xs={12}>
                <TextField
                label="הגנות EDR"
                value={recommendation}
                onChange={(e) => setRecommendation(e.target.value)}
                fullWidth
                dir="rtl"
                inputProps={{ style: { textAlign: 'right' } }}
                multiline
                rows={3}
                style={{ width: '100%', height: '100px' }}
                />
            </Grid>
            <Grid container alignItems="center" justifyContent="center" style={{ marginTop:"10px" }}>
                <Grid>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleAddRecommendation}
                        fullWidth
                        >
                        הוסף הגנה
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <ul>
                    {recommendations.map((recommendation, index) => (
                    <li key={index}>
                        <Typography>{recommendation}</Typography>
                    </li>
                    ))}
                </ul>
            </Grid>
            <Grid item xs={12}>
                <TextField
                label="הגנות Sysmon"
                value={sysmonRecommendation}
                onChange={(e) => setSysmonRecommendation(e.target.value)}
                fullWidth
                dir="rtl"
                inputProps={{ style: { textAlign: 'right' } }}
                multiline
                rows={3}
                style={{ width: '100%', height: '100px' }}
                />
            </Grid>
            <Grid container alignItems="center" justifyContent="center" style={{ marginTop:"10px" }}>
                <Grid item>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleAddSysmonRecommendation}
                        fullWidth
                        >
                        הוסף הגנה
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <ul>
                    {sysmonRecommendations.map((recommendation, index) => (
                    <li key={index}>
                        <Typography>{recommendation}</Typography>
                    </li>
                    ))}
                </ul>
            </Grid>
            <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
                הוסף תרחיש
            </Button>
            </Grid>
            <div>
                <Typography component="h1" variant="h5" sx={{ margin: '16px' }}>
                    תרחישים
                </Typography>
                <Grid container>
                    {scenarios.map((scenario, index) => (
                        <Grid item key={index}>
                            <HebrewScenario key={index} scenario={scenario} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </Grid>
        </div>
  );
}
