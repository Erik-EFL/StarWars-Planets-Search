import React, { useContext } from 'react';
import Context from '../context/Context';
import { filterComparison, filterColumn } from '../helpers/helper';

function Form() {
  const {
    filterByName, data, setData,
  } = useContext(Context);

  const handleChange = ({ target }) => {
    if (!target.value) {
      setData(filterByName);
      return;
    }
    const filteredName = data
      .filter(({ name }) => name.includes(target.value));
    console.log(filteredName);
    setData(filteredName);
  };

  return (
    <div>
      <form>
        <fieldset>
          <input
            type="text"
            name="search"
            id="search"
            aria-label="search"
            data-testid="name-filter"
            onChange={ handleChange }
          />
        </fieldset>
        <fieldset>
          <select
            name="column"
            id="column"
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
            id="comparison"
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
            type="text"
            name="valueNumber"
            id="valueNumber"
            data-testid="value-filter"
          />
          <button
            type="button"
            data-testid="button-filter"
          >
            Filtrar
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Form;
