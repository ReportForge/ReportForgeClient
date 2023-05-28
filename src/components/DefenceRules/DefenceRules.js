import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Button, Grid, Typography } from "@mui/material";
import DefenceRule from './DefenceRule'

const difficulties = ["Low", "Medium", "High"];
const impacts = ["Low", "Medium", "High"];

export default function DefenceRules({ onAddDefenceRules }) {
  const [defenceRuleNumber, setDefenceRuleNumber] = useState(1);
  const [defenceRuleTitle, setDefenceRuleTitle] = useState("");
  const [defenceRules, setDefenceRules] = useState([]);



    useEffect(() => {
        onAddDefenceRules(defenceRules);
    },[defenceRules,onAddDefenceRules])
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const newDefenceRule = {
            defenceRuleNumber: defenceRuleNumber,
            defenceRuleTitle: defenceRuleTitle,
        }
        setDefenceRules([...defenceRules, newDefenceRule]);
        setDefenceRuleNumber(defenceRuleNumber + 1);
    };

  
  return (
        <div onSubmit={handleSubmit}>
        <Typography component="h1" variant="h5" align="center" sx={{ marginTop: '16px', marginBottom: '16px' }}>
            יצירת חוקי הגנה
        </Typography>
        <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField
                label="DefenceRule Number"
                value={defenceRuleNumber}
                disabled
                fullWidth
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                label="DefenceRule Title"
                value={defenceRuleTitle}
                onChange={(e) => setDefenceRuleTitle(e.target.value)}
                required
                fullWidth
            />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
                    הוסף חוק הגנה
                </Button>
            </Grid>
            <div>
                <Typography component="h1" variant="h5" sx={{ margin: '16px' }}>
                    חוקי הגנה
                </Typography>
                <Grid container>
                    {defenceRules.map((defenceRule, index) => (
                        <Grid item key={index}>
                            <DefenceRule key={index} defenceRule={defenceRule} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </Grid>
        </div>
  );
}
