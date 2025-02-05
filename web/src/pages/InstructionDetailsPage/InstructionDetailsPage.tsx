import { Box, Typography } from '@mui/material';

function InstructionDetailsPage() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Instruction Details
      </Typography>
      <Typography variant="body1">
        This is where the details of a specific instruction will be displayed.
      </Typography>
    </Box>
  );
}

export default InstructionDetailsPage;