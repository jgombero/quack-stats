import React, { useState, useEffect } from "react";
import axios from "axios";

const DuckStats = () => {
  const [state, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:8000/ducks")
      .then((res) => {
        setState(...res);
        setIsLoading(false);
      })
      .catch((error) => {
        // TODO: Handle error better
        console.error(`Error: ${error}`);
      });
  }, []);

  return <h1>This is the Duck Stats.</h1>;
};

export default DuckStats;
