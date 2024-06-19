import PdfDownloader from './pages/home';

// function App() {
//   return (
//     <div className="App">
//       <PdfDownloader />
//     </div>
//   );
// }

// export default App;


import React from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator, useAuthenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Home from './pages/home';
import { components, formFields } from './authComponents';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';



// configure the connection to the UserPool
// Amplify.configure({
//   Auth: {
//     Cognito: {
//       userPoolClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID || '',
//       userPoolId: process.env.REACT_APP_USER_POOL_ID || '',
//       // userPoolClientId: '4apo2c090gkgk35mu2118v2b0b',
//       // userPoolId: 'eu-west-2_2TTysTvda',
//       loginWith: { // Optional
//         oauth: {
//           domain: process.env.REACT_APP_COGNITO_DOMAIN || '',
//           // domain: 'https://tltest4.auth.eu-west-2.amazoncognito.com',
//           responseType: 'code',
//           redirectSignIn: ['http://localhost:3000/'],
//           redirectSignOut: ['http://localhost:3000/'],
//           scopes: ['email']
//         },
//         username: true,
//       }
//     }
//   }
// });

// console.log('USER_POOL_CLIENT_ID', process.env.USER_POOL_CLIENT_ID);
// console.log('USER_POOL_ID', process.env.USER_POOL_ID);
// console.log('COGNITO_DOMAIN', process.env.COGNITO_DOMAIN);

// import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
        p: 3,
      }}
    >
      {theme.palette.mode} mode
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
        <PdfDownloader />
  );
}

// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// });


// function App() {
//   return (
//     <ThemeProvider theme={darkTheme}>
//       <CssBaseline />
//         <PdfDownloader />
//     </ThemeProvider>
//   )
// }

// export default App;