import React, { useState } from "react";
import useAxios from "axios-hooks";
import { Container, Form, Col, Button } from "react-bootstrap";
import {
  timeHoursHand,
  timeMinutesHand,
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
  const [{ loading, error }, submitForm] = useAxios(
    {
      url: "http://localhost:8000/ducks/add",
      method: "POST",
    },
    {
      manual: true,
    }
  );

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

  const onSubmitHandler = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    const duckData = {
      time: `${state.timeHoursHand}:${state.timeMinutesHand} ${state.timePeriod}`,
      food: state.food,
      park: state.park,
      location: state.location,
      duckQuantity: state.duckQuantity,
      foodQuantity: state.foodQuantity,
    };

    // SetTimeout used here just to show off the spinner :)
    setTimeout(() => {
      submitForm({
        data: {
          ...duckData,
        },
      }).then((res) => {
        handleShowSuccessModal();
        resetState(defaultState);
        setIsLoading(false);
      });
    }, 1000);
  };

  if (loading || isLoading) {
    return <CustomSpinner />;
  }

  if (error) {
    // Show the user a useful error message
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
            <Form.Group as={Col} md="2" controlId="formGridTimeHoursHand">
              <Form.Control
                as="select"
                value={state.timeHoursHand}
                onChange={(event) => onChangeHandler("timeHoursHand", event)}
              >
                {timeHoursHand.map((hour, index) => {
                  return <option key={index}>{hour}</option>;
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="2" controlId="formGridTimeMinutesHand">
              <Form.Control
                as="select"
                value={state.timeMinutesHand}
                onChange={(event) => onChangeHandler("timeMinutesHand", event)}
              >
                {timeMinutesHand.map((minute, index) => {
                  return <option key={index}>{minute}</option>;
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
