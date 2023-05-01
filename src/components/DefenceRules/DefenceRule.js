import React from "react";
import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";

const DefenceRuleWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

export default function DefenceRule({ defenceRule }) {
  return (
    <DefenceRuleWrapper sx={{ margin: '16px' }}>
      <Typography variant="h6">  חוק הגנה {defenceRule.defenceRuleNumber} - {defenceRule.defenceRuleTitle}</Typography>
    </DefenceRuleWrapper>
  );
}
