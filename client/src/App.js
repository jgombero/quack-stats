import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/fonts.css";
import NavigationBar from "./components/Navbar/Navbar";
import DuckData from "./components/DuckData/DuckData";
import DuckForm from "./components/DuckForm/DuckForm";

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <Route path="/" exact component={DuckForm} />
      <Route path="/ducks" exact component={DuckData} />
    </Router>
  );
};

export default App;
