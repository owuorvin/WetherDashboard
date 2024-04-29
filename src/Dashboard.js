import React, {createContext, useState, useEffect } from "react";
import { IntlProvider } from "react-intl";
import { api_url, Config } from "./constants";
import CurrentBoard from "./components/CurrentBoard";
import HourlyBoard from "./components/HourlyBoard";
import englishMessages from "./translations/en-US.json";
import kiswahiliMessages from "./translations/sw-KE.json";

export const FetchDataContext = createContext();

const Dashboard = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [current, setCurrent] = useState(null);
    const [locale, setLocale] = useState('en');
    const [translatedMessages, setTranslatedMessages] = useState(englishMessages);
    const [dateTime, setDateTime] = useState(new Date());


    let intervalID = null;

    const fetchData = () => {
        fetch(api_url)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setIsLoaded(true);
                    setCurrent(result);
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

    const handleLanguageChange = (e) => {
        setDateTime(new Date());
        const options = { weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', hour12: false };
        const selectedLocale = e.target.value;
        setLocale(selectedLocale);
        setTranslatedMessages(selectedLocale === 'en' ? englishMessages : kiswahiliMessages);
        setDateTime(Intl.DateTimeFormat('sw', options).format(new Date()));
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDateTime(new Date());
        }, 60000);

        return () => {
            clearInterval(intervalId);
        };
    }, [locale]);

    if (error) {
        return <div>Error contacting API</div>;
    } else if (!isLoaded) {
        return <div>Fetching results...</div>;
    } else {
        return (
            <IntlProvider locale={locale} messages={translatedMessages}>
            <div>
            <label>
                    <input
                        type="radio"
                        value="en"
                        checked={locale === 'en'}
                        onChange={handleLanguageChange}
                    /> English
                </label>
                <label>
                    <input
                        type="radio"
                        value="sw"
                        checked={locale === 'sw'}
                        onChange={handleLanguageChange}
                    /> Kiswahili
                </label>
                <CurrentBoard current={current} translatedMessages={translatedMessages} dateTime={dateTime} locale={locale}/>
                <HourlyBoard translatedMessages={translatedMessages} />
            </div>
            </IntlProvider>
        );
    }
};

export default Dashboard;
