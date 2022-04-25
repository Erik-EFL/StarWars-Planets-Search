/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext } from 'react';
import Context from '../context/Context';
import { filterComparison } from '../helpers/helper';

function Form() {
  const {
    usedFilters,
    data, setData, filterByName,
    setFilterData, handleRemoveFilter,
    filterByNumericValues, setFilterByNumericValues,
  } = useContext(Context);

  const handleFilterName = useCallback(({ target: { value } }) => {
    if (!value) {
      setData(filterByName);
      return;
    }
    setData(
      data.filter(({ name }) => name
        .toLowerCase().includes(value.toLowerCase())),
    );
  }, [filterByName]);

  const handleSelectFilter = (event) => {
    event.preventDefault();
    /* Utilizei a solução da Luá para enviar o objeto ja montado para o
    estado global, para que o usuário possa filtrar os dados. */
    const column = document.querySelector('.column').value;
    const comparison = document.querySelector('.comparison').value;
    const { value } = document.querySelector('.value-Number');
    const allFilters = { column, comparison, value };
    setFilterByNumericValues([...filterByNumericValues, allFilters]);
  };

  return (
    <div>
      <form>
        <fieldset>
          <input
            type="text"
            name="search"
            className="search"
            aria-label="search"
            data-testid="name-filter"
            onChange={ handleFilterName }
          />
        </fieldset>
        <fieldset>
          <select
            name="column"
            className="column"
            data-testid="column-filter"
            onChange={ handleSelectFilter }
          >
            {usedFilters.map((availableFilter) => (
              <option key={ availableFilter }>{availableFilter}</option>
            ))}
          </select>
          <select
            name="comparison"
            className="comparison"
            data-testid="comparison-filter"
            onChange={ handleSelectFilter }
          >
            {
              filterComparison.map(
                (item, index) => (
                  <option key={ index } value={ item }>
                    {item}
                  </option>
                ),
              )
            }
          </select>
          <input
            type="number"
            name="value-Number"
            className="value-Number"
            min="0"
            defaultValue="0"
            data-testid="value-filter"
            onChange={ handleSelectFilter }
          />
          <button
            type="button"
            data-testid="button-filter"
            onClick={ handleSelectFilter }
          >
            Filtrar
          </button>
          <button
            type="button"
            data-testid="button-remove-filters"
            onClick={ () => {
              setFilterByNumericValues([]);
              setFilterData(filterByName);
            } }
          >
            Remover todas filtragens
          </button>
          {filterByNumericValues
            && filterByNumericValues.map(
              (filter, index) => (
                <div key={ index } data-testid="filter">
                  <p>
                    {`${filter.column} ${filter.comparison} ${filter.value}`}
                  </p>
                  <button
                    type="button"
                    onClick={ () => handleRemoveFilter(index) }
                  >
                    x
                  </button>
                </div>
              ),
            )}
        </fieldset>
      </form>
    </div>
  );
}

export default Form;
