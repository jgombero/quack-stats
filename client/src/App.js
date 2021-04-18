import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./components/Navbar/Navbar";
import DuckStats from "./components/DuckStats/DuckStats";
import DuckForm from "./components/DuckForm/DuckForm";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Route path="/" exact component={DuckForm} />
      <Route path="/ducks" exact component={DuckStats} />
    </Router>
  );
}

export default App;
