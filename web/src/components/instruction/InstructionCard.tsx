import React, { useCallback } from 'react';
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
import { useClientUser } from '../../logic/auth/react-hooks';

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

  const handleUserClick = useCallback(() => {
    if (!user) return;
    navigate(`/${user?.username}`);
  }, [user]);

  const handleGroupClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    navigate(`/group/group-slug`);
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
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          mt={2}
          gap="10px"
        >
          <TextButton onClick={handleUserClick}>
            <Avatar
              src={'AvatarUrl'}
              alt={user?.username}
              sx={{ width: 32, height: 32 }}
            />
            <Typography className="text" variant="body2" color="text.primary">
              {user?.username}
            </Typography>
          </TextButton>
          <TextButton onClick={handleGroupClick}>
            <Inventory2Rounded
              sx={{ width: '18px', height: '18px', color: 'text.secondary' }}
            />
            <Typography className="text" variant="body2" color="text.primary">
              {'groupName'}
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
      return `${timePassed.years} year${timePassed.years > 1 ? 's' : ''} ago`;
    case timePassed.months > 0:
      return `${timePassed.months} month${timePassed.months > 1 ? 's' : ''} ago`;
    case timePassed.weeks > 0:
      return `${timePassed.weeks} week${timePassed.weeks > 1 ? 's' : ''} ago`;
    case timePassed.days > 0:
      return `${timePassed.days} day${timePassed.days > 1 ? 's' : ''} ago`;
    case timePassed.hours > 0:
      return `${timePassed.hours} hour${timePassed.hours > 1 ? 's' : ''} ago`;
    case timePassed.minutes > 0:
      return `${timePassed.minutes} minute${timePassed.minutes > 1 ? 's' : ''} ago`;
    default:
      return 'just now';
  }
}
