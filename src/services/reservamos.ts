import axios from 'axios';

export const getCity = async (city: string) => {
  const res = await axios.get(
    `https://search.reservamos.mx/api/v2/places?q=${city}`
  );

  return res;
};
