import React, { useState } from "react";
import axios from "axios";
import { Jumbotron, Container, Form, Col, Button } from "react-bootstrap";

const DuckForm = () => {
  const timeNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  const timePeriods = ["am", "pm"];

  const defaultState = {
    time: "",
    food: "",
    park: "",
    location: "",
    duckQuantity: 0,
    foodQuantity: 0,
  };

  const [state, setState] = useState(defaultState);
  const [isLoading, setIsLoading] = useState(false);

  const resetState = () => {
    setState(defaultState);
  };

  const onChangeHandler = (key, event) => {
    setState({ [key]: event.target.value });
  };

  const onSubmitHandler = (event) => {
    setIsLoading(true);
    event.preventDefault();

    const duckData = {
      time: state.time,
      food: state.food,
      park: state.park,
      location: state.location,
      duckQuantity: state.duckQuantity,
      foodQuantity: state.foodQuantity,
    };

    console.log("Duck Data on Submit: ", duckData);

    axios
      .post("http://localhost:8000/ducks/add", duckData)
      .then((res) => {
        resetState();
        setIsLoading(false);
        // TODO: Render a modal confirming that the data was received
      })
      .catch((error) => {
        // TODO: Handle errors better
        console.error(`Error: ${error}`);
      });
  };

  return (
    <>
      <Jumbotron>
        <Container>
          <h1>Quack Form</h1>
          <h5>Please enter your duck data.</h5>
        </Container>
      </Jumbotron>
      <Container>
        <Form>
          <Form.Label>Time</Form.Label>
          <Form.Row>
            <Form.Group as={Col} md="2" controlId="formGridTimeNumber">
              <Form.Control as="select" required>
                {timeNumbers.map((timeNumber) => {
                  return <option>{timeNumber}</option>;
                })}
              </Form.Control>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="2" controlId="formGridTimePeriod">
              <Form.Control as="select" required>
                {timePeriods.map((timePeriod) => {
                  return <option>{timePeriod}</option>;
                })}
              </Form.Control>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="formGridFood">
              <Form.Label>Food</Form.Label>
              <Form.Control required type="text" placeholder="Ex. Bread" />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="formGridFoodQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control require type="number" placeholder="0" />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="formGridParkName">
              <Form.Label>Park Name</Form.Label>
              <Form.Control required type="text" placeholder="Ex. Queen Elizabeth" />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="formGridParkLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control required type="text" placeholder="Ex. Vancouver, BC" />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="2" controlId="formGridDuckQuantity">
              <Form.Label>Duck Count</Form.Label>
              <Form.Control required type="number" />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Button type="submit">Submit form</Button>
        </Form>
      </Container>
    </>
  );
};

export default DuckForm;
