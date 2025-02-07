import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material';
import AppRoutes from './routes/AppRoutes';

import TheHeader from './components/layout/TheHeader';
import { useAuthStore } from './services/auth/store';

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
  useEffect(() => {
    useAuthStore.getState().initialize();
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <TheHeader />
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
