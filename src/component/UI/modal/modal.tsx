import { useEffect } from 'react';
import styles from './modal.module.css';
import type { ModalProps } from '../../types';

export default function Modal({ isOpen, onClose, children }: ModalProps) {
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

  


  return (
    <div className={styles.overlay} onClick={onClose}>
      <div onClick={e => e.stopPropagation()}>
        {children}
        <div className={styles.containerButton}>
          <button className={`${styles.button} ${styles.buttonReset}`}>
            Сбросить
          </button>
          <button className={`${styles.button} ${styles.buttonApply}`}>
            Готово
          </button>
        </div>
      </div>
    </div>
  );
}
