import React from 'react';
import { Box, Typography } from '@mui/material';

interface InstructionCardProps {
  title: string;
  description: string;
}

function InstructionCard({ title, description }: InstructionCardProps) {
  return (
    <Box sx={{ border: '1px solid #ccc', p: 2, mb: 2 }}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2">{description}</Typography>
    </Box>
  );
}

export default InstructionCard;