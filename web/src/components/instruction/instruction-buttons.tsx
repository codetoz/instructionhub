import { Avatar, Box, styled, SxProps, Typography } from '@mui/material';
import { Inventory2Rounded } from '@mui/icons-material';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClientUser } from '../../logic/auth/react-hooks';

interface Props {
  userId: string;
  groupId: string;
  className?: string;
  sx?: SxProps;
}

function InstructionNavigationButtons({
  userId,
  groupId,
  className,
  sx,
}: Props) {
  const navigate = useNavigate();

  const user = useClientUser();

  const handleUserClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      if (!user) return;
      navigate(`/${user?.username}`);
    },
    [user],
  );

  const handleGroupClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    navigate(`/group/group-slug`);
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      gap="10px"
      sx={sx}
      className={className}
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
  );
}

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

export default InstructionNavigationButtons;
