import { useCallback, useEffect } from 'react';
import {
  Avatar,
  Box,
  IconButton,
  styled,
  Typography,
  Skeleton,
} from '@mui/material';
import { toast } from 'react-toastify';
import TheConstrain from '../../components/layout/TheConstrain';
import InstructionNavigationButtons from '../../components/instruction/instruction-buttons';
import { ContentCopyRounded } from '@mui/icons-material';
import { useInstruction } from '../../logic/instruction/react-hooks';
import { useParams } from 'react-router-dom';
import { useClientUser } from '../../logic/auth/react-hooks';
import { copyToClipboard } from '../../helpers/copy-to-clipboard';
import { AxiosError } from 'axios';

function InstructionDetailsPage() {
  const params = useParams() as {
    username: string;
    ['instruction-slug']: string;
  };

  const clientUser = useClientUser();

  const {
    data: instruction,
    error,
    isLoading,
  } = useInstruction(clientUser?.id || '', params['instruction-slug']);

  const handleCopyContent = useCallback(() => {
    if (!instruction) return;
    copyToClipboard(instruction.content).then(() => {
      toast.success('Instruction copied to clipboard successfully.');
    });
  }, [instruction]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  if (
    error &&
    error instanceof AxiosError &&
    error.status &&
    error.status >= 400 &&
    error.status < 500
  ) {
    return (
      <TheConstrain sx={{ mt: 4 }}>
        <Typography variant="h6">404: No Instruction found</Typography>
      </TheConstrain>
    );
  } else if (error && !error.response) {
    return (
      <TheConstrain sx={{ mt: 4 }}>
        <Typography variant="h6">
          Please check your internet connection and try again
        </Typography>
      </TheConstrain>
    );
  } else if (!instruction && !error) {
    return (
      <TheConstrain>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="rectangular" width="100%" height={200} />
        </Box>
      </TheConstrain>
    );
  }

  return (
    <>
      <Header>
        <TheConstrain
          sx={{
            display: 'flex',
            alignItems: 'center',
            py: '30px',
            gap: '32px',
            flexWrap: 'wrap',
          }}
        >
          <Avatar sx={{ mr: 1 }}></Avatar>
          <InstructionTitle>
            <Typography variant="h5" sx={{ mt: 1 }}>
              {instruction?.title}
            </Typography>
            <InstructionNavigationButtons userId={''} groupId={''} />
          </InstructionTitle>
          <Typography sx={{ width: '100%' }}>
            {instruction?.description}
          </Typography>
        </TheConstrain>
      </Header>
      <Body>
        <TheConstrain
          sx={{
            display: 'flex',
            py: '30px',
            gap: '8px',
            flexDirection: 'column',
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            gap="10px"
            borderBottom="1px solid rgba(255,255,255,0.12)"
            width="fit-content"
            pr={4}
          >
            <Typography color="textPrimary" variant="h5">
              Content
            </Typography>
            <IconButton
              color="primary"
              onClick={handleCopyContent}
              size="medium"
            >
              <ContentCopyRounded />
            </IconButton>
          </Box>
          <Typography
            color="textSecondary"
            variant="body1"
            component="pre"
            sx={{ textWrap: 'wrap' }}
          >
            {instruction?.content}
          </Typography>
        </TheConstrain>
      </Body>
    </>
  );
}

const Header = styled('div')`
  background-color: ${(props) => props.theme.palette.background.paper};
`;

const InstructionTitle = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const Body = styled('div')`
  background-color: #2c2e31;
`;

export default InstructionDetailsPage;
