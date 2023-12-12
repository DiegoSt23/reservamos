import {
  Button,
  Input,
  Card,
  Spinner,
  Typography,
} from '../..';
import styles from './search-card.module.scss';

interface SearchCardProps {
  value: string;
  onChange: (val: string) => void;
  onSearch: () => void;
  isLoading: boolean;
  errorMessage: string;
}

export const SearchCard = ({
  value,
  onSearch,
  onChange,
  isLoading,
  errorMessage,
}: SearchCardProps) => (
  <Card>
    <Typography style={{ textAlign: 'center' }}>
      Enter the name of any city in Mexico and the United States to get the
      5-day weather forecast.
    </Typography>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
      className={styles.form}
    >
      <Input
        value={value}
        onChange={(val: string) => onChange(val)}
        placeholder='City'
      />
      <Button
        type='submit'
        disabled={isLoading}
        className={styles.searchButton}
      >
        {!isLoading ? 'Search' : <Spinner size='xs' color='#000000' />}
      </Button>
    </form>
    {errorMessage && (
      <Typography style={{ textAlign: 'center', color: '#ed4071' }}>
        {errorMessage}
      </Typography>
    )}
  </Card>
);
