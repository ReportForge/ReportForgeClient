import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Button, Grid, Typography, Paper } from "@mui/material";
import { useApi } from "../../api"; // Assuming your api.js is in the same directory level

const difficulties = ["Low", "Medium", "High"];
const impacts = ["Low", "Medium", "High"];

export default function ScenarioCreate() {
  const { createScenario, getLatestScenarioNumber } = useApi();

  const [scenarioNumber, setScenarioNumber] = useState(0);
  const [scenarioTitle, setScenarioTitle] = useState("");
  const [scenarioDifficulty, setScenarioDifficulty] = useState("");
  const [scenarioImpact, setScenarioImpact] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [photosToShow, setPhotosToShow] = useState([]);
  const [latestScenarioNumber, setLatestScenarioNumber] = useState(0);
  const [tactic, setTactic] = useState("");
  const [description, setDescription] = useState("");
  const [attackFlow, setAttackFlow] = useState([]);
  const [attackFlowToShow, setAttackFlowToShow] = useState([]);



  useEffect(() => {
    fetchLatestScenarioNumber();
  });

  const fetchLatestScenarioNumber = async () => {
    try {
      const response = await getLatestScenarioNumber();
      setLatestScenarioNumber(response.data.latestScenarioNumber);
      setScenarioNumber(response.data.latestScenarioNumber + 1);
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleAttackFlowUpload = (event) => {
    const files = Array.from(event.target.files);
    setAttackFlowToShow((prevAttackFlowToShow) => [...prevAttackFlowToShow, ...files]);
  
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAttackFlow((prevAttackFlow) => [
          ...prevAttackFlow,
          reader.result,
        ]);
      };
      reader.readAsDataURL(file);
    });
  };
  
  
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newScenario = {
        scenarioNumber: latestScenarioNumber + 1,
        scenarioTitle: scenarioTitle,
        scenarioDifficulty: scenarioDifficulty,
        scenarioImpact: scenarioImpact,
        recommendations: recommendations,
        photos: photos,
        tactic: tactic,
        description: description,
        attackFlow: attackFlow,
    }
    try {
      const response = await createScenario(newScenario);
      console.log(response.data); // The response of your api
      setScenarioNumber(scenarioNumber + 1);
      setRecommendations([]);
      setPhotos([]);
      setPhotosToShow([]);
      setLatestScenarioNumber(latestScenarioNumber + 1);
      setTactic("");
      setDescription("");
      setAttackFlow([]);
      setAttackFlowToShow([]);
      setScenarioDifficulty("");
      setScenarioImpact("");
      setScenarioTitle("");

    } catch (error) {
      console.log(error); // handle your error here
    }
  };

  return (
    <Paper onSubmit={handleSubmit}>
    <Typography component="h1" variant="h5" align="center" sx={{ marginTop: '16px', marginBottom: '16px' }}>
        Scenarios Creation
    </Typography>
    <Grid container spacing={3} justifyContent="center" alignItems="center">
    <Grid item xs={12}> {/* This is your first row */}
          <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={3}>
              <TextField
                  label="Scenario Number"
                  value={scenarioNumber}
                  disabled
                  fullWidth
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                  label="Scenario Title"
                  value={scenarioTitle}
                  onChange={(e) => setScenarioTitle(e.target.value)}
                  required
                  fullWidth
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}> {/* This is your second row */}
          <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={4}>
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
            <Grid item xs={4}>
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
          </Grid>
        </Grid>
        <Grid item xs={8}>
            <TextField
              label="Tactic – Code Execution and Persistence"
              value={tactic}
              onChange={(e) => setTactic(e.target.value)}
              required
              fullWidth
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              label="Description of the Attack"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              fullWidth
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent="center">
              <input
                accept="image/*"
                type="file"
                multiple
                onChange={handleAttackFlowUpload}
                style={{ display: "none" }}
                id="upload-attack-flow"
              />
              <label htmlFor="upload-attack-flow">
                <Button variant="outlined" color="primary" component="span">
                  Upload Attack Flow
                </Button>
              </label>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
              {attackFlowToShow.map((photo, index) => (
                <Grid item key={index}>
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`uploaded-${index}`}
                    style={{ maxWidth: "200px", maxHeight: "100px" }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent="center">
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
                  Upload Proof of Concept Photos
                </Button>
              </label>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
              {photosToShow.map((photo, index) => (
                <Grid item key={index}>
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`uploaded-${index}`}
                    style={{ maxWidth: "200px", maxHeight: "100px" }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

        <Grid item xs={8}>
            <TextField
            label="Mitigations"
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
                    Add Mitigations
                </Button>
            </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="center" style={{ marginTop:"10px" }}>

              <ul>
                  {recommendations.map((recommendation, index) => (
                  <li key={index}>
                      <Typography>{recommendation}</Typography>
                  </li>
                  ))}
              </ul>
          </Grid>
        </Grid>
        <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
            Add Scenario
        </Button>
        </Grid>
        {/* Preview of the Scenario */}
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={8} md={6}>
            <Paper elevation={3} sx={{ padding: '16px', margin: '16px' }}>
              <Typography component="h1" variant="h5" align="center">
                Scenario Preview
              </Typography>
              <Typography><b>Number:</b> {scenarioNumber}</Typography>
              <Typography><b>Title:</b> {scenarioTitle}</Typography>
              <Typography><b>Difficulty:</b> {scenarioDifficulty}</Typography>
              <Typography><b>Impact:</b> {scenarioImpact}</Typography>
              <Typography rows={3}><b>Tactic:</b> {tactic}</Typography>
              <Typography><b>Description:</b> {description}</Typography>
              <Typography><b>Attack Flow:</b></Typography>
              <Grid container spacing={2} justifyContent="center" alignItems="center">
              {attackFlowToShow.map((flow, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(flow)}
                  alt={`Attack Flow ${index}`}
                  style={{ maxWidth: "200px", maxHeight: "100px" }}
                />
              ))}
              </Grid>
              <Typography sx={{ marginTop: '16px'}}><b>Proof of Concept:</b></Typography>
              <Grid container spacing={2} justifyContent="center" alignItems="center">
                {photosToShow.map((photo, index) => (
                  <Grid item key={index}>
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`uploaded-${index}`}
                      style={{ maxWidth: "200px", maxHeight: "100px" }}
                    />
                  </Grid>
                ))}
              </Grid>
              <Typography sx={{ marginTop: '16px'}}><b>Mitigations:</b></Typography>
              <ul>
                {recommendations.map((recommendation, index) => (
                  <li key={index}>{recommendation}</li>
                ))}
              </ul>
            </Paper>
          </Grid>
        </Grid>
    </Grid>
    </Paper>
);

}
