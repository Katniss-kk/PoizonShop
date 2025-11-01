import type { CardOneItem } from '../../../types';
import style from './CardItem.module.css';


export default function CardItem({item, producCustomtImage}: CardOneItem) {
  return (
    <>
      {item.img && item.img[0] && (
        <img
          src={item.img[0]}
          alt={item.title}
          className={producCustomtImage}
        />
      )}
      <div className={style.productContainer}>
        <h5 className={style.productTitle}>{item.title}</h5>
        <span className={style.productBrand}>{item.brand}</span>
        <h4 className={style.productPrice}>{item.price} ₽</h4>
      </div>
    </>
  );
}
