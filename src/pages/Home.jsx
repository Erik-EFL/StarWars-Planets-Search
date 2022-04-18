/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import Table from '../components/Table';
import Context from '../context/Context';

const Home = () => {
  const { setData } = useContext(Context);

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((data) => {
        setData(data.results);
      });
  }, []);

  return (
    <div>
      <Table />
    </div>
  );
};

export default Home;
