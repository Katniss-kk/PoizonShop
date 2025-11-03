import { useState } from 'react';
import style from './filterPrice.module.css';

import { useData } from '../../../hooks/dataProvider';

interface FilterPriceProps {
  minPrice: number;
  maxPrice: number;
  onPriceChange?: (min: number, max: number) => void;
}

export default function FilterPrice({ minPrice, maxPrice }: FilterPriceProps) {
  const { updateData, data, updateWaitData, waitData } = useData();

  const setSelectedMin = (price: number) => {
    updateWaitData({
      minPrice: price,
    });
  };

  const setSelectedMax = (price: number) => {
    updateWaitData({
      maxPrice: price,
    });
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), data.maxPrice - 1);
    setSelectedMin(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), data.minPrice + 1);
    setSelectedMax(value);
  };

  const minPercent =
    maxPrice > minPrice
      ? ((waitData.minPrice - minPrice) / (maxPrice - minPrice)) * 100
      : 0;
  const maxPercent =
    maxPrice > minPrice
      ? ((waitData.maxPrice - minPrice) / (maxPrice - minPrice)) * 100
      : 100;

  const sliderStyle = {
    background: `linear-gradient(to right, 
      #E5E7EB 0%, 
      #E5E7EB ${minPercent}%, 
      #1C64F2 ${minPercent}%, 
      #1C64F2 ${maxPercent}%, 
      #E5E7EB ${maxPercent}%, 
      #E5E7EB 100%
    )`,
  };

  return (
    <div className={style.content}>
      <h3 className={style.text}>Цена</h3>
      <div className={style.slider} style={sliderStyle}>
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={waitData.minPrice}
          onChange={handleMinChange}
          className={`${style.thumb} ${style.thumbLeft}`}
        />
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={waitData.maxPrice}
          onChange={handleMaxChange}
          className={`${style.thumb} ${style.thumbRight}`}
        />
      </div>
      <div className={style.containerInput}>
        <div className={style.container}>
          <h4 className={style.text}>От</h4>
          <input
            type="text"
            className={`${style.input} ${style.text}`}
            value={waitData.minPrice.toLocaleString()}
            onChange={handleMinChange}
          />
        </div>
        <div className={style.container}>
          <h4 className={style.text}>До</h4>
          <input
            type="text"
            className={`${style.input} ${style.text}`}
            value={waitData.maxPrice.toLocaleString()}
            onChange={handleMinChange}
          />
        </div>
      </div>
    </div>
  );
}
