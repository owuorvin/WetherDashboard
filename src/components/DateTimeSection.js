import React from "react";
import { Config } from "../constants";

const DateTimeSection = ({dateTime,locale}) => {
    
    const getFormattedDate = (dateTime) => {
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        return locale==='en' ? new Intl.DateTimeFormat(Config.locale, options).format(new Date()): dateTime;
    };

    const getFormattedTime = (dateTime) => {
        const options = { hour: 'numeric', minute: 'numeric' };
        return  locale==='en' ? new Intl.DateTimeFormat(Config.locale, options).format(new Date()): dateTime;
    };

    return (
        <span className="currentDateTime">
            {locale==='en' ?(<>
            <span id="currentDate">{getFormattedDate(dateTime)}</span><br />
            <span id="currentTime">{getFormattedTime(dateTime)}</span>
            </>): (
               <span id="currentDate">{getFormattedDate(dateTime)}</span>
            )}
        </span>
    );
};

export default DateTimeSection;
