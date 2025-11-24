import style from './filterBrandSize.module.css';
import type { IBrandSize } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../../service/store';
import {
  setBrandsData,
  setSizesData,
} from '../../../../service/slices/filterProductsSlice';
import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../../../service/store';

const selectSelectedBrands = createSelector(
  (state: RootState) => state.filter.selectedBrands,
  selectedBrands => selectedBrands || []
);

const selectSelectedSizes = createSelector(
  (state: RootState) => state.filter.selectedSizes,
  selectedSizes => selectedSizes || []
);

export default function FilterBrandSize({ allBrands, allSizes }: IBrandSize) {
  const dispatch = useAppDispatch();

  const selectedBrands = useAppSelector(selectSelectedBrands);
  const selectedSizes = useAppSelector(selectSelectedSizes);

  const items = allBrands || allSizes || [];

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const itemName = e.target.name;
    const isChecked = e.target.checked;
    const isNumber = !isNaN(Number(itemName));

    if (isNumber) {
      // Для размеров
      const newSizes = isChecked
        ? [...selectedSizes, itemName]
        : selectedSizes.filter(item => item !== itemName);

      dispatch(setSizesData(newSizes));
    } else {
      // Для брендов
      const newBrands = isChecked
        ? [...selectedBrands, itemName]
        : selectedBrands.filter(item => item !== itemName);

      dispatch(setBrandsData(newBrands));
    }
  };

  const isChecked = (item: string) => {
    const isNumber = !isNaN(Number(item));

    if (isNumber) {
      return selectedSizes.includes(item);
    } else {
      return selectedBrands.includes(item);
    }
  };

  return (
    <div className={style.container}>
      {items.map(item => (
        <div key={String(item)} className={style.brandItem}>
          <input
            type="checkbox"
            id={String(item)}
            name={String(item)}
            value={String(item)}
            className={style.checkbox}
            onChange={handleCheckboxChange}
            checked={isChecked(String(item))}
          />
          <label htmlFor={String(item)} className={style.label}>
            {String(item)}
          </label>
        </div>
      ))}
    </div>
  );
}
