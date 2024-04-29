import React from "react";
import { Config, IconMap } from "../constants";
import DateTimeSection from "./DateTimeSection";
import { getPercentage, getDegreeSymbol, getWindSpeedInKmh } from "../utils/measureHelper";

const CurrentBoard = ({ current,translatedMessages,dateTime,locale }) => {
    const getCurrentIcon = (currentWeather) => {
        const weatherDescription = currentWeather[0].description;
        return IconMap[weatherDescription] || IconMap.notFound;
    };

    const getChanceOfRain = (current) => {
        return 'pop' in current ? getPercentage(current.main.feels_like) : 0;
    };

    const getFormattedTemp = (temp) => {
        return Math.round(temp) + getDegreeSymbol(Config.units);
    };

    const getFormattedWindSpeed = (current) => {
        return <span>{getWindSpeedInKmh(current.wind.speed)}</span>;
    };

    const getWindDegStyle = (wind_deg) => {
        return { transform: `rotate(${wind_deg}deg)` };
    };

    const getFormattedTime = (time) => {
        const dateTime = new Date(parseInt(time) * 1000);
        return new Intl.DateTimeFormat(Config.locale, { hour: 'numeric', minute: 'numeric' }).format(dateTime);
    };

    const getFormattedDescription = (description) => {
        return description.charAt(0).toUpperCase() + description.substring(1);
    };

    return (
        <table cellSpacing={1} style={{ margin: "5px 35px 15px 0px" }}>
            <tbody>
                <tr>
                    <td>
                        <img id="currentIcon" src={getCurrentIcon(current.weather)} alt="Current icon" />
                    </td>
                    <td style={{ verticalAlign: "middle", whiteSpace: "nowrap" }}>
                        <table className="observations">
                            <tbody>
                                <tr>
                                    <td id="currentTemp" colSpan="2">{getFormattedTemp(current.main.temp)}</td>
                                    <td className="legend top" style={{ paddingLeft: "15px" }}>prob.</td>
                                    <td className="top">
                                        <span style={{ float: 'left', marginLeft: '10px' }}>
                                            <span id="currentPrec">{getChanceOfRain(current)}</span>%
                                        </span>
                                    </td>
                                    <td className="legend top" style={{ paddingLeft: "15px" }}>{translatedMessages.Humidity}</td>
                                    <td className="top">
                                        <span style={{ float: 'left', marginLeft: '10px' }}>
                                            <span id="currentHumidity">{current.main.humidity}%</span>
                                        </span>
                                    </td>

                                </tr>
                                <tr>
                                    <td id="apparentTempLabel" className="observations legend bottom">{translatedMessages.FeelsLike}</td>
                                    <td id="currentApparentTemp">{getFormattedTemp(current.main.feels_like)}</td>
                                    <td id="windLabel" className="observations legend bottom" style={{ paddingLeft: "15px" }}>{translatedMessages.Wind}</td>
                                    <td id="currentWind">
                                        <span className="windContainer">{getFormattedWindSpeed(current)}
                                            <span className="wind" style={getWindDegStyle(current.wind.deg)}>↑</span>
                                        </span>
                                    </td>
                                    <td id="pressureLabel" className="observations legend bottom" style={{ paddingLeft: "15px" }}>{translatedMessages.Pressure}</td>
                                    <td id="currentPressure" className="observations">
                                        <span style={{ float: 'left', marginLeft: '10px' }}>{current.main.pressure} hPa</span>
                                    </td>
                                    <td id="sunsetLabel" className="observations legend bottom" style={{ paddingLeft: "15px" }}>{translatedMessages.Sunset}</td>
                                    <td id="sunset" className="observations">
                                        <span style={{ float: 'left', marginLeft: '10px' }}>{getFormattedTime(current.dt)}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td id="currentSummary">
                    <span id="currentcity">{current.name}</span><br />
                    <span id="currentSummary">{getFormattedDescription(current.weather[0].description)}</span>
                
                    </td>
                    
                    <td>
                        <DateTimeSection dateTime={dateTime} locale={locale}/>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default CurrentBoard;
