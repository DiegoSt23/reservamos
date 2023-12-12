/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  SearchCard,
  ResultsTable,
  WeatherCard,
  ItemProps,
  WeatherDataProps,
} from '../..';
import { useWindowDimensions } from '../../../hooks';
import { getCity, getForecast } from '../../../services';
import { calculateMinAndMaxTemps } from '../../../helpers';
import styles from './main.module.scss';

export const Main = () => {
  const { width } = useWindowDimensions();
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingWeather, setIsLoadingWeather] = useState<boolean>(false);
  const [data, setData] = useState<ItemProps[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherDataProps[] | undefined>([]);
  const [selectedData, setSelectedData] = useState<ItemProps | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const isMobile = width < 900;
  const tableLabels = isMobile
    ? ['City', 'Weather']
    : ['City', 'Country', 'Weather'];

  const handleDeselectItem = () => {
    setSelectedData(undefined);
    setWeatherData(undefined);
  };

  const handleSearchCity = async () => {
    if (!query) return;
  
    setErrorMessage('');
    setIsLoading(true);
    handleDeselectItem();

    try {
      const res = await getCity(query);
      const filteredByResultType = res?.data?.filter(
        (result: { result_type: string }) => result.result_type === 'city'
      );

      if (!filteredByResultType?.length) {
        setErrorMessage('No results found');
      }

      setData(
        filteredByResultType?.map(
          (item: {
            display: string;
            state: string;
            country: string;
            lat: number;
            long: number;
            id: number;
          }) => ({
            city: item.display,
            state: item.state,
            country: item.country,
            lat: item.lat,
            lon: item.long,
            id: item.id,
          })
        )
      );
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErrorMessage(err?.response?.data?.message);
      } else {
        setErrorMessage('Something went wrong')
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetWeather = async () => {
    if (!selectedData?.lat && !selectedData?.lon) {
      return;
    }

    const { lat, lon } = selectedData;

    setIsLoadingWeather(true);
    setErrorMessage('');

    try {
      const res = await getForecast(lat, lon);

      if (!res?.data?.list?.length) {
        setErrorMessage('No forecast results were found for the selected city');
      } else {
         setWeatherData(calculateMinAndMaxTemps(res.data.list));
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErrorMessage(err?.response?.data?.message);
      } else {
        setErrorMessage('Something went wrong');
      }
    } finally {
      setIsLoadingWeather(false);
    }
  };

  useEffect(() => {
    handleGetWeather();
  }, [selectedData?.lat, selectedData?.lon]);

  return (
    <div className={styles.mainContainer}>
      <SearchCard
        value={query}
        onChange={(val) => setQuery(val)}
        isLoading={isLoading}
        onSearch={handleSearchCity}
        errorMessage={errorMessage}
      />
      {data.length ? (
        <div className={styles.subContainer}>
          <div
            className={styles.tableContainer}
            style={{
              width: !selectedData?.city
                ? '100%'
                : isMobile
                ? '0%'
                : 'calc(60% - 15px)',
              opacity: selectedData?.city ? (!isMobile ? 1 : 0) : 1,
            }}
          >
            <ResultsTable
              labels={tableLabels}
              items={data}
              onSelectedItem={(data) => setSelectedData(data)}
              onDeselectItem={handleDeselectItem}
              currentValue={selectedData}
              isLoading={isLoading}
            />
          </div>
          <div
            className={styles.weatherCardContainer}
            style={{
              width: selectedData?.city
                ? isMobile
                  ? '100%'
                  : 'calc(40% - 15px)'
                : '0%',
              opacity: selectedData?.city ? 1 : 0,
            }}
          >
            <WeatherCard
              data={selectedData}
              onClickClose={handleDeselectItem}
              weatherData={weatherData}
              isLoading={isLoadingWeather}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
