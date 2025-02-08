import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Button } from '@mui/material';
import TheConstrain from '../../components/layout/TheConstrain';
import InstructionModal from './InstructionModal';

function ProfilePage() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const [instructionModalOpen, setInstructionModalOpen] = useState(false);

  return (
    <>
      <InstructionModal
        open={instructionModalOpen}
        onClose={() => setInstructionModalOpen(false)}
      />
      <TheConstrain>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Profile
        </Typography>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Instructions" />
          <Tab label="Groups" />
        </Tabs>
        {tabValue === 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">
              Here you can manage all of your instructions. Create, edit, or
              remove instructions as needed.
            </Typography>
            <Box
              sx={{
                backgroundColor: '#333',
                mt: 2,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant="body1" sx={{ mb: 2 }}>
                Add your first instructions!
              </Typography>
              <Button
                variant="contained"
                onClick={() => setInstructionModalOpen(true)}
              >
                Add Instructions
              </Button>
            </Box>
          </Box>
        )}
        {tabValue === 1 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">
              Manage all of your groups here. You can create new groups or
              update existing ones.
            </Typography>
            <Box
              sx={{
                backgroundColor: '#333',
                mt: 2,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant="body1" sx={{ mb: 2 }}>
                Add your first group!
              </Typography>
              <Button variant="contained">Add Group</Button>
            </Box>
          </Box>
        )}
      </TheConstrain>
    </>
  );
}

export default ProfilePage;
