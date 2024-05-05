import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Button, Grid, Typography, Paper, Checkbox, FormControlLabel } from "@mui/material";
import { useApi } from "../../api";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Back from '../../images/back-button.png';
import whiteBack from '../../images/white-back.png';
import { Link } from 'react-router-dom';

const difficulties = ["Low", "Medium", "High"];
const impacts = ["Low", "Medium", "High"];
const defenseSystems = [
  { name: "GPO", defaultMitigations: ["Apply security policies", "Regular updates"] },
  { name: "Sysmon", defaultMitigations: ["Monitor system calls", "Log suspicious activities"] },
  { name: "Palo Alto Cortex", defaultMitigations: ["Enable AI security features", "Use threat intelligence data"] },
  { name: "SentinelOne", defaultMitigations: ["Deploy AI-driven threat prevention", "Use behavioral AI model"] },
  { name: "Crowd Strike", defaultMitigations: ["Implement endpoint security", "Continuous monitoring"] },
  { name: "Microsoft Defender", defaultMitigations: ["Use antivirus protection", "Enable real-time protection"] },
  { name: "Azure Sentinel", defaultMitigations: ["Integrate SIEM capabilities", "Utilize SOAR functionalities"] },
  { name: "AWS Athena", defaultMitigations: ["Query logs for threats", "Automate threat detection queries"] }
];

