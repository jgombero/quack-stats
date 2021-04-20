import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Col, Button, Modal } from "react-bootstrap";
import {
  timeFirstNumbers,
  timeSecondNumbers,
  timePeriods,
  defaultState,
  title,
  subtitle,
} from "./constants/constants";
import Header from "../Header/Header";
import CustomSpinner from "../CustomSpinner/CustomSpinner";

const DuckForm = () => {
  const [state, setState] = useState(defaultState);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCloseSuccess = () => setShowSuccess(false);
  const handleShowSuccess = () => setShowSuccess(true);

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

    setTimeout(() => {
      axios
        .post("http://localhost:8000/ducks/add", duckData)
        .then((res) => {
          handleShowSuccess();
          resetState(defaultState);
          setIsLoading(false);
        })
        .catch((error) => {
          // TODO: Handle errors better
          console.error(`Error: ${error}`);
          setIsLoading(false);
        });
    }, 1000);
  };

  if (isLoading) {
    return <CustomSpinner />;
  }

  return (
    <>
      <Header title={title} subtitle={subtitle} />
      <Container>
        <Form onSubmit={(event) => onSubmitHandler(event)}>
          <Form.Label>
            Time
            <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Row>
            <Form.Group as={Col} md="2" controlId="formGridTimeFirstNumber">
              <Form.Control
                as="select"
                value={state.timeFirstNumber}
                onChange={(event) => onChangeHandler("timeFirstNumber", event)}
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
              >
                {timePeriods.map((timePeriod, index) => {
                  return <option key={index}>{timePeriod}</option>;
                })}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="formGridFood">
              <Form.Label>
                Food<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Ex. Bread"
                value={state.food}
                onChange={(event) => onChangeHandler("food", event)}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="formGridFoodQuantity">
              <Form.Label>
                Quantity (In Grams)<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder={0}
                min={1}
                value={state.foodQuantity}
                onChange={(event) => onChangeHandler("foodQuantity", event)}
              />
              <Form.Text className="text-muted">Tip: An average loaf of bread is 800g</Form.Text>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="formGridParkName">
              <Form.Label>
                Park Name<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Ex. Queen Elizabeth"
                value={state.park}
                onChange={(event) => onChangeHandler("park", event)}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="formGridParkLocation">
              <Form.Label>
                Location<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Ex. Vancouver, BC"
                value={state.location}
                onChange={(event) => onChangeHandler("location", event)}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="2" controlId="formGridDuckQuantity">
              <Form.Label>
                # of Ducks Fed<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                required
                type="number"
                placeholder={0}
                min={1}
                value={state.duckQuantity}
                onChange={(event) => onChangeHandler("duckQuantity", event)}
              />
            </Form.Group>
          </Form.Row>
          <Button type="submit">Submit</Button>
          <Form.Text className="text-muted">
            All fields marked with <span style={{ color: "red" }}>*</span> are required
          </Form.Text>
        </Form>
        <Modal show={showSuccess} onHide={handleCloseSuccess}>
          <Modal.Header closeButton>
            <Modal.Title>Submission Quack-ccessful!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Your response fits the bill!</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseSuccess}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default DuckForm;
