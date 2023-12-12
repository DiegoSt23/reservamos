/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, ReactNode } from 'react';
import styles from './modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({
  children,
  isOpen,
  onClose,
}: ModalProps) => {
  const [isOpenLocal, setIsOpenLocal] = useState<boolean>(false);
  const [display, setDisplay] = useState<string>('none');
  const [scale, setScale] = useState<number>(0);

  useEffect(() => {
    if (isOpen) {
      setIsOpenLocal(true);
      setDisplay('block');
      setTimeout(() => {
        setScale(1);
      }, 200);
    } else {
      setScale(0);
      setTimeout(() => {
        setIsOpenLocal(false);
        setDisplay('none');
      }, 200);
    }
  }, [isOpen]);

  return (
    <>
      {isOpenLocal && (
        <div
          className={styles.backdrop}
          onClick={onClose}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={styles.modalContainer}
            style={{
              display,
              transform: `scale(${scale})`,
            }}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};
