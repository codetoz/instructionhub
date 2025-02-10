import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  styled,
  useTheme,
} from '@mui/material';
import { GitHub } from '@mui/icons-material';
import InstructionCard from '../../components/instruction/InstructionCard';
import TheConstrain from '../../components/layout/TheConstrain';
import { useClientUser } from '../../logic/auth/react-hooks';
import { useUserInstructions } from '../../logic/instruction/react-hooks';

function LandingPage() {
  const theme = useTheme();
  const clientUser = useClientUser();
  const { data: instructions, error } = useUserInstructions(clientUser?.id);
  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100vh',
        pt: 8,
      }}
    >
      <TheConstrain maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="h3" sx={{ mb: 4 }}>
          Find, <strong>use</strong> and share instructions
        </Typography>
        <Box
          component="form"
          sx={{
            display: 'flex',
            gap: 1,
            justifyContent: 'center',
            mb: 2,
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            variant="outlined"
            placeholder="Search instructions"
            size="small"
            slotProps={{
              input: {
                sx: {
                  color: 'white',
                },
              },
            }}
            fullWidth
            sx={{
              maxWidth: 400,
              backgroundColor: '#333',
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#555',
              '&:hover': {
                backgroundColor: '#444',
              },
            }}
          >
            Search
          </Button>
        </Box>
        <Typography variant="body1" sx={{ mb: 4 }}>
          You can also browse all instructions or try one of the sample queries:
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            flexWrap: 'wrap',
            mb: 4,
          }}
        >
          <Chip
            label={
              <QueryChipTypography variant="caption">
                code style
              </QueryChipTypography>
            }
            clickable
            variant="outlined"
          />
          <Chip
            label={
              <QueryChipTypography variant="caption">
                o1 pro
              </QueryChipTypography>
            }
            clickable
            variant="outlined"
          />
          <Chip
            label={
              <QueryChipTypography variant="caption">
                reactjs
              </QueryChipTypography>
            }
            clickable
            variant="outlined"
          />
        </Box>
        {/* <Box
          component="img"
          src="https://via.placeholder.com/600x300/000/fff?text=Sample+Banner"
          alt="Sample Banner"
          sx={{ width: '100%', maxWidth: 600, mb: 4 }}
        /> */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Instruction Hub is an <strong>Open Source</strong> Project
        </Typography>
        <Button
          variant="outlined"
          href={import.meta.env.VITE_GITHUB_PROJECT_URL}
          target="_blank"
          rel="noopener"
          startIcon={<GitHub />}
        >
          GitHub
        </Button>
      </TheConstrain>

      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <TheConstrain
          sx={{
            mt: 8,
            py: '30px',
          }}
        >
          <Typography variant="h5" sx={{ mb: 4 }} textAlign="center">
            Explore and discover instructions
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 2,
            }}
          >
            {instructions?.map((i) => (
              <InstructionCard
                key={i.id}
                title={i.title}
                id={i.id}
                description={i.description}
                groupId={i.groupId}
                updatedAt={new Date(i.updatedAt)}
                version=""
                slug={i.slug}
                userId={i.createdBy}
                // starsCount={Math.floor(Math.random() * 10)}
                // clientUserGaveStar={Math.random() > 0.5 ? true : false}
              />
            ))}
          </Box>
        </TheConstrain>
      </Box>
    </Box>
  );
}

const QueryChipTypography = styled(Typography)`
  color: white;
`;

export default LandingPage;
