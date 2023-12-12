import { Typography } from '../..';
import styles from './header.module.scss';

export const Header = () => {
  const date = new Date().toLocaleDateString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className={styles.headerMainContainer}>
      <div className={styles.subContainer}>
        <div className={styles.titleContainer}>
          <h1 className={styles.mainTitle}>Reservamos</h1>
          <h1 className={styles.secondTitle}>Weather Forecast</h1>
        </div>
        <Typography>{date}</Typography>
      </div>
    </div>
  );
}