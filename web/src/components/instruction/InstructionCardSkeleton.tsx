import { Card, CardContent, Skeleton, Box } from '@mui/material';

function InstructionCardSkeleton() {
  return (
    <Card
      sx={{
        background: 'transparent',
        boxShadow: 'none',
        border: '1px solid #676869',
      }}
    >
      <CardContent>
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="80%" />
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Skeleton variant="rectangular" width={90} height={36} />
          <Skeleton variant="rectangular" width={90} height={36} />
        </Box>
      </CardContent>
    </Card>
  );
}

export default InstructionCardSkeleton;