import React from 'react';
import { Inventory2Rounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Avatar,
  styled,
} from '@mui/material';
import { calculateTimePassed, TimePassed } from '../../helpers/date';

interface InstructionCardProps {
  instructionId: string;
  instructionName: string;
  userName: string;
  userAvatarUrl: string;
  groupName: string;
  version: string;
  updatedAt: Date;
  description: string;
  groupId: string;
}

export function InstructionCard(props: InstructionCardProps) {
  const navigate = useNavigate();

  const timePassed = calculateTimePassed(props.updatedAt);
  const formattedTimePassed = formatTimePassed(timePassed);

  const handleCardClick = () => {
    navigate(`/instruction/${props.instructionId}`);
  };

  const handleUserClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    navigate(`/profile/${props.userName}`);
  };

  const handleGroupClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    navigate(`/group/${props.groupId}`);
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
        <Typography variant="h6">{props.instructionName}</Typography>
        <Typography variant="caption" color="textSecondary">
          Updated {formattedTimePassed} · Version {props.version}
        </Typography>
        <Typography variant="body2" mt={1}>
          {props.description}
        </Typography>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          mt={2}
          gap="10px"
        >
          <TextButton onClick={handleUserClick}>
            <Avatar
              src={props.userAvatarUrl}
              alt={props.userName}
              sx={{ width: 32, height: 32 }}
            />
            <Typography className="text" variant="body2" color="text.primary">
              {props.userName}
            </Typography>
          </TextButton>
          <TextButton onClick={handleGroupClick}>
            <Inventory2Rounded
              sx={{ width: '18px', height: '18px', color: 'text.secondary' }}
            />
            <Typography className="text" variant="body2" color="text.primary">
              {props.groupName}
            </Typography>
          </TextButton>
        </Box>
      </CardContent>
    </Card>
  );
}

export default InstructionCard;

const TextButton = styled('div')`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  &:hover {
    .text {
      text-decoration: underline;
    }
  }
`;

function formatTimePassed(timePassed: TimePassed) {
  switch (true) {
    case timePassed.years > 0:
      return `${timePassed.years} years ago`;
    case timePassed.months > 0:
      return `${timePassed.months} months ago`;
    case timePassed.weeks > 0:
      return `${timePassed.weeks} weeks ago`;
    case timePassed.days > 0:
      return `${timePassed.days} days ago`;
    case timePassed.hours > 0:
      return `${timePassed.hours} hours ago`;
    case timePassed.minutes > 0:
      return `${timePassed.minutes} minutes ago`;
    default:
      return 'just now';
  }
}
