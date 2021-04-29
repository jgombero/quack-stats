import React, { useState, useEffect } from "react";
import useAxios from "axios-hooks";
import { Container } from "react-bootstrap";
import MaterialTable from "material-table";
import { tableIcons, columns, title, subtitle } from "./constants/constants";
import Header from "../Header/Header";
import CustomSpinner from "../CustomSpinner/CustomSpinner";

const DuckData = () => {
  // --- State Hooks --- //
  const [isLoading, setIsLoading] = useState(false);
  const [{ data, loading, error }] = useAxios("http://localhost:8000/ducks");

  useEffect(() => {
    setIsLoading(true);
    // SetTimeout used here just to show off the spinner :)
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

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
        {data.length > 0 && (
          <MaterialTable
            title="Duck Feeding Stats"
            columns={columns}
            data={data.reverse()}
            icons={tableIcons}
          />
        )}
      </Container>
    </>
  );
};

export default DuckData;
