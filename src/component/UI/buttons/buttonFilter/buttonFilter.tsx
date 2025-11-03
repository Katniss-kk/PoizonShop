import style from './buttonFilter.module.css';
import { useState, type ReactNode, useEffect } from 'react';
import { Modal, FilterPrice, FilterBrandSize } from '../../../UI';
import { brands, size } from '../../../../../public/dataBrandSize'

import { useData } from '../../../hooks/dataProvider';

export default function ButtonFilter() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const { data, updateData, updateWaitData, waitData } = useData();

  useEffect(() => {
    if (data.data.length === 0) return;

    const numArray = data.data.map(item =>
      parseInt(item.price.replace('.', ''), 10)
    );

    const actualMinPrice = Math.min(...numArray);
    const actualMaxPrice = Math.max(...numArray);

    setMinPrice(actualMinPrice);
    setMaxPrice(actualMaxPrice);

    updateData({
      minPrice: actualMinPrice,
      maxPrice: actualMaxPrice,
    });

    updateWaitData({
      minPrice: actualMinPrice,
      maxPrice: actualMaxPrice,
      minAllPrice: actualMinPrice,
      maxAllPrice: actualMaxPrice
    });
  }, [data.data]);

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
              minPrice={minPrice}
              maxPrice={maxPrice}
            />,
            'price'
          )
        }
      >
        {waitData.minPrice.toLocaleString()}₽ - {waitData.maxPrice.toLocaleString()}₽
      </button>

      <button
        className={style.button}
        onClick={() =>
          toggleModal(<FilterBrandSize proops={brands} />, 'brand')
        }
      >
        Бренд
        <SvgIcon />
      </button>

      <button
        className={style.button}
        onClick={() => toggleModal(<FilterBrandSize proops={size} />, 'size')}
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
