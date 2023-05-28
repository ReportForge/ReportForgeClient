import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Button, Grid, Typography, Paper } from "@mui/material";
import Scenario from "../../components/Scenario/Scenario";

const difficulties = ["Low", "Medium", "High"];
const impacts = ["Low", "Medium", "High"];

export default function ScenarioForm({ onAddScenarios }) {
  const [scenarioNumber, setScenarioNumber] = useState(1);
  const [scenarioTitle, setScenarioTitle] = useState("");
  const [scenarioDifficulty, setScenarioDifficulty] = useState("");
  const [scenarioImpact, setScenarioImpact] = useState("");
  const [scenarios, setScenarios] = useState([]);
  const [recommendation, setRecommendation] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [photosToShow, setPhotosToShow] = useState([]);

    useEffect(() => {
        onAddScenarios(scenarios);
    },[scenarios,onAddScenarios])
    
    const handleAddRecommendation = () => {
        setRecommendations([...recommendations, recommendation]);
        setRecommendation("");
        };


    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        setPhotosToShow((prevPhotosToShow) => [...prevPhotosToShow, ...files]);
        
        if (files.length > 0) {
            files.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotos((prevPhotos) => [
                ...prevPhotos,
                reader.result,
                ]);
            };
            reader.readAsDataURL(file);
            });
        }
        };
          

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(photosToShow);
        const newScenario = {
            scenarioNumber: scenarioNumber,
            scenarioTitle: scenarioTitle,
            scenarioDifficulty: scenarioDifficulty,
            scenarioImpact: scenarioImpact,
            recommendations: recommendations,
            photos: photos,
            photosToShow: photosToShow,
        }
        setScenarios([...scenarios, newScenario]);
        setScenarioNumber(scenarioNumber + 1);
        setRecommendations([]);
        setPhotos([]);
        setPhotosToShow([]);
    };


  
  return (
        <Paper onSubmit={handleSubmit}>
        <Typography component="h1" variant="h5" align="center" sx={{ marginTop: '16px', marginBottom: '16px' }}>
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
                <TextField
                label="Security Recommendation"
                value={recommendation}
                onChange={(e) => setRecommendation(e.target.value)}
                fullWidth
                multiline
                rows={3}
                style={{ width: '100%', height: '100px' }}
                />
            </Grid>
            <Grid container alignItems="center" justifyContent="center" style={{ marginTop:"10px" }}>
                <Grid item >
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleAddRecommendation}
                        >
                        Add Recommendation
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
                <input
                accept="image/*"
                type="file"
                onChange={handleFileUpload}
                multiple
                style={{ display: "none" }}
                id="upload-photo"
                />
                <label htmlFor="upload-photo">
                    <Button variant="outlined" color="primary" component="span">
                        Upload Photos
                    </Button>
                </label>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    {photosToShow.map((photo, index) => (
                    <Grid item key={index}>
                        <img
                        src={URL.createObjectURL(photo)}
                        alt={`uploaded-${index}`}
                        style={{ maxWidth: "400px", maxHeight: "300px" }}
                        />
                    </Grid>
                    ))}
                </Grid>
            </Grid>
            <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
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
        </Paper>
  );
}
