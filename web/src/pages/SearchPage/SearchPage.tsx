import React from 'react';
import { Box, Typography } from '@mui/material';

function SearchPage() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Search
      </Typography>
      <Typography variant="body1">
        This is where search results will be displayed.
      </Typography>
    </Box>
  );
}

export default SearchPage;