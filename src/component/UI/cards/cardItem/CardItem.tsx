import type { CardOneItem } from '../../../types';
import style from './CardItem.module.css';

import { useData } from '../../../hooks/dataProvider';
import CardSelected from '../cardSelected/cardSelected';


export default function CardItem({item, producCustomtImage}: CardOneItem) {
  const { setPage } = useData()

  return (
    <>
      {item.img && item.img[0] && (
        <img
          src={item.img[0]}
          alt={item.title}
          className={producCustomtImage}
          onClick={() => {setPage(<CardSelected item={item}/>)}}
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
