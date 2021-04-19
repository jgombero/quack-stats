import React from "react";
import { Jumbotron, Container } from "react-bootstrap";

const Header = ({ title, subtitle }) => {
  return (
    <Jumbotron>
      <Container>
        <header>
          <h1>{title}</h1>
          <h5>{subtitle}</h5>
        </header>
      </Container>
    </Jumbotron>
  );
};

export default Header;
