import { useEffect, useState, type ReactElement } from 'react';
import type { IProduct } from '../../../types';
import style from './cardSelected.module.css';
import CardOrder from '../cardOrder/cardOrder';
import { CardSelectedContent } from '../../../../constants/CardSelectedContent';

import notFound from '../../../../../public/images/404.jpeg';

import { useAppDispatch, useAppSelector } from '../../../../service/store';
import { useNavigate, useParams } from 'react-router-dom';
import {
  setProduct,
  setSizeState,
} from '../../../../service/slices/orderSlice';

export default function CardSelected() {
  const { productTitle } = useParams<{ productTitle: string }>();
  const products = useAppSelector(state => state.products.products);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [item, setItem] = useState<IProduct | null>(null);
  const [mainImage, setMainImage] = useState('');
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [size, setSize] = useState<number>(0);

  useEffect(() => {
    dispatch(setSizeState(Number(size)));
  }, [size]);

  useEffect(() => {
    if (products.length > 0 && productTitle) {
      const foundItem = products.find(product => {
        const productSlug = product.title
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-')
          .replace(/[^\w\u0400-\u04FF\-]+/g, '')
          .replace(/\-\-+/g, '-')
          .replace(/^-+/, '')
          .replace(/-+$/, '');

        const decodedSlug = decodeURIComponent(productTitle || '');
        return productSlug === decodedSlug;
      });

      if (foundItem) {
        const fixedItem = {
          ...foundItem,
          img: foundItem.img.map(imgPath =>
            imgPath.startsWith('./')
              ? `/PoizonShop${imgPath.substring(1)}`
              : `/PoizonShop${imgPath}`
          ),
        };
        setItem(fixedItem);
        setMainImage(fixedItem.img[0]);
      } else {
        setItem(null);
      }
    }
  }, [products, productTitle]);

  if (!item) {
    return (
      <div>
        <h1 style={{ textAlign: 'center', margin: '50px' }}>Загрузка...</h1>
      </div>
    );
  }

  const handleClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const textButton = e.currentTarget.dataset.text;
    setActiveSection(activeSection === textButton ? null : textButton || null);
  };

  const handleClickBuy = () => {
    const hasSizes = item.size && item.size.length > 0;
    if (hasSizes && size === 0) {
      return;
    } else {
      dispatch(setProduct(item));
      navigate('/order');
    }
  };

  const selectedImage = (e: string) => {
    if (e && e.length !== 0) {
      setMainImage(e);
    } else {
      setMainImage(notFound);
    }
  };

  return (
    <div className={style.selectedCard}>
      <span className={`${style.catalog} ${style.textStyle}`}>
        Главная / Обувь / {item.title}
      </span>
      <div className={style.block}>
        <div className={style.imgContainer}>
          <img
            src={mainImage}
            alt={item.title}
            className={style.selectedImage}
          />
          <img
            src={item.img[0]}
            alt={item.title}
            onClick={() => selectedImage(item.img[0])}
            className={style.image}
          />
          <img
            src={item.img[1] || notFound}
            alt={item.title}
            onClick={() => selectedImage(item.img[1])}
            className={style.image}
          />
          <img
            src={item.img[2] || notFound}
            alt={item.title}
            onClick={() => selectedImage(item.img[2])}
            className={style.image}
          />
          <img
            src={item.img[3] || notFound}
            alt={item.title}
            onClick={() => selectedImage(item.img[3])}
            className={style.image}
          />
        </div>
        <div className={style.textBlock}>
          <div className={style.titleContainer}>
            <span className={`${style.brand} ${style.textStyle}`}>
              {item.brand}
            </span>
            <h1 className={`${style.title} ${style.textStyle}`}>
              {item.title}
            </h1>
            <h4 className={`${style.price} ${style.textStyle}`}>
              {item.price} ₽
            </h4>
            <p className={`${style.info} ${style.textStyle}`}>
              Все налоги и таможенные сборы включены. Стоимость доставки
              рассчитывается на этапе оформления заказа.
            </p>
            <h2 className={`${style.infoSize} ${style.textStyle}`}>
              *Бирка на ваших кроссовках поможет выбрать правильный размер.
            </h2>
            <hr />
          </div>
          <div className={style.sizesContainer}>
            {item.size?.map(item => (
              <button
                key={item}
                className={`${style.sizeButton} ${size === item ? style.sizeButtonActive : ''}`}
                onClick={() => {
                  setSize(Number(item));
                }}
              >
                EU {item}
              </button>
            ))}
          </div>
          <button
            className={style.buttonBuy}
            onClick={() => {
              handleClickBuy();
            }}
          >
            Купить
          </button>
          <div className={style.aboutContainer}>
            <div className={style.buttonContainer}>
              <button
                className={`${style.about} ${style.textStyle}`}
                data-text="ГАРАНТИЯ ЛУЧШЕЙ ЦЕНЫ"
                onClick={e => {
                  handleClickButton(e);
                }}
              >
                <span className={style.spanSvg}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={style.aboutSvg}
                  >
                    <path d="M19.127 7.8937L18.235 7.00068C18.047 6.81267 17.943 6.56266 17.943 6.29766V5.03463C17.943 3.39158 16.607 2.05555 14.964 2.05555H13.701C13.44 2.05555 13.184 1.94955 12.999 1.76454L12.106 0.871522C10.944 -0.290507 9.055 -0.290507 7.894 0.871522L7.001 1.76354C6.816 1.94855 6.56 2.05455 6.299 2.05455H5.035C3.392 2.05455 2.056 3.39058 2.056 5.03363V6.29666C2.056 6.56166 1.952 6.81167 1.765 6.99967L0.873 7.8927C0.31 8.45571 0 9.20373 0 9.99975C0 10.7958 0.31 11.5438 0.873 12.1058L1.765 12.9988C1.953 13.1868 2.057 13.4368 2.057 13.7018V14.9649C2.057 16.6079 3.393 17.944 5.036 17.944H6.299C6.56 17.944 6.816 18.05 7.001 18.235L7.894 19.129C8.475 19.709 9.237 20 10 20C10.762 20 11.525 19.71 12.106 19.129L12.999 18.236C13.184 18.051 13.44 17.945 13.701 17.945H14.964C16.607 17.945 17.943 16.6089 17.943 14.9659V13.7028C17.943 13.4378 18.047 13.1878 18.235 12.9998L19.127 12.1078C19.69 11.5438 20 10.7958 20 9.99975C20 9.20373 19.69 8.45571 19.127 7.8937ZM17.723 10.7018L16.83 11.5948C16.268 12.1578 15.957 12.9058 15.957 13.7008V14.9639C15.957 15.5109 15.512 15.9569 14.964 15.9569H13.701C12.906 15.9569 12.157 16.2669 11.595 16.8299L10.702 17.7229C10.314 18.111 9.686 18.11 9.298 17.7229L8.405 16.8299C7.843 16.2669 7.094 15.9569 6.299 15.9569H5.035C4.487 15.9569 4.042 15.5109 4.042 14.9639V13.7008C4.042 12.9058 3.733 12.1578 3.169 11.5938L2.276 10.6998C2.089 10.5138 1.986 10.2648 1.986 9.99975C1.986 9.73474 2.089 9.48574 2.277 9.29773L3.171 8.40371C3.733 7.8407 4.043 7.09268 4.043 6.29766V5.03463C4.043 4.48761 4.488 4.0416 5.036 4.0416H6.299C7.094 4.0416 7.843 3.73159 8.405 3.16858L9.298 2.27556C9.686 1.88855 10.314 1.88855 10.702 2.27556L11.595 3.16858C12.157 3.73159 12.906 4.0416 13.701 4.0416H14.964C15.512 4.0416 15.957 4.48761 15.957 5.03463V6.29766C15.957 7.09268 16.266 7.8407 16.83 8.40471L17.723 9.29873C17.911 9.48574 18.014 9.73475 18.014 10.0008C18.014 10.2668 17.911 10.5138 17.723 10.7018Z" />
                    <path d="M13.445 7.16768L8.127 10.7128L6.707 9.29273C6.316 8.90172 5.684 8.90172 5.293 9.29273C4.902 9.68374 4.902 10.3158 5.293 10.7068L7.293 12.7068C7.486 12.8998 7.742 12.9998 8 12.9998C8.192 12.9998 8.386 12.9448 8.555 12.8318L14.555 8.83172C15.015 8.52571 15.139 7.9047 14.832 7.44469C14.526 6.98467 13.906 6.86067 13.445 7.16768Z" />
                  </svg>
                  ГАРАНТИЯ ЛУЧШЕЙ ЦЕНЫ
                </span>
                <svg
                  width="18"
                  height="10"
                  viewBox="0 0 18 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${style.aboutSvg} ${
                    activeSection === 'ГАРАНТИЯ ЛУЧШЕЙ ЦЕНЫ'
                      ? style.aboutSvgRotate
                      : ''
                  }`}
                >
                  <path d="M8.57101 9.5C8.11753 9.49991 7.68266 9.33338 7.36204 9.03703L0.522043 2.71664C0.358721 2.57088 0.228449 2.39653 0.13883 2.20375C0.0492101 2.01097 0.00203759 1.80363 6.45645e-05 1.59383C-0.00190846 1.38402 0.0413571 1.17596 0.127337 0.981769C0.213318 0.787581 0.340291 0.611161 0.500847 0.462801C0.661404 0.314441 0.852329 0.197114 1.06248 0.117666C1.27263 0.0382168 1.49781 -0.00176348 1.72486 5.96577e-05C1.95191 0.0018828 2.1763 0.0454718 2.38492 0.128283C2.59355 0.211094 2.78224 0.331471 2.93998 0.482386L8.57101 5.68565L14.202 0.482386C14.5246 0.194559 14.9565 0.0352938 15.4049 0.0388939C15.8532 0.0424941 16.2821 0.208671 16.5992 0.501634C16.9162 0.794597 17.096 1.19091 17.0999 1.6052C17.1038 2.0195 16.9315 2.41863 16.62 2.71664L9.77998 9.03703C9.45937 9.33338 9.0245 9.49991 8.57101 9.5Z" />
                </svg>
              </button>
              {activeSection === 'ГАРАНТИЯ ЛУЧШЕЙ ЦЕНЫ' &&
                CardSelectedContent['ГАРАНТИЯ ЛУЧШЕЙ ЦЕНЫ']}
            </div>
            <div className={style.buttonContainer}>
              <button
                className={`${style.about} ${style.textStyle}`}
                data-text="КАК ОПРЕДЕЛИТЬ РАЗМЕР?"
                onClick={e => {
                  handleClickButton(e);
                }}
              >
                <span className={style.spanSvg}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={style.aboutSvg}
                  >
                    <path d="M18 12H8V2C8 0.897 7.103 0 6 0H2C0.897 0 0 0.897 0 2V19C0 19.553 0.447 20 1 20H18C19.103 20 20 19.103 20 18V14C20 12.897 19.103 12 18 12ZM18 18H2V2H6V3H4C3.447 3 3 3.447 3 4C3 4.553 3.447 5 4 5H6V6H4C3.447 6 3 6.447 3 7C3 7.553 3.447 8 4 8H6V9H4C3.447 9 3 9.447 3 10C3 10.553 3.447 11 4 11H6C6 11 6 12.724 6 13C6 13.553 6.447 14 7 14H9V16C9 16.553 9.447 17 10 17C10.553 17 11 16.553 11 16V14H12V16C12 16.553 12.447 17 13 17C13.553 17 14 16.553 14 16V14H15V16C15 16.553 15.447 17 16 17C16.553 17 17 16.553 17 16V14H18V18Z" />
                    <path d="M4.5 17C5.32843 17 6 16.3284 6 15.5C6 14.6716 5.32843 14 4.5 14C3.67157 14 3 14.6716 3 15.5C3 16.3284 3.67157 17 4.5 17Z" />
                  </svg>
                  КАК ОПРЕДЕЛИТЬ РАЗМЕР?
                </span>
                <svg
                  width="18"
                  height="10"
                  viewBox="0 0 18 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${style.aboutSvg} ${
                    activeSection === 'КАК ОПРЕДЕЛИТЬ РАЗМЕР?'
                      ? style.aboutSvgRotate
                      : ''
                  }`}
                >
                  <path d="M8.57101 9.5C8.11753 9.49991 7.68266 9.33338 7.36204 9.03703L0.522043 2.71664C0.358721 2.57088 0.228449 2.39653 0.13883 2.20375C0.0492101 2.01097 0.00203759 1.80363 6.45645e-05 1.59383C-0.00190846 1.38402 0.0413571 1.17596 0.127337 0.981769C0.213318 0.787581 0.340291 0.611161 0.500847 0.462801C0.661404 0.314441 0.852329 0.197114 1.06248 0.117666C1.27263 0.0382168 1.49781 -0.00176348 1.72486 5.96577e-05C1.95191 0.0018828 2.1763 0.0454718 2.38492 0.128283C2.59355 0.211094 2.78224 0.331471 2.93998 0.482386L8.57101 5.68565L14.202 0.482386C14.5246 0.194559 14.9565 0.0352938 15.4049 0.0388939C15.8532 0.0424941 16.2821 0.208671 16.5992 0.501634C16.9162 0.794597 17.096 1.19091 17.0999 1.6052C17.1038 2.0195 16.9315 2.41863 16.62 2.71664L9.77998 9.03703C9.45937 9.33338 9.0245 9.49991 8.57101 9.5Z" />
                </svg>
              </button>
              {activeSection === 'КАК ОПРЕДЕЛИТЬ РАЗМЕР?' &&
                CardSelectedContent['КАК ОПРЕДЕЛИТЬ РАЗМЕР?']}
            </div>
            <div className={style.buttonContainer}>
              <button
                className={`${style.about} ${style.textStyle}`}
                data-text="СПОСОБЫ ДОСТАВКИ И ОПЛАТЫ"
                onClick={e => {
                  handleClickButton(e);
                }}
              >
                <span className={style.spanSvg}>
                  <svg
                    width="20"
                    height="17"
                    viewBox="0 0 20 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={style.aboutSvg}
                  >
                    <path d="M19.9 6.96296C19.9 6.95344 19.9 6.94286 19.894 6.93439L17.894 2.70159C17.811 2.52584 17.6834 2.37801 17.5255 2.27466C17.3676 2.1713 17.1857 2.11651 17 2.1164H13C13 1.5551 12.7893 1.01678 12.4142 0.61988C12.0391 0.222977 11.5304 0 11 0H2C1.46957 0 0.960859 0.222977 0.585786 0.61988C0.210714 1.01678 0 1.5551 0 2.1164V11.6402C0 11.9209 0.105357 12.19 0.292893 12.3885C0.48043 12.5869 0.734784 12.6984 1 12.6984H1.3C1.26981 12.8731 1.25275 13.05 1.249 13.2275C1.249 14.1396 1.59141 15.0144 2.2009 15.6594C2.8104 16.3043 3.63705 16.6667 4.499 16.6667C5.36095 16.6667 6.1876 16.3043 6.7971 15.6594C7.40659 15.0144 7.749 14.1396 7.749 13.2275C7.74591 13.0501 7.72952 12.8731 7.7 12.6984H12.3C12.2698 12.8731 12.2528 13.05 12.249 13.2275C12.249 14.1396 12.5914 15.0144 13.2009 15.6594C13.8104 16.3043 14.637 16.6667 15.499 16.6667C16.361 16.6667 17.1876 16.3043 17.7971 15.6594C18.4066 15.0144 18.749 14.1396 18.749 13.2275C18.7459 13.0501 18.7295 12.8731 18.7 12.6984H19C19.2652 12.6984 19.5196 12.5869 19.7071 12.3885C19.8946 12.19 20 11.9209 20 11.6402V7.40741C19.998 7.25328 19.9638 7.10152 19.9 6.96296ZM15.5 9.78836C14.7499 9.79211 14.0245 10.0728 13.449 10.582H13V8.46561H18V10.582H17.551C16.9755 10.0728 16.2501 9.79211 15.5 9.78836ZM16.382 4.2328L17.382 6.34921H13V4.2328H16.382ZM2 2.1164H11V10.582H6.551C5.97751 10.07 5.25135 9.78912 4.501 9.78912C3.75065 9.78912 3.02449 10.07 2.451 10.582H2V2.1164ZM4.5 14.5503C4.25277 14.5503 4.0111 14.4727 3.80554 14.3273C3.59998 14.182 3.43976 13.9754 3.34515 13.7337C3.25054 13.492 3.22579 13.226 3.27402 12.9695C3.32225 12.7129 3.4413 12.4772 3.61612 12.2922C3.79093 12.1072 4.01366 11.9812 4.25614 11.9302C4.49861 11.8791 4.74995 11.9053 4.97835 12.0055C5.20676 12.1056 5.40199 12.2751 5.53934 12.4926C5.67669 12.7102 5.75 12.9659 5.75 13.2275C5.74947 13.5782 5.61761 13.9143 5.3833 14.1622C5.14899 14.4102 4.83136 14.5497 4.5 14.5503ZM15.5 14.5503C15.2528 14.5503 15.0111 14.4727 14.8055 14.3273C14.6 14.182 14.4398 13.9754 14.3451 13.7337C14.2505 13.492 14.2258 13.226 14.274 12.9695C14.3223 12.7129 14.4413 12.4772 14.6161 12.2922C14.7909 12.1072 15.0137 11.9812 15.2561 11.9302C15.4986 11.8791 15.7499 11.9053 15.9784 12.0055C16.2068 12.1056 16.402 12.2751 16.5393 12.4926C16.6767 12.7102 16.75 12.9659 16.75 13.2275C16.7495 13.5782 16.6176 13.9143 16.3833 14.1622C16.149 14.4102 15.8314 14.5497 15.5 14.5503Z" />
                  </svg>
                  СПОСОБЫ ДОСТАВКИ И ОПЛАТЫ
                </span>
                <svg
                  width="18"
                  height="10"
                  viewBox="0 0 18 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${style.aboutSvg} ${
                    activeSection === 'СПОСОБЫ ДОСТАВКИ И ОПЛАТЫ'
                      ? style.aboutSvgRotate
                      : ''
                  }`}
                >
                  <path d="M8.57101 9.5C8.11753 9.49991 7.68266 9.33338 7.36204 9.03703L0.522043 2.71664C0.358721 2.57088 0.228449 2.39653 0.13883 2.20375C0.0492101 2.01097 0.00203759 1.80363 6.45645e-05 1.59383C-0.00190846 1.38402 0.0413571 1.17596 0.127337 0.981769C0.213318 0.787581 0.340291 0.611161 0.500847 0.462801C0.661404 0.314441 0.852329 0.197114 1.06248 0.117666C1.27263 0.0382168 1.49781 -0.00176348 1.72486 5.96577e-05C1.95191 0.0018828 2.1763 0.0454718 2.38492 0.128283C2.59355 0.211094 2.78224 0.331471 2.93998 0.482386L8.57101 5.68565L14.202 0.482386C14.5246 0.194559 14.9565 0.0352938 15.4049 0.0388939C15.8532 0.0424941 16.2821 0.208671 16.5992 0.501634C16.9162 0.794597 17.096 1.19091 17.0999 1.6052C17.1038 2.0195 16.9315 2.41863 16.62 2.71664L9.77998 9.03703C9.45937 9.33338 9.0245 9.49991 8.57101 9.5Z" />
                </svg>
              </button>
              {activeSection === 'СПОСОБЫ ДОСТАВКИ И ОПЛАТЫ' &&
                CardSelectedContent['СПОСОБЫ ДОСТАВКИ И ОПЛАТЫ']}
            </div>
            <div className={style.buttonContainer}>
              <button
                className={`${style.about} ${style.textStyle}`}
                data-text="ОБМЕН И ВОЗВРАТ"
                onClick={e => {
                  handleClickButton(e);
                }}
              >
                <span className={style.spanSvg}>
                  <svg
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={style.aboutSvg}
                  >
                    <path
                      d="M4.85714 9L1 5L4.85714 1M4.85714 17H13.2143C14.7488 17 16.2204 16.3679 17.3054 15.2426C18.3904 14.1174 19 12.5913 19 11C19 9.4087 18.3904 7.88258 17.3054 6.75736C16.2204 5.63214 14.7488 5 13.2143 5H2.28571"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  ОБМЕН И ВОЗВРАТ
                </span>
                <svg
                  width="18"
                  height="10"
                  viewBox="0 0 18 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${style.aboutSvg} ${
                    activeSection === 'ОБМЕН И ВОЗВРАТ'
                      ? style.aboutSvgRotate
                      : ''
                  }`}
                >
                  <path d="M8.57101 9.5C8.11753 9.49991 7.68266 9.33338 7.36204 9.03703L0.522043 2.71664C0.358721 2.57088 0.228449 2.39653 0.13883 2.20375C0.0492101 2.01097 0.00203759 1.80363 6.45645e-05 1.59383C-0.00190846 1.38402 0.0413571 1.17596 0.127337 0.981769C0.213318 0.787581 0.340291 0.611161 0.500847 0.462801C0.661404 0.314441 0.852329 0.197114 1.06248 0.117666C1.27263 0.0382168 1.49781 -0.00176348 1.72486 5.96577e-05C1.95191 0.0018828 2.1763 0.0454718 2.38492 0.128283C2.59355 0.211094 2.78224 0.331471 2.93998 0.482386L8.57101 5.68565L14.202 0.482386C14.5246 0.194559 14.9565 0.0352938 15.4049 0.0388939C15.8532 0.0424941 16.2821 0.208671 16.5992 0.501634C16.9162 0.794597 17.096 1.19091 17.0999 1.6052C17.1038 2.0195 16.9315 2.41863 16.62 2.71664L9.77998 9.03703C9.45937 9.33338 9.0245 9.49991 8.57101 9.5Z" />
                </svg>
              </button>
              {activeSection === 'ОБМЕН И ВОЗВРАТ' &&
                CardSelectedContent['ОБМЕН И ВОЗВРАТ']}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
