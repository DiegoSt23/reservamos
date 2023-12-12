import { useState } from 'react';
import {
  Card,
  Spinner,
  Typography,
  ItemProps
} from '../..';
import { Close } from '../../../assets/icons';
import styles from './weather.module.scss';

export interface WeatherDataProps {
  date: string;
  max: number;
  min: number;
}

interface WeatherCardProps {
  data: ItemProps | undefined;
  weatherData: WeatherDataProps[] | undefined;
  onClickClose: () => void;
  isLoading: boolean;
}

export const WeatherCard = ({ data, weatherData, onClickClose, isLoading }: WeatherCardProps) => {
  const [cardContentHeight, setCardContentHeight] = useState<number>(0);

  return (
    <Card
      className={styles.weatherCard}
      title={data?.city ?? ''}
      headerElement={
        <button onClick={onClickClose} className={styles.closeButton}>
          <Close width={25} height={25} stroke='#fafafa' />
        </button>
      }
    >
      <div
        className={styles.cardContentMainContainer}
        style={{ width: '100%', height: cardContentHeight }}
      >
        <div
          className={styles.cardSubContainer}
          ref={(e) => {
            setCardContentHeight(e?.scrollHeight ?? 0);
          }}
        >
          <div className={styles.row}>
            <Typography>State</Typography>
            <Typography>{data?.state ?? ''}</Typography>
          </div>
          <div className={styles.row}>
            <Typography>Country</Typography>
            <Typography>{data?.country ?? ''}</Typography>
          </div>
          <Typography variant='h3'>5 days forecast</Typography>
          <Card className={styles.forecastContainer}>
            {weatherData?.length
              ? weatherData.slice(1).map((item, index) => (
                  <div key={index} className={styles.dayContainer}>
                    <div
                      className={styles.dayRowContainer}
                      style={{ justifyContent: 'center' }}
                    >
                      <Typography>
                        {new Date(item.date).toLocaleDateString('en', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </Typography>
                    </div>
                    <div className={styles.dayRowContainer}>
                      <Typography>Max:</Typography>
                      <Typography
                        style={{ color: '#ed4071' }}
                      >{`${item.max}°`}</Typography>
                    </div>
                    <div className={styles.dayRowContainer}>
                      <Typography>Min:</Typography>
                      <Typography
                        style={{ color: '#6e88d7' }}
                      >{`${item.min}°`}</Typography>
                    </div>
                  </div>
                ))
              : null}
            {isLoading && (
              <div className={styles.spinnerContainer}>
                <Spinner />
              </div>
            )}
          </Card>
        </div>
      </div>
    </Card>
  );
};
