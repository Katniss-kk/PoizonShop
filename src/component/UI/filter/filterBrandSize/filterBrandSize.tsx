import style from './filterBrandSize.module.css';
import type { IBrandSize } from '../../../types';

export default function FilterBrandSize({ proops }: { proops: IBrandSize[] }) {
  return (
    <div className={style.container}>
      {proops.map(item => (
        <div key={item.value} className={style.brandItem}>
          <input
            type="checkbox"
            id={item.name}
            name="brand"
            value={item.value}
            className={style.checkbox}
          />
          <label htmlFor={item.name} className={style.label}>
            {item.name}
          </label>
        </div>
      ))}
    </div>
  );
}
