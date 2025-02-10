import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import { calculateTimePassed } from '../../helpers/date';
import { useClientUser } from '../../logic/auth/react-hooks';
import InstructionNavigationButtons from './instruction-buttons';
import { formatTimePassed } from '../../logic/instruction/helpers';

interface InstructionCardProps {
  id: string;
  title: string;
  userId: string;
  groupId: string;
  version: string;
  updatedAt: Date;
  description: string;
  slug: string;
}

export function InstructionCard(props: InstructionCardProps) {
  const navigate = useNavigate();

  const user = useClientUser();

  const timePassed = calculateTimePassed(props.updatedAt);
  const formattedTimePassed = formatTimePassed(timePassed);

  const handleCardClick = () => {
    navigate(`/${user?.username}/${props.slug}`);
  };

  return (
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
        <Typography variant="h6">{props.title}</Typography>
        <Typography variant="caption" color="textSecondary">
          Updated {formattedTimePassed} · Version {props.version}
        </Typography>
        <Typography variant="body2" mt={1}>
          {props.description}
        </Typography>
        <InstructionNavigationButtons
          sx={{ mt: 2 }}
          groupId={props.groupId}
          userId={props.userId}
        />
      </CardContent>
    </Card>
  );
}

export default InstructionCard;
