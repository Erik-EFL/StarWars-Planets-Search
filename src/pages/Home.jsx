/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import Form from '../components/Form';
import Table from '../components/Table';
import Context from '../context/Context';

const Home = () => {
  const { setData, setFilterByName } = useContext(Context);

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((data) => {
        setData(data.results);
        setFilterByName(data.results);
      });
  }, []);

  return (
    <div>
      <Form />
      <Table />
    </div>
  );
};

export default Home;
