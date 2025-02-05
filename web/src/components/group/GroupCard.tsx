import React from 'react';
import { Box, Typography } from '@mui/material';

interface GroupCardProps {
  name: string;
  description: string;
}

function GroupCard({ name, description }: GroupCardProps) {
  return (
    <Box sx={{ border: '1px solid #ccc', p: 2, mb: 2 }}>
      <Typography variant="h6">{name}</Typography>
      <Typography variant="body2">{description}</Typography>
    </Box>
  );
}

export default GroupCard;