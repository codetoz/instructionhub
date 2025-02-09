import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Button } from '@mui/material';
import TheConstrain from '../../components/layout/TheConstrain';
import InstructionModal from './InstructionModal';
import useSWR from 'swr';
import { useClientUser } from '../../logic/auth/react-hooks';
import { fetchUserInstructions } from '../../logic/instruction/service';
import InstructionCard from '../../components/instruction/InstructionCard';

function ProfilePage() {
  const [tabValue, setTabValue] = useState(0);
  const clientUser = useClientUser();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const [instructionModalOpen, setInstructionModalOpen] = useState(false);

  const { data: instructions, error } = useSWR(
    `users/instructions/${clientUser?.id}`,
    () => fetchUserInstructions(clientUser?.id),
  );

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
            {instructions?.length ? (
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                  gap: 2,
                  mt: 2,
                  p: 2,
                }}
              >
                {instructions.map((i) => (
                  <InstructionCard
                    key={i.id}
                    id={i.id}
                    title={i.title}
                    slug={i.slug}
                    userId={i.createdBy}
                    version={'0.0.1'}
                    updatedAt={new Date(i.updatedAt)}
                    description={i.description}
                    groupId={''}
                  />
                ))}
              </Box>
            ) : (
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
            )}
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
