import axios from 'axios';

export const getForecast = async (lat: string, lon: string) => {
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${
      import.meta.env.VITE_OPEN_WEATHER_API_KEY
    }`
  );

  return res;
};
