import React, { useState, useEffect } from "react";
import { api_url_forecast, Config,IconMap } from "../constants";
import { getDegreeSymbol, getPercentage, getWindSpeedInKmh } from "../utils/measureHelper";

const HourlyBoard = ({translatedMessages}) => {
    const [hourly, setHourly] = useState(null);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    let intervalID = null;

    const fetchData = () => {
        fetch(api_url_forecast)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setHourly(result);
                    intervalID = setTimeout(fetchData, Config.refreshRate);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    };

    useEffect(() => {
        fetchData();
        return () => clearInterval(intervalID);
    }, []);

    console.log("hourlyForecast",hourly);
    const getHourHeaders = () => {
        return hourly?.list.slice(1, 18).map((hourly, i) => {
            const dateTime = new Date(parseInt(hourly.dt) * 1000);
            return <th key={i}>{dateTime.getHours()}h</th>;
        });
    };

    const getHourlyIcons = () => {
        return hourly?.list.slice(1, 18).map((hourly, i) => {
            const hourlyStatus = hourly.weather[0].description;
            let hourlyIcon = IconMap.notFound;
            if (hourlyStatus in IconMap) {
                hourlyIcon = IconMap[hourlyStatus];
            }
            return <td key={i}><img className="icon" src={hourlyIcon} alt="Hourly weather icon" /></td>;
        });
    };

    const getHourlyTemperatures = () => {
        return hourly?.list.slice(1, 18).map((hourly, i) => {
            return <td key={i}>
                {Math.round(hourly.main.temp)} {getDegreeSymbol(Config.units)}
            </td>;
        });
    };

    const getHourlyWind = () => {
        return hourly?.list.slice(1, 18).map((hourly, i) => {
            return <td key={i}>
                {getWindSpeedInKmh(hourly.wind.speed)}
                <span className="wind" style={{ transform: `rotate(${hourly.wind.deg}deg)` }}>↑</span>
            </td>;
        });
    };

    const getHourlyHumidity = () => {
        return hourly?.list.slice(1, 18).map((hourly, i) => {
            return <td key={i}>{hourly.main.humidity}%</td>;
        });
    };

    const getHourlyAccumulation = () => {
        return hourly?.list.slice(1, 18).map((hourly, i) => {
            let accumulation = 0;
            if ('rain' in hourly) {
                accumulation += hourly.rain['3h'];
            }
            if ('snow' in hourly) {
                accumulation += hourly.snow['3h'];
            }
            return <td key={i}>{accumulation} mm</td>;
        });
    };

    const getHourlyChanceOfRain = () => {
        return hourly?.list.slice(1, 18).map((hourly, i) => {
            let chance = 0;
            if ('pop' in hourly) {
                chance = getPercentage(hourly.pop);
            }
            return <td key={i}>{chance}%</td>;
        });
    };
    if (error) {
        return <div>Error contacting API</div>;
    } else if (!isLoaded) {
        return <div>Fetching results...</div>;
    } else {
    return (
        <table id="tableHourlyForecast" cellSpacing="0">
            <thead>
                <tr id="hourlyHours">
                    <th />
                    {getHourHeaders()}
                </tr>
            </thead>
            <tbody>
                <tr id="hourlyIcons">
                    <td />
                    {getHourlyIcons()}
                </tr>
                <tr id="hourlyTemp">
                    <td><strong>{translatedMessages.Temp}.</strong></td>
                    {getHourlyTemperatures()}</tr>
                <tr id="hourlyWind">
                    <td><strong>{translatedMessages.Wind}</strong></td>
                    {getHourlyWind()}
                </tr>
                <tr id="hourlyHumidity">
                    <td><strong>{translatedMessages.Humidity}</strong></td>
                    {getHourlyHumidity()}
                </tr>
                <tr id="hourlyAcc">
                    <td><strong>{translatedMessages.Rain}</strong></td>
                    {getHourlyAccumulation()}
                </tr>
                <tr id="hourlyPrec">
                    <td><strong>% {translatedMessages.OfRain}</strong></td>
                    {getHourlyChanceOfRain()}
                </tr>
            </tbody>
        </table>
    );
    }
};

export default HourlyBoard;
