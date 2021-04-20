import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Col, Button } from "react-bootstrap";
import {
  timeFirstNumbers,
  timeSecondNumbers,
  timePeriods,
  defaultState,
  title,
  subtitle,
  modalTitle,
  modalSubtext,
} from "./constants/constants";
import Header from "../Header/Header";
import CustomSpinner from "../CustomSpinner/CustomSpinner";
import Asterisk from "./Asterisk";
import CustomModal from "./CustomModal";

const DuckForm = () => {
  // --- State Hooks --- //
  const [state, setState] = useState(defaultState);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // --- Helper Functions --- //
  const handleCloseSuccessModal = () => setShowSuccessModal(false);

  const handleShowSuccessModal = () => setShowSuccessModal(true);

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

    // SetTimeout used here just to show off the spinner :)
    setTimeout(() => {
      axios
        .post("http://localhost:8000/ducks/add", duckData)
        .then((res) => {
          handleShowSuccessModal();
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
            <Asterisk />
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
                Food
                <Asterisk />
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
                Quantity (In Grams)
                <Asterisk />
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
                Park Name
                <Asterisk />
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
                Location
                <Asterisk />
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
                # of Ducks Fed
                <Asterisk />
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
            All fields marked with <Asterisk /> are required
          </Form.Text>
        </Form>
        <CustomModal
          title={modalTitle}
          subtext={modalSubtext}
          handleClose={handleCloseSuccessModal}
          show={showSuccessModal}
        />
      </Container>
    </>
  );
};

export default DuckForm;
