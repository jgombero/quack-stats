import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Jumbotron } from "react-bootstrap";
import MaterialTable from "material-table";
import { tableIcons, columns } from "./constants/constants";

const DuckStats = () => {
  const [state, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:8000/ducks")
      .then((res) => {
        setState([...res.data]);
        setIsLoading(false);
      })
      .catch((error) => {
        // TODO: Handle error better
        console.error(`Error: ${error}`);
      });
  }, []);

  return (
    <>
      <Jumbotron>
        <Container>
          <h1>Quack Stats</h1>
          <h5>Here are the latest statistics about duck feedings around the world!</h5>
        </Container>
      </Jumbotron>
      <Container>
        {state.length > 0 && (
          <MaterialTable
            title="Duck Feeding Stats"
            columns={columns}
            data={state}
            icons={tableIcons}
          />
        )}
      </Container>
    </>
  );
};

export default DuckStats;
