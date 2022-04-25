/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';
import { planetInfo } from '../helpers/helper';

function Table() {
  const { data, filterData, setFilterData } = useContext(Context);

  useEffect(() => {
    if (data?.length) {
      setFilterData(data.sort((a, b) => a.name.localeCompare(b.name)));
    }
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            {planetInfo.map((infoHeader, index) => (
              <th key={ index }>{ infoHeader }</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filterData
          && filterData.map((infoPlanet, index) => (
            <tr key={ index }>
              <td data-testid="planet-name">{infoPlanet.name}</td>
              <td>{infoPlanet.rotation_period}</td>
              <td>{infoPlanet.orbital_period}</td>
              <td>{infoPlanet.diameter}</td>
              <td>{infoPlanet.climate}</td>
              <td>{infoPlanet.gravity}</td>
              <td>{infoPlanet.terrain}</td>
              <td>{infoPlanet.surface_water}</td>
              <td>{infoPlanet.population}</td>
              <td>{infoPlanet.films}</td>
              <td>{infoPlanet.created}</td>
              <td>{infoPlanet.edited}</td>
              <td>{infoPlanet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
