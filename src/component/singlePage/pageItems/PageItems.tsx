import type { PageItem } from '../../types';
import { CardItem, Separator } from '../../UI';
import style from './PageItems.module.css';

import { useData } from '../../hooks/dataProvider';

import { ButtonFilter } from '../../UI';
import { useEffect } from 'react';

export default function PageItems({ items, title, catalog }: PageItem) {
  const { data, updateData } = useData();

  useEffect(() => {
    updateData({
      data: items,
      filterData: items
    });
  }, []);

  return (
    <>
      <section className={style.textSection}>
        <div className={style.textContainer}>
          <h3 className={style.title}>{title}</h3>
          <h4 className={style.catalog}>{catalog}</h4>
        </div>
        <Separator />
        <div className={style.buttonContainer}>
          <ButtonFilter />
        </div>
      </section>
      <section className={style.containerSection}>
        {data.filterData.map(item => (
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