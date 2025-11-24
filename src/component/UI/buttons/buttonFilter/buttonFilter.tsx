import style from './buttonFilter.module.css';
import { useState, type ReactNode, useEffect } from 'react';
import { Modal, FilterPrice, FilterBrandSize } from '../../../UI';

import type { IProduct } from '../../../types';
import {
  setMaxPriceData,
  setMinPriceData,
} from '../../../../service/slices/filterProductsSlice';
import { useAppDispatch, useAppSelector } from '../../../../service/store';

export default function ButtonFilter({ items }: { items: IProduct[] }) {
  const dispatch = useAppDispatch();
  const brands = useAppSelector(state => state.filter.brands);
  const sizes = useAppSelector(state => state.filter.sizes);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const numArray = items.map(item => parseInt(item.price.replace('.', ''), 10));

  const selectedMinPrice = useAppSelector(state =>
    Number(state.filter.selectedMinPrice)
  );
  const selectedMaxPrice = useAppSelector(state =>
    Number(state.filter.selectedMaxPrice)
  );

  const actualMinPrice = Math.min(...numArray);
  const actualMaxPrice = Math.max(...numArray);

  useEffect(() => {
    dispatch(setMinPriceData(actualMinPrice));
    dispatch(setMaxPriceData(actualMaxPrice));
  }, [actualMinPrice, actualMaxPrice]);

  const toggleModal = (content: ReactNode, buttonType: string) => {
    if (isModalOpen && activeButton === buttonType) {
      setIsModalOpen(false);
      setActiveButton(null);
      return;
    }
    setModalContent(content);
    setActiveButton(buttonType);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveButton(null);
  };

  const SvgIcon = () => (
    <svg
      width="9"
      height="5"
      viewBox="0 0 9 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={style.svg}
    >
      <path
        d="M0.499837 0.499995L4.45817 4.45833L8.4165 0.499995"
        stroke="#1F2A37"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <>
      <button
        className={style.button}
        onClick={() =>
          toggleModal(
            <FilterPrice
              actualMinPrice={actualMinPrice}
              actualMaxPrice={actualMaxPrice}
            />,
            'price'
          )
        }
      >
        {selectedMinPrice.toLocaleString()}₽ - {selectedMaxPrice.toLocaleString()}₽
      </button>

      <button
        className={style.button}
        onClick={() =>
          toggleModal(<FilterBrandSize allBrands={brands} />, 'brand')
        }
      >
        Бренд
        <SvgIcon />
      </button>

      <button
        className={style.button}
        onClick={() =>
          toggleModal(<FilterBrandSize allSizes={sizes} />, 'size')
        }
      >
        Размер
        <SvgIcon />
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </>
  );
}
