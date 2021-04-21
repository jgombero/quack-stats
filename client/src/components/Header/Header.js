import React from "react";
import { Jumbotron, Container } from "react-bootstrap";

const Header = ({ title, subtitle }) => {
  return (
    <Jumbotron>
      <Container>
        <header>
          <h1 className="title">{title}</h1>
          <h5 className="title">{subtitle}</h5>
        </header>
      </Container>
    </Jumbotron>
  );
};

export default Header;