export default function ScenarioCreate() {

  const location = useLocation();
  const scenarioToEdit = location.state;
  const { createScenario, getLatestScenarioNumber, updateScenario } = useApi();
  const [scenarioNumber, setScenarioNumber] = useState(scenarioToEdit ? scenarioToEdit.scenarioNumber : 0);
  const [scenarioTitle, setScenarioTitle] = useState(scenarioToEdit ? scenarioToEdit.scenarioTitle : '');
  const [scenarioDifficulty, setScenarioDifficulty] = useState(scenarioToEdit ? scenarioToEdit.scenarioDifficulty : '');
  const [scenarioImpact, setScenarioImpact] = useState(scenarioToEdit ? scenarioToEdit.scenarioImpact : '');
  // const [recommendation, setRecommendation] = useState(scenarioToEdit ? scenarioToEdit.recommendation : '');
  const [recommendations, setRecommendations] = useState(scenarioToEdit ? scenarioToEdit.recommendations : []);
  const [photos, setPhotos] = useState(scenarioToEdit ? scenarioToEdit.photos : []);
  // const [photosToShow, setPhotosToShow] = useState([]);
  const [latestScenarioNumber, setLatestScenarioNumber] = useState(0);
  const [tactic, setTactic] = useState(scenarioToEdit ? scenarioToEdit.tactic : '');
  const [description, setDescription] = useState(scenarioToEdit ? scenarioToEdit.description : '');
  const [attackFlow, setAttackFlow] = useState(scenarioToEdit ? scenarioToEdit.attackFlow : '');
  const [attackFlowToShow, setAttackFlowToShow] = useState([]);
  const [selectedDefenseSystems, setSelectedDefenseSystems] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();



  useEffect(() => {
    fetchLatestScenarioNumber();
  });

  const fetchLatestScenarioNumber = async () => {
    try {
      const response = await getLatestScenarioNumber();
      setLatestScenarioNumber(response.data.latestScenarioNumber);
      if (!scenarioToEdit) {
        setScenarioNumber(response.data.latestScenarioNumber + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDefenseSystemChange = (event) => {
    const { name, checked } = event.target;
    let newSelectedSystems = [...selectedDefenseSystems];
    let newRecommendations = [...recommendations];

    if (checked) {
      newSelectedSystems.push(name);
      // Find the defense system and its mitigations to add to recommendations
      const systemToAdd = defenseSystems.find(system => system.name === name);
      newRecommendations.push({ systemName: name, mitigations: systemToAdd.defaultMitigations });
    } else {
      newSelectedSystems = newSelectedSystems.filter(system => system !== name);
      // Remove the system and its mitigations from recommendations
      newRecommendations = newRecommendations.filter(rec => rec.systemName !== name);
    }

    setSelectedDefenseSystems(newSelectedSystems);
    setRecommendations(newRecommendations);
  };


  // const handleRemovePhoto = (photoIndex) => {
  //   const newPhotosToShow = photosToShow.filter((photo, index) => index !== photoIndex);
  //   const newPhotos = photos.filter((photo, index) => index !== photoIndex);

  //   setPhotosToShow(newPhotosToShow);
  //   setPhotos(newPhotos);
  // };

  const handleRemoveAttackFlow = (flowIndex) => {
    const newAttackFlowToShow = attackFlowToShow.filter((flow, index) => index !== flowIndex);
    const newAttackFlow = attackFlow.filter((flow, index) => index !== flowIndex);

    setAttackFlowToShow(newAttackFlowToShow);
    setAttackFlow(newAttackFlow);
  };

  // const handleFileUpload = (event) => {
  //   const files = Array.from(event.target.files);
  //   if (!scenarioToEdit) {
  //     setPhotosToShow((prevPhotosToShow) => [...prevPhotosToShow, ...files]);
  //   }

  //   if (files.length > 0) {
  //     files.forEach((file) => {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         setPhotos((prevPhotos) => [
  //           ...prevPhotos,
  //           reader.result,
  //         ]);
  //       };
  //       reader.readAsDataURL(file);
  //     });
  //   }
  // };

  const handleAttackFlowUpload = (event) => {
    const files = Array.from(event.target.files);
    if (!scenarioToEdit) {
      setAttackFlowToShow((prevAttackFlowToShow) => [...prevAttackFlowToShow, ...files]);
    }
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

    const scenario = {
      scenarioNumber: scenarioToEdit ? scenarioToEdit.scenarioNumber : latestScenarioNumber + 1,
      scenarioTitle: scenarioTitle,
      scenarioDifficulty: scenarioDifficulty,
      scenarioImpact: scenarioImpact,
      recommendations: recommendations,
      photos: photos,
      tactic: tactic,
      description: description,
      attackFlow: attackFlow,
    };

    try {
      let response;
      if (scenarioToEdit) {
        response = await updateScenario(scenarioToEdit._id, scenario);
        navigate(`/englishScenarioList/${response.data._id}`);
      } else {
        // Otherwise, call the create API
        response = await createScenario(scenario);
        setLatestScenarioNumber(latestScenarioNumber + 1);
        setScenarioNumber(scenarioNumber + 1);
      }

      console.log(response.data); // The response of your api
      setRecommendations([]);
      setPhotos([]);
      // setPhotosToShow([]);
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
    <>
      <Link to="/english" style={{ textDecoration: 'none', position: 'absolute', top: '0', left: '0', marginTop: '100px', marginLeft: '20px' }}>
        <img
          style={{ width: "50px", height: "50px" }}
          src={theme.palette.mode === "dark" ? whiteBack : Back}
          alt="Report"
        />
      </Link>
      <Paper onSubmit={handleSubmit}>
        <Typography component="h1" variant="h5" align="center" sx={{ marginTop: '50px', marginBottom: '50px', fontWeight: 'bold' }}>
          Scenarios Creation
        </Typography>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12}> {/* This is your first row */}
            <Grid container spacing={3} justifyContent="center" alignItems="center">
              <Grid item xs={3}>
                <TextField
                  label={<span style={{ color: theme.palette.mode === 'dark' ? '#45edf2' : '#49299a', fontWeight: 'bold' }}>Scenario Number</span>}
                  value={scenarioNumber}
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  label={<span style={{ color: theme.palette.mode === 'dark' ? '#45edf2' : '#49299a', fontWeight: 'bold' }}>Scenario Title</span>}
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
                  label={<span style={{ color: theme.palette.mode === 'dark' ? '#45edf2' : '#49299a', fontWeight: 'bold' }}>Scenario Difficulty</span>}
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
                  label={<span style={{ color: theme.palette.mode === 'dark' ? '#45edf2' : '#49299a', fontWeight: 'bold' }}>Scenario Level of Impact</span>}
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
              label={<span style={{ color: theme.palette.mode === 'dark' ? '#45edf2' : '#49299a', fontWeight: 'bold' }}>Tactic – Code Execution and Persistence</span>}
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
              label={<span style={{ color: theme.palette.mode === 'dark' ? '#45edf2' : '#49299a', fontWeight: 'bold' }}>Description of the Attack</span>}
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
                <Button variant="outlined" component="span">
                  Upload Attack Flow
                </Button>
              </label>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
              {(attackFlowToShow && attackFlowToShow.length > 0)
                ? attackFlowToShow.map((flow, index) => (
                  <Grid item key={index}>
                    <img
                      src={URL.createObjectURL(flow)}
                      alt={`uploaded-${index}`}
                      style={{ maxWidth: "200px", maxHeight: "100px" }}
                    />
                    <Button onClick={() => handleRemoveAttackFlow(index)}>Remove</Button>
                  </Grid>
                ))
                : attackFlow && attackFlow.map((flow, index) => (
                  <Grid item key={index}>
                    <img
                      src={flow}
                      alt={`uploaded-${index}`}
                      style={{ maxWidth: "200px", maxHeight: "100px" }}
                    />
                    <Button onClick={() => handleRemoveAttackFlow(index)}>Remove</Button>
                  </Grid>
                ))}
            </Grid>
          </Grid>
          {/* <Grid item xs={12}>
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
                <Button variant="outlined" component="span">
                  Upload Proof of Concept Photos
                </Button>
              </label>
            </Grid>
          </Grid> */}
          {/* <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
              {(photosToShow && photosToShow.length > 0)
                ? photosToShow.map((photo, index) => (
                  <Grid item key={index}>
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`uploaded-${index}`}
                      style={{ maxWidth: "200px", maxHeight: "100px" }}
                    />
                    <Button onClick={() => handleRemovePhoto(index)}>Remove</Button>
                  </Grid>

                ))
                : photos.map((photo, index) => (
                  <Grid item key={index}>
                    <img
                      src={photo}
                      alt={`uploaded-${index}`}
                      style={{ maxWidth: "200px", maxHeight: "100px" }}
                    />
                    <Button onClick={() => handleRemovePhoto(index)}>Remove</Button>
                  </Grid>
                ))}
            </Grid>
          </Grid> */}
          {/* <Grid item xs={8}>
            <TextField
              label={<span style={{ color: theme.palette.mode === 'dark' ? '#45edf2' : '#49299a', fontWeight: 'bold' }}>Mitigations</span>}
              value={recommendation}
              onChange={(e) => setRecommendation(e.target.value)}
              fullWidth
              multiline
              rows={3}
              style={{ width: '100%', height: '100px' }}
            />
          </Grid> */}
          {/* <Grid container alignItems="center" justifyContent="center" style={{ marginTop: "10px" }}>
            <Grid item >
              <Button
                variant="contained"
                style={{ backgroundColor: theme.palette.mode === 'dark' ? '#45edf2' : '#49299a' }}
                onClick={handleAddRecommendation}
              >
                Add Mitigations
              </Button>
            </Grid>
          </Grid> */}
          {/* <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="center" style={{ marginTop: "10px" }}>
              <ul>
                {recommendations.map((recommendation, index) => (
                  <li key={index}>
                    <Typography>{recommendation}</Typography>
                    <Button onClick={() => handleDeleteRecommendation(index)}>
                      Delete
                    </Button>
                  </li>
                ))}
              </ul>
            </Grid>
          </Grid> */}

          <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="center" style={{ marginTop: "10px" }}>
              <Typography component="h3" variant="h6">
                Choose Defense Systems:
              </Typography>
            </Grid>
            <Grid container alignItems="center" justifyContent="center" style={{ marginTop: "10px" }}>
              {defenseSystems.map((system) => (
                <FormControlLabel
                  key={system.name}
                  control={
                    <Checkbox
                      checked={selectedDefenseSystems.includes(system.name)}
                      onChange={handleDefenseSystemChange}
                      name={system.name}
                    />
                  }
                  label={system.name}
                />
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" style={{ backgroundColor: theme.palette.mode === 'dark' ? '#45edf2' : '#49299a', fontWeight: 'bold' }} onClick={handleSubmit} fullWidth>
              {scenarioToEdit ? "Update Scenario" : "Add Scenario"}
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
                  {(attackFlowToShow && attackFlowToShow.length > 0)
                    ? attackFlowToShow.map((flow, index) => (
                      <Grid item key={index}>
                        <img
                          src={URL.createObjectURL(flow)}
                          alt={`uploaded-${index}`}
                          style={{ maxWidth: "200px", maxHeight: "100px" }}
                        />
                      </Grid>
                    ))
                    : attackFlow && attackFlow.map((flow, index) => (
                      <Grid item key={index}>
                        <img
                          src={flow}
                          alt={`uploaded-${index}`}
                          style={{ maxWidth: "200px", maxHeight: "100px" }}
                        />
                      </Grid>
                    ))}
                </Grid>
                {/* <Typography sx={{ marginTop: '16px' }}><b>Proof of Concept:</b></Typography>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                  {(photosToShow && photosToShow.length > 0)
                    ? photosToShow.map((photo, index) => (
                      <Grid item key={index}>
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`uploaded-${index}`}
                          style={{ maxWidth: "200px", maxHeight: "100px" }}
                        />
                      </Grid>
                    ))
                    : photos.map((photo, index) => (
                      <Grid item key={index}>
                        <img
                          src={photo}
                          alt={`uploaded-${index}`}
                          style={{ maxWidth: "200px", maxHeight: "100px" }}
                        />
                      </Grid>
                    ))}
                </Grid> */}
                <Grid container xs={12}>
                  <Typography sx={{ marginTop: '16px' }} >
                  <b>Mitigations:</b>
                  </Typography>
                  <ul>
                    {recommendations.map((rec, index) => (
                      <li key={index}>
                        <Typography variant="subtitle1">{rec.systemName}</Typography>
                        <ul>
                          {rec.mitigations.map((mitigation, idx) => (
                            <li key={idx}>{mitigation}</li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );

}
