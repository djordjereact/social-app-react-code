import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import jwtDecode from 'jwt-decode';
import { Provider } from 'react-redux';
import store from './redux/reducers/store';
import { SET_AUTHENTICATED } from './redux/reducers/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import AuthRoute from './util/AuthRoute';
import Navbar from './components/Navbar';
import axios from 'axios';

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

const token = localStorage.FBIdToken;
if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        store.dispatch(logoutUser());
        window.location.href = '/login';
    } else {
        store.dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common['Authorization'] = token;
        store.dispatch(getUserData());
    }
}

function App() {
  return (
      <ThemeProvider theme={theme}>
          <Provider store={store}>
                  <BrowserRouter>
                      <Navbar/>
                      <div className="container">
                          <Switch>
                              <Route exact path="/" component={home}/>
                              <AuthRoute
                                  exact
                                  path="/login"
                                  component={login}
                              />
                              <AuthRoute
                                  exact
                                  path="/signup"
                                  component={signup}
                              />
                          </Switch>
                      </div>
                  </BrowserRouter>
          </Provider>
      </ThemeProvider>
  );
}

export default App;