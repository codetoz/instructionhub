import { Box, Typography } from '@mui/material';
import { diffMonths } from '../../helpers/date';

interface InstructionCardProps {
  name: string;
  groupName: string;
  userName: string;
  description: string;
  updatedAt: Date;
  version: string;
}

function InstructionCard({
  name,
  groupName,
  userName,
  description,
  updatedAt,
  version,
}: InstructionCardProps) {
  const updatedAtNMonthsAgo = diffMonths(updatedAt, new Date());
  return (
    <Box
      sx={{
        border: '1px solid #333',
        p: 2,
        backgroundColor: '#222',
      }}
    >
      <Typography variant="h6">{name}</Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        @{userName} @{groupName}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        {description}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        Updated {updatedAtNMonthsAgo} months ago
      </Typography>
      <Typography variant="caption">Version {version}</Typography>
    </Box>
  );
}

export default InstructionCard;
