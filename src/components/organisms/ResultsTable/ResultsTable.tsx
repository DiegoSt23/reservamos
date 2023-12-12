/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { RightArrow, Close } from '../../../assets/icons';
import {
  Button,
  Card,
  Spinner,
  Typography,
} from '../..';
import { useWindowDimensions } from '../../../hooks';
import styles from './table.module.scss';

export interface ItemProps {
  city: string;
  state: string;
  country: string;
  lat: string;
  lon: string;
  id: number;
}

interface TableProps {
  labels: string[];
  items: Array<ItemProps>;
  onSelectedItem: (data: ItemProps | undefined) => void;
  onDeselectItem: () => void;
  currentValue: ItemProps | undefined;
  isLoading?: boolean;
}

const defaultProps: Partial<TableProps> = {
  isLoading: false,
};

export const ResultsTable = ({
  labels,
  items,
  onSelectedItem,
  onDeselectItem,
  isLoading,
  currentValue,
}: TableProps) => {
  const { width } = useWindowDimensions();
  const [tableContainerHeight, setTableContainerHeight] = useState<number>(0);
  const isMobile =  width < 900;

  const handleBackgroundColor = (isCurrent?: boolean) => {
    if (isCurrent) {
      return '#14121a8f';
    }

    return 'transparent';
  };

  return (
    <Card
      title='Results'
      headerElement={
        isLoading ? (
          <Spinner size='sm' />
        ) : (
          <Typography>{items.length}</Typography>
        )
      }
    >
      <div
        className={styles.tableContainer}
        style={{
          height: tableContainerHeight,
          opacity: isLoading ? 0.5 : 1,
        }}
      >
        {items?.length ? (
          <table
            ref={(e) => {
              setTableContainerHeight(e?.scrollHeight ?? 0);
            }}
            cellSpacing={0}
            cellPadding={10}
          >
            <thead>
              <tr>
                {labels.map((label) => (
                  <th key={label}>
                    <Typography variant='h3' style={{ textAlign: 'center' }}>
                      {label}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td
                    style={{
                      backgroundColor: handleBackgroundColor(
                        currentValue && currentValue.id === item.id
                      ),
                    }}
                  >
                    <Typography
                      variant='h3'
                      style={{
                        textAlign: 'center',
                        textDecoration:
                          currentValue && currentValue.id === item.id
                            ? 'underline'
                            : 'none',
                      }}
                    >
                      {item.city}
                    </Typography>
                  </td>
                  {!isMobile && (
                    <td
                      style={{
                        backgroundColor: handleBackgroundColor(
                          currentValue && currentValue.id === item.id
                        ),
                      }}
                    >
                      <Typography style={{ textAlign: 'center' }}>
                        {item.country}
                      </Typography>
                    </td>
                  )}
                  <td
                    style={{
                      backgroundColor: handleBackgroundColor(
                        currentValue && currentValue.id === item.id
                      ),
                    }}
                  >
                    <div className={styles.buttonContainer}>
                      <Button
                        onClick={() =>
                          currentValue && currentValue.id === item.id
                            ? onDeselectItem()
                            : onSelectedItem(item)
                        }
                        className={styles.button}
                        disabled={isLoading}
                      >
                        {currentValue && currentValue.id === item.id ? (
                          <Close
                            width={20}
                            height={20}
                          />
                        ) : (
                          <RightArrow
                            width={25}
                            height={25}
                          />
                        )}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </Card>
  );
};

ResultsTable.defaultProps = defaultProps;
