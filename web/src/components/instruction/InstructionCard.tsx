import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { calculateTimePassed } from '../../helpers/date';
import { useClientUser } from '../../logic/auth/react-hooks';
import InstructionNavigationButtons from './instruction-buttons';
import { formatTimePassed } from '../../logic/instruction/helpers';
import { copyToClipboard } from '../../helpers/copy-to-clipboard';
import { toast } from 'react-toastify';
import { deleteInstruction } from '../../logic/instruction/service';
import InstructionModal from '../../pages/ProfilePage/InstructionModal';
import { InstructionDetails } from '../../logic/instruction/types';

interface InstructionCardProps {
  instruction: InstructionDetails;
  showActionButtons?: boolean;
}

export function InstructionCard(props: InstructionCardProps) {
  const navigate = useNavigate();

  const user = useClientUser();
  const [instructionModalOpen, setInstructionModalOpen] = useState(false);

  const timePassed = calculateTimePassed(new Date(props.instruction.updatedAt));
  const formattedTimePassed = formatTimePassed(timePassed);

  const handleCardClick = () => {
    navigate(`/${user?.username}/${props.instruction.slug}`);
  };

  const handleEdit = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setInstructionModalOpen(true);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    void deleteInstruction(props.instruction.id);
  };

  return (
    <>
      {instructionModalOpen && (
        <InstructionModal
          open={instructionModalOpen}
          onClose={() => setInstructionModalOpen(false)}
          instruction={props.instruction}
        />
      )}
      <Card
        onClick={handleCardClick}
        sx={{
          cursor: 'pointer',
          background: 'transparent',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'rgba(255,255,255, 0.25) 0px 2px 8px 0px',
          },
          border: '1px solid #676869',
        }}
      >
        <CardContent>
          <Typography variant="h6">{props.instruction.title}</Typography>
          <Typography variant="caption" color="textSecondary">
            Updated {formattedTimePassed}{' '}
            {props.instruction.version &&
              `· Version ${props.instruction.version}`}
          </Typography>
          <Typography variant="body2" mt={1}>
            {props.instruction.description}
          </Typography>
          <InstructionNavigationButtons
            sx={{ mt: 2 }}
            groupId={props.instruction.groupId}
            userId={props.instruction.createdBy}
          />
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(props.instruction.content).then(() =>
                  toast.success('Instruction content copied to clipboard'),
                );
              }}
            >
              Copy
            </Button>
            {props.showActionButtons &&
              props.instruction.createdBy === user?.id && (
                <>
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={(e) => handleEdit(e)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={(e) => handleDelete(e)}
                  >
                    Delete
                  </Button>
                </>
              )}
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

export default InstructionCard;
