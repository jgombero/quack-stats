import React, { useState } from "react";
import axios from "axios";
import { Jumbotron, Container, Form, Col, Button } from "react-bootstrap";
import {
  timeFirstNumbers,
  timeSecondNumbers,
  timePeriods,
  defaultState,
} from "./constants/constants";

const DuckForm = () => {
  const [state, setState] = useState(defaultState);
  const [isLoading, setIsLoading] = useState(false);

  const resetState = (defaultState) => {
    setState(defaultState);
  };

  const onChangeHandler = (key, event) => {
    setState((prev) => {
      return { ...prev, [key]: event.target.value };
    });
  };

  const onSubmitHandler = (event) => {
    setIsLoading(true);
    event.preventDefault();

    const duckData = {
      time: `${state.timeFirstNumber}:${state.timeSecondNumber} ${state.timePeriod}`,
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
        resetState(defaultState);
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
          <h5>Please enter your duck feeding data.</h5>
        </Container>
      </Jumbotron>
      <Container>
        <Form onSubmit={(event) => onSubmitHandler(event)}>
          <Form.Label>Time</Form.Label>
          <Form.Row>
            <Form.Group as={Col} md="2" controlId="formGridTimeFirstNumber">
              <Form.Control
                as="select"
                value={state.timeFirstNumber}
                onChange={(event) => onChangeHandler("timeFirstNumber", event)}
                onBlur={(event) => onChangeHandler("timeFirstNumber", event)}
              >
                {timeFirstNumbers.map((timeFirstNumber, index) => {
                  return <option key={index}>{timeFirstNumber}</option>;
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="2" controlId="formGridTimeSecondNumber">
              <Form.Control
                as="select"
                value={state.timeSecondNumber}
                onChange={(event) => onChangeHandler("timeSecondNumber", event)}
                onBlur={(event) => onChangeHandler("timeSecondNumber", event)}
              >
                {timeSecondNumbers.map((timeSecondNumber, index) => {
                  return <option key={index}>{timeSecondNumber}</option>;
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="2" controlId="formGridTimePeriod">
              <Form.Control
                as="select"
                value={state.timePeriod}
                onChange={(event) => onChangeHandler("timePeriod", event)}
                onBlur={(event) => onChangeHandler("timePeriod", event)}
              >
                {timePeriods.map((timePeriod, index) => {
                  return <option key={index}>{timePeriod}</option>;
                })}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="formGridFood">
              <Form.Label>Food</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Ex. Bread"
                value={state.food}
                onChange={(event) => onChangeHandler("food", event)}
                onBlur={(event) => onChangeHandler("food", event)}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="formGridFoodQuantity">
              <Form.Label>Quantity (In Grams)</Form.Label>
              <Form.Control
                type="number"
                placeholder={0}
                min={1}
                value={state.foodQuantity}
                onChange={(event) => onChangeHandler("foodQuantity", event)}
                onBlur={(event) => onChangeHandler("foodQuantity", event)}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="formGridParkName">
              <Form.Label>Park Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Ex. Queen Elizabeth"
                value={state.park}
                onChange={(event) => onChangeHandler("park", event)}
                onBlur={(event) => onChangeHandler("park", event)}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="formGridParkLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Ex. Vancouver, BC"
                value={state.location}
                onChange={(event) => onChangeHandler("location", event)}
                onBlur={(event) => onChangeHandler("location", event)}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="2" controlId="formGridDuckQuantity">
              <Form.Label>Duck Count</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder={0}
                min={1}
                value={state.duckQuantity}
                onChange={(event) => onChangeHandler("duckQuantity", event)}
                onBlur={(event) => onChangeHandler("duckQuantity", event)}
              />
            </Form.Group>
          </Form.Row>
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    </>
  );
};

export default DuckForm;
