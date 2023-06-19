import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Button, Grid, Typography, Paper } from "@mui/material";
import { useApi } from "../../api"; 
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Back from '../../images/back-button.png'
import { Link } from 'react-router-dom';

const difficulties = ["קלה", "בינונית", "גבוהה"];
const impacts = ["קלה", "בינונית", "גבוהה"];

export default function HebrewScenarioCreate() {

      const location = useLocation();
      const scenarioToEdit = location.state;
      const { createHebrewScenario, getLatestHebrewScenarioNumber, updateHebrewScenario } = useApi();
      const [scenarioNumber, setScenarioNumber] = useState(scenarioToEdit ? scenarioToEdit.scenarioNumber : 0);
      const [scenarioTitle, setScenarioTitle] = useState(scenarioToEdit ? scenarioToEdit.scenarioTitle : '');
      const [scenarioDifficulty, setScenarioDifficulty] = useState(scenarioToEdit ? scenarioToEdit.scenarioDifficulty : '');
      const [scenarioImpact, setScenarioImpact] = useState(scenarioToEdit ? scenarioToEdit.scenarioImpact : '');
      const [photos, setPhotos] = useState(scenarioToEdit ? scenarioToEdit.photos : []);
      const [photosToShow, setPhotosToShow] = useState([]);
      const [latestScenarioNumber, setLatestScenarioNumber] = useState(0);
      const [tactic, setTactic] = useState(scenarioToEdit ? scenarioToEdit.tactic : '');
      const [description, setDescription] = useState(scenarioToEdit ? scenarioToEdit.description : '');
      const [attackFlow, setAttackFlow] = useState(scenarioToEdit ? scenarioToEdit.attackFlow : '');
      const [attackFlowToShow, setAttackFlowToShow] = useState([]);
      const [recommendation, setRecommendation] = useState(scenarioToEdit ? scenarioToEdit.recommendation : '');
      const [recommendations, setRecommendations] = useState(scenarioToEdit ? scenarioToEdit.recommendations : []);

      const navigate = useNavigate();
      const theme = useTheme();

    
      function formatDescription(description) {
        let lines = description.split('\n').map(line => {
            let words = line.split(/\s+/);
            let formatted = [];
    
            for (let i = 0; i < words.length; i++) {
                let currentWord = words[i];
                let hasEnglishChars = /[A-Za-z]/.test(currentWord);
                let nextWordHasEnglishChars = i < words.length - 1 && /[A-Za-z]/.test(words[i + 1]);
                let prevWordHasEnglishChars = i > 0 && /[A-Za-z]/.test(words[i - 1]);
    
                if (hasEnglishChars && (nextWordHasEnglishChars || prevWordHasEnglishChars)) {
                    if (!prevWordHasEnglishChars) {
                        // start of LTR group
                        formatted.push('\u202A' + currentWord);
                    } else {
                        // continuation of LTR group
                        formatted[formatted.length - 1] += " " + currentWord;
                    }
    
                    if (!nextWordHasEnglishChars) {
                        // end of LTR group
                        formatted[formatted.length - 1] += '\u202C';
                    }
                } else {
                    // RTL word
                    formatted.push('\u202B' + currentWord + '\u202C');
                }
            }
    
            return formatted.join(' ');
        });
    
        return lines.join('\n');
    }

    function formatArrayDescriptions(descriptions) {
      return descriptions.map(description => {
        let words = description.split(/\s+/);
        let formatted = [];
        let buffer = [];

        for (let i = 0; i < words.length; i++) {
            let currentWord = words[i];
            let hasEnglishChars = /[A-Za-z]/.test(currentWord);

            if (hasEnglishChars) {
                // Collect English words into the buffer.
                buffer.push(currentWord);
            } else {
                // If the buffer is not empty, we've hit the end of an English phrase.
                if (buffer.length) {
                    formatted.push('\u202A' + buffer.join(' ') + '\u202C');
                    buffer = [];
                }
                // Push the non-English word into the formatted array.
                formatted.push('\u202B' + currentWord + '\u202C');
            }
        }

        // If there are any remaining English words in the buffer, append them to the formatted array.
        if (buffer.length) {
            formatted.push('\u202A' + buffer.join(' ') + '\u202C');
        }

        return formatted.join(' ');
    });
  }
  

    useEffect(() => {
      fetchLatestScenarioNumber();
    });

    const fetchLatestScenarioNumber = async () => {
        try {
        const response = await getLatestHebrewScenarioNumber();
        setLatestScenarioNumber(response.data.latestScenarioNumber);
        if(!scenarioToEdit){
            setScenarioNumber(response.data.latestScenarioNumber + 1);
        }
        } catch (error) {
        console.log(error);
        }
    };

    const handleRemovePhoto = (photoIndex) => {
        const newPhotosToShow = photosToShow.filter((photo, index) => index !== photoIndex);
        const newPhotos = photos.filter((photo, index) => index !== photoIndex);
    
        setPhotosToShow(newPhotosToShow);
        setPhotos(newPhotos);
    };
  
    const handleRemoveAttackFlow = (flowIndex) => {
        const newAttackFlowToShow = attackFlowToShow.filter((flow, index) => index !== flowIndex);
        const newAttackFlow = attackFlow.filter((flow, index) => index !== flowIndex);
    
        setAttackFlowToShow(newAttackFlowToShow);
        setAttackFlow(newAttackFlow);
    };


    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        if(!scenarioToEdit){
        setPhotosToShow((prevPhotosToShow) => [...prevPhotosToShow, ...files]);
        }
        
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
        if(!scenarioToEdit){
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
  
  
    // handle recommendation for EDR
    const handleAddRecommendation = () => {
        setRecommendations([...recommendations, recommendation]);
        setRecommendation("");
    };
    
    const handleDeleteRecommendation = (recommendationIndex) => {
        setRecommendations(recommendations.filter((_, index) => index !== recommendationIndex));
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
        tactic: formatDescription(tactic),
        description: formatDescription(description),
        attackFlow: attackFlow,
        };
    
        try {
        let response;
        if (scenarioToEdit) {
            response = await updateHebrewScenario(scenarioToEdit._id, scenario);
            navigate(`/hebrewScenarioList/${response.data._id}`);
        } else {
            // Otherwise, call the create API
            response = await createHebrewScenario(scenario);
            setLatestScenarioNumber(latestScenarioNumber + 1);
            setScenarioNumber(scenarioNumber + 1);
        }
        
        console.log(response.data); // The response of your api
        setRecommendations([]);
        setPhotos([]);
        setPhotosToShow([]);
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
    <Link to="/hebrewMenu" style={{ textDecoration: 'none',position: 'absolute', top: '0', left: '0', marginTop: '100px', marginLeft: '20px'}}>
        <img
          style={{width: "50px", height: "50px"}}
          src={Back}
          alt="Report"
        />
    </Link>
    <Paper onSubmit={handleSubmit}>
    <Typography component="h1" variant="h5" align="center" sx={{ marginTop: '50px', marginBottom: '50px' , fontWeight: 'bold'}}>
        יצירת תרחיש
    </Typography>
    <Grid container spacing={3} justifyContent="center" alignItems="center">
    <Grid item xs={12}> {/* This is your first row */}
          <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={3}>
              <TextField
                  label={<span style={{ color: theme.palette.mode === 'dark' ? '#45edf2' : '#49299a', fontWeight: 'bold' }}>מספר תרחיש</span>}
                  value={scenarioNumber}
                  disabled
                  fullWidth
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                  label={<span style={{color: theme.palette.mode === 'dark' ? '#45edf2' : '#49299a', fontWeight: 'bold' }}>כותרת</span>}
                  value={scenarioTitle}
                  onChange={(e) => setScenarioTitle(e.target.value)}
                  required
                  fullWidth
                  InputProps={{ 
                    style: { 
                      direction: 'rtl',
                      textAlign: 'right' 
                    }
                  }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}> {/* This is your second row */}
          <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={4}>
              <TextField
                  select
                  label={<span style={{ color: theme.palette.mode === 'dark' ? '#45edf2' : '#49299a', fontWeight: 'bold' }}>רמת קושי במימוש התרחיש</span>}
                  value={scenarioDifficulty}
                  onChange={(e) => setScenarioDifficulty(e.target.value)}
                  required
                  fullWidth
                  InputProps={{ 
                    style: { 
                      direction: 'rtl',
                      textAlign: 'right' 
                    }
                  }}
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
                  label={<span style={{ color: theme.palette.mode === 'dark' ? '#45edf2' : '#49299a', fontWeight: 'bold' }}>רמת סיכון לארגון</span>}
                  value={scenarioImpact}
                  onChange={(e) => setScenarioImpact(e.target.value)}
                  required
                  fullWidth
                  InputProps={{ 
                    style: { 
                      direction: 'rtl',
                      textAlign: 'right' 
                    }
                  }}
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
              label={<span style={{ color: theme.palette.mode === 'dark' ? '#45edf2' : '#49299a', fontWeight: 'bold' }}>תיאור המתקפה</span>}
              value={tactic}
              onChange={(e) => setTactic(e.target.value)}
              required
              fullWidth
              multiline
              rows={3}
              InputProps={{ 
                style: { 
                  direction: 'rtl',
                  textAlign: 'right' 
                }
              }}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              label={<span style={{ color: theme.palette.mode === 'dark' ? '#45edf2' : '#49299a', fontWeight: 'bold' }}>פירוט התרחיש</span>}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              fullWidth
              multiline
              rows={3}
              InputProps={{ 
                style: { 
                  direction: 'rtl',
                  textAlign: 'right' 
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent="center">
              <input
                accept="image/*"
                type="file"
                multiple
                onChange={handleAttackFlowUpload}
                style={{ display: "none"}}
                id="upload-attack-flow"
              />
              <label htmlFor="upload-attack-flow">
                <Button variant="outlined" component="span">
                  העלה תהליך תקיפה
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
                <Button variant="outlined" component="span">
                  העלה הוכחת יכולת באתר הלקוח
                </Button>
              </label>
            </Grid>
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
        <Grid item xs={8}>
            <TextField
            label={<span style={{ color: theme.palette.mode === 'dark' ? '#45edf2' : '#49299a', fontWeight: 'bold' }}>חוקי הגנה</span>}
            value={recommendation}
            onChange={(e) => setRecommendation(e.target.value)}
            fullWidth
            multiline
            rows={3}
            style={{ width: '100%', height: '100px' }}
            InputProps={{ 
              style: { 
                direction: 'rtl',
                textAlign: 'right' 
              }
            }}
            />
        </Grid>
        <Grid container alignItems="center" justifyContent="center" style={{ marginTop:"10px" }}>
            <Grid item >
                <Button
                    variant="contained"
                    style={{backgroundColor: theme.palette.mode === 'dark' ? '#45edf2' : '#49299a'}}
                    onClick={handleAddRecommendation}
                    >
                    הוסף חוק הגנה 
                </Button>
            </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="center" style={{ marginTop:"10px" }}>
              <ul>
                  {recommendations.map((recommendation, index) => (
                  <li key={index} style={{direction: 'rtl',textAlign: 'right'}}>
                      <Typography 
                        InputProps={{ 
                          style: { 
                            direction: 'rtl',
                            textAlign: 'right' 
                          }}}>
                        {recommendation}
                      </Typography>
                      <Button onClick={() => handleDeleteRecommendation(index)}>
                        Delete
                      </Button>
                  </li>
                  ))}
              </ul>
          </Grid>
        </Grid>
        <Grid item xs={12}>
        <Button variant="contained" style={{backgroundColor: theme.palette.mode === 'dark' ? '#45edf2' : '#49299a', fontWeight: 'bold'}} onClick={handleSubmit} fullWidth>
            {scenarioToEdit ? "עדכן תרחיש": "הוסף תרחיש"}
        </Button>
        </Grid>
        {/* Preview of the Scenario */}
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={8} md={6}>
            <Paper elevation={3} sx={{ padding: '16px', margin: '16px' }}>
              <Typography component="h1" variant="h5" align="center">
                תצוגה מקדימה  
              </Typography>
              <Typography style={{ direction: 'rtl',  textAlign: 'right' }}><b>מספר תרחיש:</b> {scenarioNumber}</Typography>
              <Typography style={{ direction: 'rtl',  textAlign: 'right' }}><b>כותרת:</b> {scenarioTitle}</Typography>
              <Typography style={{ direction: 'rtl',  textAlign: 'right' }}><b>רמת קושי במימוש התרחיש:</b> {scenarioDifficulty}</Typography>
              <Typography style={{ direction: 'rtl',  textAlign: 'right' }}><b>רמת סיכון לארגון:</b> {scenarioImpact}</Typography>
              <Typography style={{ direction: 'rtl',  textAlign: 'right' }} rows={3}><b>תיאור המתקפה:</b> {tactic}</Typography>
              <Typography style={{ direction: 'rtl',  textAlign: 'right' }}><b>פירוט התרחיש:</b> {description}</Typography>
              <Typography style={{ direction: 'rtl',  textAlign: 'right' }}><b>תהליך תקיפה:</b></Typography>
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
              <Typography sx={{ marginTop: '15px', direction: 'rtl',  textAlign: 'right'}}><b>הוכחת יכולת:</b></Typography>
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
              </Grid>
                <Typography sx={{ marginTop: '16px', direction: 'rtl',  textAlign: 'right'}}><b>חוקי הגנה:</b></Typography>
                    <ul>
                    {recommendations.map((recommendation, index) => (
                        <li style={{ direction: 'rtl',  textAlign: 'right', marginRight: "10px" }} key={index}>{recommendation}</li>
                    ))}
                    </ul>
            </Paper>
          </Grid>
        </Grid>
    </Grid>
    </Paper>
    </>
);

}
