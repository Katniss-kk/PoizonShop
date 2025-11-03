import { useEffect } from 'react';
import styles from './modal.module.css';
import type { ModalProps } from '../../types';

import { useData } from '../../hooks/dataProvider';

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const { setFilterData, resetData } = useData();

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

  const clickApply = () => {
    setFilterData()
    onClose()
  }

  const clickReset = () => {
    resetData()
    onClose()
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div onClick={e => e.stopPropagation()}>
        {children}
        <div className={styles.containerButton}>
          <button className={`${styles.button} ${styles.buttonReset}`} onClick={() => {clickReset()}}>
            Сбросить
          </button>
          <button
            className={`${styles.button} ${styles.buttonApply}`}
            onClick={() => {clickApply()}}
          >
            Готово
          </button>
        </div>
      </div>
    </div>
  );
}
