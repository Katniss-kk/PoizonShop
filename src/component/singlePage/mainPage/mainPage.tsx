import style from './mainPage.module.css';
import img from '../../../assets/images/mainpage.png';
import infoImg from '../../../assets/images/bannerMain.png';
import { CardCarousel } from '../../UI';
import { useState, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../service/store';
import type { RootState } from '../../../service/store';

export default function MainPage() {
  const [jpyRate, setJpyRate] = useState<number | null>(null);
  const [inputText, setInputText] = useState('');
  const [resultRub, setResultRub] = useState(0);

  const dispatch = useAppDispatch();
  const { productsShoes, productsCloth, productsAcs, loading } = useAppSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/daily_json.js')
      .then(res => res.json())
      .then(data => setJpyRate(data.Valute.JPY.Value))
      .catch(err => console.error('Ошибка:', err));
  }, []);

  const calculateRub = () => {
    if (inputText && jpyRate) {
      setResultRub(Number(inputText) * jpyRate);
    }
  };

  return (
    <>
      <section className={style.aboutSection}>
        <div className={style.aboutText}>
          <h1 className={style.aboutTitle}>Оригинальные товары от POIZON </h1>
          <ul className={style.aboutList}>
            <li className={style.aboutListItem}>
              Доставка по всей России бесплатно
            </li>
            <li className={style.aboutListItem}>
              Официально зарегистрированное юридическое лицо
            </li>
            <li className={style.aboutListItem}>
              Оформление и оплата заказа как в магазине
            </li>
            <li className={style.aboutListItem}>
              Только сертифицированные товары из каталога POIZON
            </li>
            <li className={style.aboutListItem}>
              Доставили более 10 000 посылок за 3 года
            </li>
          </ul>
        </div>
        <img src={img} alt="PoizonShop" className={style.aboutImg} />
      </section>

      <section>
        <div className={style.carouselContent}>
          <h2 className={style.carouselTitle}>Новые поступления обуви</h2>
          <CardCarousel items={productsShoes} loading={loading} />
        </div>
        <div className={style.carouselContent}>
          <h2 className={style.carouselTitle}>Новые поступления одежды</h2>
          <CardCarousel items={productsCloth} loading={loading}/>
        </div>
        <div className={style.carouselContent}>
          <h2 className={style.carouselTitle}>Новые поступления аксессуары</h2>
          <CardCarousel items={productsAcs} loading={loading}/>
        </div>
      </section>

      <section className={style.infoSection}>
        <div className={style.priceContainer}>
          <h3 className={style.priceTitle}>
            Рассчитай стоимость заказа прямо на сайте
          </h3>
          <div className={style.priceContainerInput}>
            <input
              type="number"
              placeholder="Цена на товар в юанях"
              className={style.priceInput}
              value={inputText || ''}
              onChange={e => setInputText(e.target.value)}
            />
            <button className={style.priceButton} onClick={calculateRub}>
              Рассчитать
            </button>
          </div>
          <h4 className={style.priceTotal}>
            Итоговая стоимость:
            <br />
            {resultRub.toFixed(2)}₽
          </h4>
        </div>
        <img
          src={infoImg}
          alt="Походит цена? Скорее заказывай!"
          className={style.infoImg}
        />
      </section>
    </>
  );
}
