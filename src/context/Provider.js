/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useState, useMemo } from 'react';
import { filterColumn } from '../helpers/helper';
import Context from './Context';

const Provider = ({ children }) => {
  const [data, setData] = useState({});
  const [filterByName, setFilterByName] = useState({});
  const [filterData, setFilterData] = useState();
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [sort, setSort] = useState({});
  const [usedFilters, setUsedFilters] = useState([...filterColumn]);

  useMemo(() => {
    setUsedFilters(filterColumn.filter((column) => !filterByNumericValues
      .map((filter) => filter.column).includes(column)));
  }, [filterByNumericValues]);

  useMemo(() => {
    filterByNumericValues.forEach(({ column, value, comparison }) => {
      setFilterData([...filterData.filter((result) => {
        const columns = Number(result[column]);
        if (comparison === 'maior que') return columns > +value;
        if (comparison === 'menor que') return columns < +value;
        if (comparison === 'igual a') return columns === +value;
        return true;
      })]);
    });
  }, [filterByNumericValues]);

  const handleRemoveFilter = (index) => {
    setFilterByNumericValues(filterByNumericValues
      .filter((_filter, item) => item !== index));
    setFilterData(filterByName);
  };

  const context = {
    handleRemoveFilter,
    data,
    setData,
    filterData,
    setFilterData,
    filterByName,
    setFilterByName,
    filterByNumericValues,
    setFilterByNumericValues,
    sort,
    setSort,
    usedFilters,
  };

  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
