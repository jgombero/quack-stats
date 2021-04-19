import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import MaterialTable from "material-table";
import { tableIcons, columns, title, subtitle } from "./constants/constants";
import Header from "../Header/Header";

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
      <Header title={title} subtitle={subtitle} />
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
