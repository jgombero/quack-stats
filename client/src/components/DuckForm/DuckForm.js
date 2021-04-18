import React, { useState } from "react";
import axios from "axios";

const DuckForm = () => {
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

  return <h1>This is the Duck Form.</h1>;
};

export default DuckForm;
