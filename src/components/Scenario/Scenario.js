import React, {useState} from "react";
import { Paper, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../api';
import { Alert } from '@mui/lab';
import { GlobalStyles } from '@mui/system';
import { useTheme } from '@mui/material/styles';

const ColorChangeAnimation = () => {
  return (
    <GlobalStyles styles={{
      "@keyframes color-change": {
        "0%": {
          boxShadow: "0 3px 6px 2px #45edf2, 0 3px 6px 2px#45edf2",
        },
        "50%": {
          boxShadow: "0 3px 6px 2px #49299a, 0 3px 6px 2px #49299a",
        },
        "100%": {
          boxShadow: "0 3px 6px 2px #45edf2, 0 3px 6px 2px #45edf2",
        }
      }
    }} />
  )
};

const ScenarioWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  animation: 'color-change 4s infinite',
}));

export default function Scenario({ scenario }) {

  const navigate = useNavigate();
  const { approveScenario, disapproveScenario } = useApi(); 
  const [isApproved, setIsApproved] = useState(scenario.status);
  const theme = useTheme();

  const navigateToEdit = (scenario) => {
    navigate(`/edit/${scenario.scenarioNumber}`, { state: scenario });
  };

  

  const handleApprove = async (id) => {
    try {
      const respone = await approveScenario(id);
      setIsApproved(respone.data.status);
      alert('Scenario approved successfully');
    } catch (error) {
      alert('Error approving scenario');
      console.log(error);
    }
  };

  const handleDisapprove = async (id) => {
    try {
      const respone = await disapproveScenario(id);
      setIsApproved(respone.data.status);
      alert('Scenario disapproved successfully');
    } catch (error) {
      console.error('Failed to disapprove scenario:', error);
    }
  }

  return (
    <>
    <ColorChangeAnimation />
    <ScenarioWrapper sx={{ margin: '16px', marginBottom: 5}}>
      {
        isApproved === "Approved" ? (
          <Alert severity="success">Approval status: Approved</Alert>
        ) : isApproved === "Disapproved" ? (
          <Alert severity="warning">Approval status: Disapproved</Alert>
        ) : (
          <Alert severity="info">Approval status: Pending</Alert>
        )
      }

      <Typography sx={{ marginBottom: '16px', marginTop: '16px' }} variant="h6">Scenario {scenario.scenarioNumber}: {scenario.scenarioTitle}</Typography>
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
      <Button
        variant="contained"
        style={{backgroundColor: theme.palette.mode === 'dark' ? '#45edf2' : '#49299a'}}
        onClick={() => navigateToEdit(scenario)}
      >
        Edit
      </Button>
      {isApproved === "Approved" ? (
        <Button
          variant="contained"
          sx={{ 
            marginLeft: '16px',  // or any other value that suits your needs
            backgroundColor: '#d90429', // Material-UI does not have a "pink" color in its default theme
            '&:hover': {
              backgroundColor: '#ef233c', // Change this to desired hover color
            },
          }}
          onClick={() => handleDisapprove(scenario._id)}
        >
          Disapprove
        </Button>
      ) : (
        <Button
          variant="contained"
          sx={{ 
            marginLeft: '16px',  // or any other value that suits your needs
            backgroundColor: '#039487', // Material-UI does not have a "pink" color in its default theme
            '&:hover': {
              backgroundColor: '#04dfcc', // Change this to desired hover color
            },
          }}
          onClick={() => handleApprove(scenario._id)}
        >
          Approve
        </Button>
      )}
    </ScenarioWrapper>
    </>
  );
}
