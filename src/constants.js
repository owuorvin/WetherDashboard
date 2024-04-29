import cloudy from './assets/icons/cloudy.svg';
import sunny from './assets/icons/sunny.svg';
import mostlySunny from './assets/icons/mostlysunny.svg';
import partlySunny from './assets/icons/partlysunny.svg';
import mostlyCloudy from './assets/icons/mostlycloudy.svg';
import rain from './assets/icons/rain.svg';
import chanceRain from './assets/icons/chancerain.svg';
import chancetstorms from './assets/icons/chancetstorms.svg';
import tstorms from './assets/icons/tstorms.svg';
import snow from './assets/icons/tstorms.svg';
import chanceSleet from './assets/icons/chancesleet.svg';
import chanceFlurries from './assets/icons/chanceflurries.svg';
import flurries from './assets/icons/flurries.svg';
import fog from './assets/icons/fog.svg';
import hazy from './assets/icons/hazy.svg';
import unknown from './assets/icons/unknown.svg';

export const Units = {
    METRIC: 'metric',
    IMPERIAL: 'imperial',
    DEFAULT: 'default'
}

export const Config = {
    api_key: process.env.REACT_APP_API_KEY,
    city: 'Nairobi',
    locale: 'en-GB',
    units: Units.METRIC,
    refreshRate: 10 * 60 * 1000, //milliseconds
};

const Themes = {
    BLUE: 'blue',
    BLACK: 'black',
    WHITE: 'white'
}

export const Appearance = {
    theme: Themes.BLUE
};

export const IconMap = {
    'clear sky': sunny,
    'few clouds': mostlySunny,
    'few clouds: 11-25%': mostlySunny,
    'scattered clouds': partlySunny,
    'scattered clouds: 25-50%': partlySunny,
    'broken clouds': mostlyCloudy,
    'broken clouds: 51-84%': mostlyCloudy,
    'overcast clouds': cloudy,
    'overcast clouds: 85-100%': cloudy,
    'shower rain': chanceRain,
    'rain': rain,
    'light thunderstorm': chancetstorms,
    'thunderstorm with light rain': chancetstorms,
    'thunderstorm with light drizzle': chancetstorms,
    'thunderstorm with drizzle': chancetstorms,
    'thunderstorm': tstorms,
    'thunderstorm with rain': tstorms,
    'thunderstorm with heavy rain': tstorms,
    'heavy thunderstorm': tstorms,
    'ragged thunderstorm': tstorms,
    'thunderstorm with heavy drizzle': tstorms,
    'light intensity drizzle': chanceRain,
    'drizzle': chanceRain,
    'heavy intensity drizzle': chanceRain,
    'light intensity drizzle rain': chanceRain,
    'drizzle rain': chanceRain,
    'heavy intensity drizzle rain': chanceRain,
    'shower rain and drizzle': chanceRain,
    'heavy shower rain and drizzle': chanceRain,
    'shower drizzle': chanceRain,
    'light rain': chanceRain,
    'moderate rain': rain,
    'heavy intensity rain': tstorms,
    'very heavy rain': tstorms,
    'extreme rain': tstorms,
    'freezing rain': snow,
    'light intensity shower rain': rain,
    'heavy intensity shower rain': rain,
    'ragged shower rain': rain,
    'light snow': snow,
    'Snow': snow,
    'Heavy snow': snow,
    'Light shower sleet': chanceSleet,
    'Light rain and snow': chanceFlurries,
    'Rain and snow': flurries,
    'Light shower snow': snow,
    'Shower snow': snow,
    'Heavy shower snow': snow,
    'Haze': hazy,
    'fog': fog,
    'dust': fog,
    'snow': snow,
    'mist': fog,
    notFound: unknown
};

const parameters = `q=${Config.city}&units=${Config.units}&appid=${Config.api_key}`;
const api_domain = `https://api.openweathermap.org/data/2.5`;


const api_url_proxy = `${api_domain}/weather?${parameters}`

export const api_url_forecast = `${api_domain}/forecast?${parameters}`

export const api_url = api_url_proxy;

export const api_url_alerts = `https://api.openweathermap.org/data/2.5/alerts?${parameters}`
