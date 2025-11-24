import { useEffect } from 'react';
import styles from './modal.module.css';
import type { ModalProps } from '../../types';

import {
  clearAllFiltersData,
  getFilterProductsData,
} from '../../../service/slices/filterProductsSlice';
import { useAppDispatch } from '../../../service/store';

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const clickApply = async () => {
    try {
      await dispatch(getFilterProductsData()).unwrap();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };
  const clickReset = () => {
    dispatch(clearAllFiltersData());
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        {children}
        <div className={styles.containerButton}>
          <button
            className={`${styles.button} ${styles.buttonReset}`}
            onClick={() => {
              clickReset();
            }}
          >
            Сбросить
          </button>
          <button
            className={`${styles.button} ${styles.buttonApply}`}
            onClick={() => {
              clickApply();
            }}
          >
            Готово
          </button>
        </div>
      </div>
    </div>
  );
}
