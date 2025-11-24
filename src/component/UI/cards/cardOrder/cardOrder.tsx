import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../service/store';
import {
  validateAndPushOrder,
  setHowBuy,
  setAddress,
  setContacts,
  setNumber,
  setSizeState,
} from '../../../../service/slices/orderSlice';
import style from './cardOrder.module.css';

export default function CardOrder() {
  const [localHowBuy, setLocalHowBuy] = useState<string>('');
  const [localAddress, setLocalAddress] = useState<string>('');
  const [localContacts, setLocalContacts] = useState<string>('');
  const [localNumber, setLocalNumber] = useState<string>('');
  const [tempErrors, setTempErrors] = useState({
    size: false,
    howBuy: false,
    address: false,
    contacts: false,
    number: false,
  });

  const product = useAppSelector(state => state.order.product);
  const size = useAppSelector(state => state.order.size);
  const errors = useAppSelector(state => state.order.errors);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Эффект для временной подсветки ошибок
  useEffect(() => {
    const hasAnyErrors = Object.values(errors).some(error => error);
    if (hasAnyErrors) {
      setTempErrors(errors);

      const timer = setTimeout(() => {
        setTempErrors({
          size: false,
          howBuy: false,
          address: false,
          contacts: false,
          number: false,
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [errors]);

  // Синхронизация с Redux
  useEffect(() => {
    dispatch(setHowBuy(localHowBuy));
  }, [localHowBuy, dispatch]);

  useEffect(() => {
    dispatch(setAddress(localAddress));
  }, [localAddress, dispatch]);

  useEffect(() => {
    dispatch(setContacts(localContacts));
  }, [localContacts, dispatch]);

  useEffect(() => {
    dispatch(setNumber(localNumber));
  }, [localNumber, dispatch]);

  useEffect(() => {
    if (!product) {
      navigate('/PoizonShop/');
    }
  }, [product, navigate]);

  const handleClickApply = () => {
    dispatch(validateAndPushOrder())
      .unwrap()
      .then(result => {
        if (result) {
          navigate('/PoizonShop/');
        }
      })
      .catch(error => {
        console.log('Ошибка при оформлении заказа:', error);
      });
  };

  const handleClickSize = (selectedSize: number) => {
    dispatch(setSizeState(selectedSize));
  };

  const handleHowBuyChange = (method: string) => {
    setLocalHowBuy(method);
  };

  const handleAddressChange = (value: string) => {
    setLocalAddress(value);
  };

  const handleContactsChange = (value: string) => {
    setLocalContacts(value);
  };

  const handleNumberChange = (value: string) => {
    setLocalNumber(value);
  };

  if (!product) {
    return null;
  }

  const priceDelivery = 400;

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

        {product.size && product.size.length > 0 && (
          <div className={style.sizeContainer}>
            {product.size.map(item => (
              <button
                key={item}
                className={`${style.size} ${
                  size === item ? style.sizeActive : ''
                } ${tempErrors.size ? style.errorMesseg : ''}`}
                onClick={() => handleClickSize(Number(item))}
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
              localHowBuy === 'В пункте выдачи' ? style.buyButtonActive : ''
            } ${tempErrors.howBuy ? style.errorMesseg : ''}`}
            onClick={() => handleHowBuyChange('В пункте выдачи')}
          >
            В пункте выдачи
          </button>
          <button
            className={`${style.textStyle} ${style.buyButton} ${
              localHowBuy === 'В магазине' ? style.buyButtonActive : ''
            } ${tempErrors.howBuy ? style.errorMesseg : ''}`}
            onClick={() => handleHowBuyChange('В магазине')}
          >
            В магазине
          </button>
          <input
            type="text"
            placeholder="Адрес пункта выдачи"
            className={`${style.inputText} ${tempErrors.address ? style.errorMesseg : ''}`}
            value={localAddress}
            onChange={e => handleAddressChange(e.target.value)}
          />
        </div>

        <div className={style.buyContainer}>
          <h3 className={`${style.textStyle} ${style.buyTitle}`}>
            Кому выдать
          </h3>
          <input
            type="text"
            placeholder="Имя и фамилия"
            className={`${style.inputText} ${tempErrors.contacts ? style.errorMesseg : ''}`}
            value={localContacts}
            onChange={e => handleContactsChange(e.target.value)}
          />
          <input
            type="text"
            placeholder="+7 (•••) •••-••-••"
            className={`${style.inputText} ${tempErrors.number ? style.errorMesseg : ''}`}
            value={localNumber}
            onChange={e => handleNumberChange(e.target.value)}
          />
        </div>

        <div style={{ inlineSize: '100%', margin: '30px 0' }}>
          <hr />
        </div>

        <div className={style.resultContainer}>
          <div className={style.resultBlock}>
            <h3 className={`${style.textStyle} ${style.textResult}`}>Товар</h3>
            <h3 className={`${style.textStyle} ${style.textResult}`}>
              {product.price}
            </h3>
          </div>
          <div className={style.resultBlock}>
            <h3
              className={`${style.textStyle} ${style.textResult} ${style.delivery}`}
            >
              Доставка
              <span className={style.resultSpan}>
                Оплачивается при получении
              </span>
            </h3>
            <h3 className={`${style.textStyle} ${style.textResult}`}>
              ≈{priceDelivery} ₽
            </h3>
          </div>
        </div>

        <button className={style.applyButton} onClick={handleClickApply}>
          {(
            priceDelivery + parseInt(product.price.replace(/[^\d]/g, ''))
          ).toLocaleString('ru-RU')}{' '}
          ₽ Оплатить
        </button>
      </div>
    </div>
  );
}
