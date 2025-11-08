import style from './filterBrandSize.module.css';
import type { IBrandSize } from '../../../types';
import { useState } from 'react';

import { useData } from '../../../hooks/dataProvider';

export default function FilterBrandSize({ allBrands, allSizes }: IBrandSize) {
  const { waitData, updateWaitData } = useData();

  const items = allBrands || allSizes || [];

  const settings = e => {
    const itemName = e.target.name;
    const isNumber = !isNaN(parseFloat(itemName)) && isFinite(itemName);

    if (e.target.checked) {
      if (isNumber) {
        updateWaitData({
          sizes: waitData.sizes.concat(itemName),
        });
      } else {
        updateWaitData({
          brands: waitData.brands.concat(itemName),
        });
      }
    } else {
      if (isNumber) {
        updateWaitData({
          sizes: waitData.sizes.filter((item) => item !== itemName),
        });
      } else {
        updateWaitData({
          brands: waitData.brands.filter((item) => item !== itemName),
        });
      }
    }
  };

  // Функция для определения checked состояния
  const isChecked = (item) => {
    const itemName = item.name;
    const isNumber = !isNaN(parseFloat(itemName)) && isFinite(itemName);
    
    if (isNumber) {
      return waitData.sizes.includes(itemName);
    } else {
      return waitData.brands.includes(itemName);
    }
  };

  return (
    <div className={style.container}>
      {items.map(item => (
        <div key={item.value} className={style.brandItem}>
          <input
            type="checkbox"
            id={item.name}
            name={item.name}
            value={item.value}
            className={style.checkbox}
            onChange={settings}
            checked={isChecked(item)}
          />
          <label htmlFor={item.name} className={style.label}>
            {item.name}
          </label>
        </div>
      ))}
    </div>
  );
}