import React, { useContext } from 'react';
import Context from '../context/Context';
import { filterComparison, filterColumn } from '../helpers/helper';

function Form() {
  const {
    data, setData, filterByName, filterByNumericValues, setFilterByNumericValues,
  } = useContext(Context);

  const handleByFilterName = ({ target }) => {
    if (!target.value) {
      setData(filterByName);
      return;
    }

    const filteredName = data
      .filter(({ name }) => name.toLowerCase().includes(target.value.toLowerCase()));
    setData(filteredName);
  };

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
            onChange={ handleByFilterName }
          />
        </fieldset>
        <fieldset>
          <select
            name="column"
            className="column"
            data-testid="column-filter"
          >
            {
              filterColumn.map((item, index) => (
                <option key={ index } value={ item }>
                  {item}
                </option>
              ))
            }
          </select>
          <select
            name="comparison"
            className="comparison"
            data-testid="comparison-filter"
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
          />
          <button
            type="button"
            data-testid="button-filter"
            onClick={ handleSelectFilter }
          >
            Filtrar
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Form;
