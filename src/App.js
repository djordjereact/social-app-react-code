import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import jwtDecode from 'jwt-decode';
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import AuthRoute from './util/AuthRoute';
import Navbar from './components/Navbar';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#33c9dc',
            main: '#00bcd4',
            dark: '#008394',
            contrastText: '#fff'
        },
        secondary: {
            light: '#ff6333',
            main: '#ff3d00',
            dark: '#b22a00',
            contrastText: '#fff'
        }
    },
    typography: {
        useNextVariants: true
    }
});

let authenticated;
const token = localStorage.FBIdToken;
if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        window.location.href = '/login';
        authenticated = false;
    } else {
        authenticated = true;
    }
}

function App() {
  return (
      <ThemeProvider theme={theme}>
          <div className="App">
              <BrowserRouter>
                  <Navbar/>
                  <div className="container">
                      <Switch>
                          <Route exact path="/" component={home}/>
                          <AuthRoute exact path="/signup" component={signup} authenticated={authenticated}/>
                          <AuthRoute exact path="/login" component={login} authenticated={authenticated}/>
                      </Switch>
                  </div>
              </BrowserRouter>
          </div>
      </ThemeProvider>
  );
}

export default App;