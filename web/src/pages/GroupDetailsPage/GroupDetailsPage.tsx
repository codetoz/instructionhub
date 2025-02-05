import React from 'react';
import { Box, Typography } from '@mui/material';

function GroupDetailsPage() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Group Details
      </Typography>
      <Typography variant="body1">
        This is where the details of a specific group will be displayed.
      </Typography>
    </Box>
  );
}

export default GroupDetailsPage;