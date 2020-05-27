import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="container">
            <Switch>
                <Route exact path="/signup" component={signup}/>
                <Route exact path="/login" component={login}/>
                <Route exact path="/" component={home}/>
            </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;