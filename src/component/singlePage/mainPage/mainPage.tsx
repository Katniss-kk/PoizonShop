import style from './mainPage.module.css';
import img from '../../../assets/images/mainpage.png';
import infoImg from '../../../assets/images/bannerMain.png';
import { CardCarousel } from '../../UI';

import { DataShoes } from '../../../../public/DataProductShoes';

export default function MainPage() {
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
        <CardCarousel items={DataShoes} />
      </div>
            <div className={style.carouselContent}>
        <h2 className={style.carouselTitle}>Новые поступления одежды</h2>
        <CardCarousel items={DataShoes} />
      </div>
            <div className={style.carouselContent}>
        <h2 className={style.carouselTitle}>Новые поступления аксессуары</h2>
        <CardCarousel items={DataShoes} />
      </div>
      </section>

      <section className={style.infoSection}>
        <div className={style.priceContainer}>
          <h3 className={style.priceTitle}>
            Рассчитай стоимость заказа прямо на сайте
          </h3>
          <div className={style.priceContainerInput}>
            <input
              type="text"
              placeholder="Цена на товар в юанях"
              className={style.priceInput}
            />
            <button className={style.priceButton}>Рассчитать</button>
          </div>
          <h4 className={style.priceTotal}>
            Итоговая стоимость: <span className={style.totalAmount}>3500₽</span>
          </h4>
        </div>
        <img src={infoImg} alt="Походит цена? Скорее заказывай!" />
      </section>
    </>
  );
}
