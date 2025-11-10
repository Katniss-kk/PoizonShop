import { useEffect, useState } from 'react';
import { useData } from '../../../hooks/dataProvider';
import type { IProduct } from '../../../types';
import style from './cardOrder.module.css';

export default function CardOrder() {
  const { order, updateOrder } = useData();
  const [size, setSize] = useState<number | ''>(order.size);
  const [howBuy, setHowBuy] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [contacts, setContacts] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [errors, setErrors] = useState({
    size: true,
    howBuy: true,
    address: true,
    contacts: true,
    number: true,
  });

  const priceDelivery = 400;

  const handleClickSize = (size: number) => {
    setSize(size);
  };

  const orderValidation = () => {
    const hasSizes = order.product.size && order.product.size.length > 0;
    const newErrors = {
      size: !hasSizes || (hasSizes && size !== 0 && size !== ''),
      howBuy: howBuy !== '',
      address: address !== '',
      contacts: contacts !== '',
      number: number !== '' && number.length >= 8,
    };
    setErrors(newErrors);
    return newErrors;
  };

  const handleClickApply = () => {
    const validationResult = orderValidation();

    if (Object.values(validationResult).every(Boolean)) {
      updateOrder({
        size: size,
        receive: howBuy,
        point: address,
        name: contacts,
        number: number,
      });
    }
  };

  const product: IProduct = order.product;

  return (
    <div className={style.productCard}>
      <div className={style.productCardBlock}>
        <h1 className={`${style.textStyle} ${style.title}`}>
          Оформление заказа
        </h1>
        <div className={style.productContainer}>
          <img
            src={product.img[0]}
            alt={product.title}
            className={style.productImg}
          />
          <div className={style.nameContainer}>
            <h2 className={`${style.productName} ${style.textStyle}`}>
              {product.title}
            </h2>
            <span className={`${style.originalText} ${style.textStyle}`}>
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={style.originalSvg}
              >
                <path
                  d="M8.5 0C6.81886 0 5.17547 0.498516 3.77766 1.43251C2.37984 2.3665 1.29037 3.69402 0.647028 5.24719C0.00368291 6.80036 -0.164645 8.50943 0.163329 10.1583C0.491303 11.8071 1.30085 13.3217 2.4896 14.5104C3.67834 15.6992 5.1929 16.5087 6.84174 16.8367C8.49057 17.1646 10.1996 16.9963 11.7528 16.353C13.306 15.7096 14.6335 14.6202 15.5675 13.2223C16.5015 11.8245 17 10.1811 17 8.5C16.9975 6.24642 16.1012 4.08585 14.5077 2.49233C12.9142 0.898803 10.7536 0.00247486 8.5 0ZM11.651 7.40095L8.25095 10.8009C8.09155 10.9603 7.87539 11.0498 7.65 11.0498C7.42461 11.0498 7.20845 10.9603 7.04905 10.8009L5.34905 9.10095C5.19422 8.94064 5.10854 8.72592 5.11048 8.50306C5.11242 8.28019 5.20181 8.067 5.35941 7.9094C5.517 7.75181 5.73019 7.66241 5.95306 7.66048C6.17593 7.65854 6.39064 7.74421 6.55095 7.89905L7.65 8.9981L10.4491 6.19905C10.6094 6.04421 10.8241 5.95854 11.0469 5.96048C11.2698 5.96241 11.483 6.05181 11.6406 6.2094C11.7982 6.367 11.8876 6.58019 11.8895 6.80306C11.8915 7.02592 11.8058 7.24064 11.651 7.40095Z"
                  fill="#58C94E"
                />
              </svg>
              Оригинал
            </span>
          </div>
        </div>
        {product.size?.length > 0 && (
          <div className={style.sizeContainer}>
            {product.size?.map(item => (
              <button
                key={item}
                className={`${style.size} ${
                  size === item ? style.sizeActive : ''
                } ${errors.size === false ? style.errorMesseg : ''}`}
                onClick={() => {
                  handleClickSize(item);
                }}
              >
                {item}
              </button>
            ))}
          </div>
        )}
        <div className={style.buyContainer}>
          <h3 className={`${style.textStyle} ${style.buyTitle}`}>
            Как получать
          </h3>
          <button
            className={`${style.textStyle} ${style.buyButton} ${
              howBuy === 'В пункте выдачи' ? style.buyButtonActive : ''
            }
            ${errors.howBuy === false ? style.errorMesseg : ''}`}
            onClick={() => {
              setHowBuy('В пункте выдачи');
            }}
          >
            В пункте выдачи
          </button>
          <button
            className={`${style.textStyle} ${style.buyButton} ${
              howBuy === 'В магазине' ? style.buyButtonActive : ''
            }
            ${errors.howBuy === false ? style.errorMesseg : ''}`}
            onClick={() => {
              setHowBuy('В магазине');
            }}
          >
            В магазине
          </button>
          <input
            type="text"
            placeholder="Адрес пункта выдачи"
            className={`${style.inputText} ${errors.address === false ? style.errorMesseg : ''}`}
            value={address}
            onChange={e => {
              setAddress(e.target.value);
            }}
          />
        </div>
        <div className={style.buyContainer}>
          <h3 className={`${style.textStyle} ${style.buyTitle}`}>
            Кому выдать
          </h3>
          <input
            type="text"
            placeholder="Имя и фамилия"
            className={`${style.inputText} ${errors.contacts === false ? style.errorMesseg : ''}`}
            value={contacts}
            onChange={e => {
              setContacts(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="+7 (•••) •••-••-••"
            className={`${style.inputText} ${errors.number === false ? style.errorMesseg : ''}`}
            value={number}
            onChange={e => {
              setNumber(e.target.value);
            }}
          />
        </div>
        <div className="" style={{ inlineSize: '100%', margin: '30px 0' }}>
          <hr />
        </div>
        <div className={style.resultContainer}>
          <div className={style.resultBlock}>
            <h3 className={`${style.textStyle} ${style.textResult}`}>Товар</h3>
            <h3 className={`${style.textStyle} ${style.textResult}`}>
              {order.product.price}
            </h3>
          </div>
          <div className={style.resultBlock}>
            <h3
              className={`${style.textStyle} ${style.textResult} ${style.delivery}`}
            >
              Доставка
              <span className={`${style.resultSpan}`}>
                Оплачивается при получении
              </span>
            </h3>
            <h3 className={`${style.textStyle} ${style.textResult}`}>
              ≈{priceDelivery} ₽
            </h3>
          </div>
        </div>
        <button
          className={style.applyButton}
          onClick={() => {
            handleClickApply();
          }}
        >
          {Number(order.product.price.replace(/\./g, '')) + priceDelivery}₽
          Оплатить
        </button>
      </div>
    </div>
  );
}
