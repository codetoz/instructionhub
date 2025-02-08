import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material';
import AppRoutes from './routes/AppRoutes';

const theme = createTheme({
  palette: {
    text: {
      primary: '#f3f2f2',
      secondary: '#d2d0d0',
    },
    background: {
      default: '#141217',
      paper: '#222529',
    },
  },
  shape: {
    borderRadius: 0,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
