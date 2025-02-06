import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material';
import AppRoutes from './routes/AppRoutes';

import TheHeader from './components/layout/TheHeader';
import { useAuthStore } from './services/auth/store';

const theme = createTheme();

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
