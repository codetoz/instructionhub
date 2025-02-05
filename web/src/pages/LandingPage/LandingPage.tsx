import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Chip,
  styled,
} from '@mui/material';

function LandingPage() {
  return (
    <Box
      sx={{
        backgroundColor: '#121212',
        color: '#fff',
        minHeight: '100vh',
        pt: 8,
        pb: 8,
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="h3" sx={{ mb: 4 }}>
          Find, <strong>use</strong> and share your custom instructions
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
                helm plugin
              </QueryChipTypography>
            }
            clickable
            variant="outlined"
          />
          <Chip
            label={
              <QueryChipTypography variant="caption">
                helm plugin
              </QueryChipTypography>
            }
            clickable
            variant="outlined"
          />
          <Chip
            label={
              <QueryChipTypography variant="caption">
                helm chart in the storage category
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
        <Typography variant="body1" sx={{ mb: 2 }}>
          Instruction Hub is an <strong>Open Source Project</strong>
        </Typography>
        <Button
          variant="contained"
          href="https://github.com"
          target="_blank"
          rel="noopener"
        >
          GitHub
        </Button>
      </Container>

      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Typography variant="h5" sx={{ mb: 4 }}>
          Explore and discover instructions
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 2,
          }}
        >
          {[...Array(6)].map((_, idx) => (
            <Box
              key={idx}
              sx={{
                border: '1px solid #333',
                p: 2,
                backgroundColor: '#222',
              }}
            >
              <Typography variant="h6">Instruction name</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                @ user name @group name
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Updated 2 months ago
              </Typography>
              <Typography variant="caption">Version 0.4.1</Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

const QueryChipTypography = styled(Typography)`
  color: white;
`;

export default LandingPage;
