import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";
import Register from "./components/Register";
import AddPost from "./components/AddPost";
function App() {
  return (
    <div className="bg-light">
      <Navbar />
      <div className="wrapper">
        <Route exact path="/" component={Main} />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/upload" component={AddPost} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
