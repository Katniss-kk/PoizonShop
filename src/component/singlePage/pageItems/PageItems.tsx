import type { PageItem } from '../../types';
import { CardItem, Separator } from '../../UI';
import style from './PageItems.module.css';

import { ButtonFilter } from '../../UI';

export default function PageItems({ items, title, catalog }: PageItem) {
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
        {items.map(item => (
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
