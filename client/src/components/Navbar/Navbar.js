import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <section id="navbar">
      <Container>
        <div className="navbar-wrapper">
          <Row>
            <Col>
              <Link to="/">
               Form
              </Link>
            </Col>
            <Col>
              <Link to="/ducks">
                Stats
              </Link>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Navbar;
