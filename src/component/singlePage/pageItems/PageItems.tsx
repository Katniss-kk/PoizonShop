import type { IProduct, PageItem } from '../../types';
import { CardItem, Separator } from '../../UI';
import style from './PageItems.module.css';
import {
  setBrandsAndSizes,
  setFilterProducts,
  setProductsData,
} from '../../../service/slices/filterProductsSlice';
import { useAppDispatch, useAppSelector } from '../../../service/store';
import { ButtonFilter } from '../../UI';
import { useEffect, useState } from 'react';

export default function PageItems({
  items,
  title,
  catalog,
  loading,
}: PageItem) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setProductsData(items));
    dispatch(setBrandsAndSizes(items));
    dispatch(setFilterProducts());
  }, [dispatch, items]);

  const productsItem =
    useAppSelector(state => state.filter.filterProducts) || items;

  if (loading) {
    return (
      <div>
        <h1 style={{ textAlign: 'center', margin: '50px' }}>
          Загрузка товаров...
        </h1>
      </div>
    );
  }

  return (
    <>
      <section className={style.textSection}>
        <div className={style.textContainer}>
          <h3 className={style.title}>{title}</h3>
          <h4 className={style.catalog}>{catalog}</h4>
        </div>
        <Separator />
        <div className={style.buttonContainer}>
          <ButtonFilter items={items} />
        </div>
      </section>
      <section className={style.containerSection}>
        {productsItem.map(item => (
          <div
            className={style.containerItem}
            key={`${item.title}-${item.brand}`}
          >
            <CardItem
              item={item}
              producCustomtImage={style.productCustomImage}
            />
          </div>
        ))}
      </section>
    </>
  );
}
