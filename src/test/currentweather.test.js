import { render, screen } from '@testing-library/react';
import CurrentBoard from '../components/CurrentBoard';


test('renders current weather information correctly', () => {
  const current = {
    weather: [{ description: 'cloudy' }],
    main: { temp: 20, feels_like: 22, humidity: 75, pressure: 1010 },
    wind: { speed: 5, deg: 180 },
    name: 'City Name',
    dt: 1620398042 
  };

  const translatedMessages = {
    Humidity: 'Humidity',
    FeelsLike: 'Feels Like',
    Wind: 'Wind',
    Pressure: 'Pressure',
    Sunset: 'Sunset'
  };

  const dateTime = '2024-04-29T12:00:00'; // Sample date time
  const locale = 'en-US';

  render(
    <CurrentBoard current={current} translatedMessages={translatedMessages} dateTime={dateTime} locale={locale} />
  );

  // Check if elements with specific text content are rendered
  expect(screen.getByText('20°C')).toBeInTheDocument();
  expect(screen.getByText('22°C')).toBeInTheDocument();
  expect(screen.getByText('75%')).toBeInTheDocument();
  expect(screen.getByText('1010 hPa')).toBeInTheDocument();
  expect(screen.getByText('Sunset')).toBeInTheDocument();
  expect(screen.getByText('City Name')).toBeInTheDocument();
  expect(screen.getByText('Cloudy')).toBeInTheDocument();

  expect(screen.getByText('18 km/h')).toBeInTheDocument(); 
  expect(screen.getByAltText('Current icon')).toBeInTheDocument();
});
