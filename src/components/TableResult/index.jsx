import React from 'react';
import { convertTempMode } from 'components/helper'
import PropTypes from 'prop-types';
import './index.scss'
const TableResult = ({ citiesWeather, isCelcius }) => {
    return (
        <table>
            <tbody id="weatherFormResult">
                {citiesWeather.map((element, index) => {
                    const { coord, clouds, wind, name, main: { temp, pressure, temp_max, temp_min }, weather, sys: { country } } = element;
                    return (
                        <tr key={index}>
                            <td>
                                <img src={`http://openweathermap.org/img/wn/${weather[0].icon}.png`} alt={`${weather[0].main}`} />
                            </td>
                            <td>
                                <b className="link">{name}, {country}&nbsp;</b>
                                <img src={`http://openweathermap.org/images/flags/${country.toLowerCase()}.png`} />
                                <b><i>&nbsp;{weather[0].description}</i></b>
                                <p>
                                    <span className="badge badge-info">{convertTempMode(isCelcius, temp)}</span>&nbsp;
                    temperature from {convertTempMode(isCelcius, temp_min)} to {convertTempMode(isCelcius, temp_max)}, wind {wind.speed} m/s. clouds {clouds.all} %, {pressure} hpa
                                </p>
                                <p className="link">Geo coords [{coord.lat}, {coord.lon}] </p>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
}

TableResult.propTypes = {
    citiesWeather: PropTypes.array.isRequired,
    isCelcius: PropTypes.bool.isRequired
}
export default TableResult;