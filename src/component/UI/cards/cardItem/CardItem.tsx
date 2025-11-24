import type { CardOneItem } from '../../../types';
import style from './CardItem.module.css';
import { useNavigate, Link } from 'react-router-dom'; // Добавьте Link
import { getProductByTitle } from '../../../../service/slices/productsSlice';
import { useAppDispatch } from '../../../../service/store';

export default function CardItem({ item, producCustomtImage }: CardOneItem) {
  const dispatch = useAppDispatch();

  const createSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\u0400-\u04FF\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  const productSlug = createSlug(item.title);
  const productLink = `/product/${productSlug}`;

  return (
    <>
      {item.img && item.img[0] && (
        <Link
          to={productLink}
          onClick={() => dispatch(getProductByTitle(item))}
        >
          <img
            src={item.img[0]}
            alt={item.title}
            className={producCustomtImage}
            style={{ cursor: 'pointer' }}
          />
        </Link>
      )}
      <div className={style.productContainer}>
        <h5 className={style.productTitle}>{item.title}</h5>
        <span className={style.productBrand}>{item.brand}</span>
        <h4 className={style.productPrice}>{item.price} ₽</h4>
      </div>
    </>
  );
}
