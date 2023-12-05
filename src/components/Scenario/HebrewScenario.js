import React, {useState} from "react";
import { Paper, Typography, Button, Box } from "@mui/material";
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

export default function HebrewScenario({ scenario  }) {

  const navigate = useNavigate();
  const { approveHebrewScenario, disapproveHebrewScenario, deleteHebrewScenario } = useApi(); 
  const [isApproved, setIsApproved] = useState(scenario.status);
  const theme = useTheme();

  const navigateToEdit = (scenario) => {
    navigate(`/edit/hebrew/${scenario.scenarioNumber}`, { state: scenario });
  };

  const handleDelete = async (id) => {
    try {
      await deleteHebrewScenario(id); // Replace 'deleteHebrewScenario' with the actual function name
      alert('Hebrew scenario deleted successfully');
      // Optionally navigate away or update the state to remove the deleted scenario from the view
    } catch (error) {
      alert('Error deleting Hebrew scenario');
      console.error('Failed to delete Hebrew scenario:', error);
    }
  };

  const handleApprove = async (id) => {
    try {
      const respone = await approveHebrewScenario(id);
      setIsApproved(respone.data.status);
      alert('Hebrew scenario approved successfully');
    } catch (error) {
      alert('Error approving Hebrew scenario');
      console.log(error);
    }
  };

  const handleDisapprove = async (id) => {
    try {
      const respone = await disapproveHebrewScenario(id);
      setIsApproved(respone.data.status);
      alert('Hebrew scenario disapproved successfully');
    } catch (error) {
      console.error('Failed to disapprove Hebrew scenario:', error);
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
      <Typography sx={{ marginBottom: '16px', marginTop: '16px', direction: 'rtl',  textAlign: 'right' }} variant="h6"> תרחיש {scenario.scenarioNumber}: {scenario.scenarioTitle}</Typography>
      <Typography style={{ direction: 'rtl',  textAlign: 'right' }}>רמת קושי במימוש התרחיש: {scenario.scenarioDifficulty}</Typography>
      <Typography sx={{ marginBottom: '16px', direction: 'rtl',  textAlign: 'right' }}> רמת סיכון לארגון: {scenario.scenarioImpact}</Typography>
      <Typography style={{ direction: 'rtl',  textAlign: 'right' }}variant="subtitle1">המתקפה:</Typography>
      <Typography sx={{ marginBottom: '16px', direction: 'rtl',  textAlign: 'right' }}>{scenario.tactic}</Typography>
      <Typography style={{ direction: 'rtl',  textAlign: 'right' }} variant="subtitle1">פירוט התרחיש:</Typography>
      <Typography sx={{ marginBottom: '16px', direction: 'rtl',  textAlign: 'right' }}>{scenario.description}</Typography>
      <Typography style={{ direction: 'rtl',  textAlign: 'right' }} variant="subtitle1">תהליך התקיפה:</Typography>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        {(scenario.attackFlowToShow && scenario.attackFlowToShow.length > 0)
          ? scenario.attackFlowToShow.map((photo, index) => (
              <img
                key={index}
                src={URL.createObjectURL(photo)}
                alt={`scenario-${index}`}
                style={{ maxWidth: "400px", maxHeight: "300px"}}
              />
            ))
          : scenario.attackFlow.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`scenario-${index}`}
                style={{ maxWidth: "400px", maxHeight: "300px"}}
              />
            ))}
      </div>
      <Typography style={{ direction: 'rtl',  textAlign: 'right' }} variant="subtitle1">הוכחת יכולת באתר הלקוח: </Typography>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
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
      <Typography  style={{ direction: 'rtl',  textAlign: 'right' }} variant="subtitle1">חוקי הגנה:</Typography>
      <ul>
        {scenario.recommendations.map((recommendation, index) => (
          <li key={index}  style={{ direction: 'rtl',  textAlign: 'right', marginRight: "10px" }}>
            <Typography>{recommendation}</Typography>
          </li>
        ))}
      </ul>
      
      <Box 
        display="flex" 
        justifyContent="flex-end" 
      >
      
        <Button
            variant="contained"
            sx={{ 
              marginLeft: '16px',
              backgroundColor: '#d90429',
              '&:hover': {
                backgroundColor: '#ef233c',
              },
            }}
            onClick={() => handleDelete(scenario._id)}
          >
            מחק תרחיש
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
            הפוך ללא מאושר
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
            אשר את התרחיש
          </Button>
        )}
        <Button
          variant="contained"
          
          style={{backgroundColor: theme.palette.mode === 'dark' ? '#45edf2' : '#49299a', marginLeft: '16px'}}
          onClick={() => navigateToEdit(scenario)}
          >
          עריכה
        </Button>
      </Box>
    </ScenarioWrapper>
    </>
  );
}
