import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./components/Navbar/Navbar";
import DuckStats from "./components/DuckStats/DuckStats";
import DuckForm from "./components/DuckForm/DuckForm";

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <Route path="/" exact component={DuckForm} />
      <Route path="/ducks" exact component={DuckStats} />
    </Router>
  );
};

export default App;
