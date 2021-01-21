import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Login from "./components/Login/login.component";
import Signup from "./components/Signup/signup.component";
import ProfileCard from "./components/ProfileCard/profile-card.component";
import Profiles from "./components/Profiles/profiles.component";
import SnakeGame from "./components/SnakeGame/snake-game.component";
import "./styles/index.scss"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/home" exact component={ProfileCard} />
          <Route path="/admin" exact component={Profiles} />
          <Route path="/login" exact component={Login} />
          <Route path="/" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/snake-game" exact component={SnakeGame} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
