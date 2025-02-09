import { toast, ToastContainer } from 'react-toastify';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material';
import AppRoutes from './routes/AppRoutes';
import { useEffect } from 'react';

const theme = createTheme({
  palette: {
    text: {
      primary: '#f3f2f2',
      secondary: '#d2d0d0',
    },
    primary: { main: '#f3f2f2', dark: '#d2d0d0' },
    secondary: { main: '#d2d0d0' },
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
      <ToastContainer
        position="bottom-center"
        hideProgressBar
        limit={3}
        autoClose={3000}
        theme="dark"
      />
    </ThemeProvider>
  );
}

export default App;
