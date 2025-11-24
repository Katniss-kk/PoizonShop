import React, { useState } from 'react';
import style from './filterPrice.module.css';
import {
  setMaxPriceData,
  setMinPriceData,
} from '../../../../service/slices/filterProductsSlice';
import { useAppSelector, useAppDispatch } from '../../../../service/store';

interface FilterPriceProps {
  actualMinPrice: number;
  actualMaxPrice: number;
}

export default function FilterPrice({
  actualMinPrice,
  actualMaxPrice,
}: FilterPriceProps) {
  const dispatch = useAppDispatch();

  const [minPriceTextState, setMinPriceTextState] = useState(actualMinPrice);
  const [maxPriceTextState, setMaxPriceTextState] = useState(actualMaxPrice);

  const selectedMinPrice = useAppSelector(state =>
    Number(state.filter.selectedMinPrice)
  );
  const selectedMaxPrice = useAppSelector(state =>
    Number(state.filter.selectedMaxPrice)
  );

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setMinPriceData(Number(e.target.value)));
    setMinPriceTextState(Number(e.target.value));
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setMaxPriceData(Number(e.target.value)));
    setMaxPriceTextState(Number(e.target.value));
  };

  const handleMinTextChange = () => {
    if (minPriceTextState < actualMinPrice) {
      dispatch(setMinPriceData(actualMinPrice));
      setMinPriceTextState(actualMinPrice);
    } else if (minPriceTextState > actualMaxPrice) {
      dispatch(setMinPriceData(actualMaxPrice - 1));
      setMinPriceTextState(actualMaxPrice - 1);
    } else {
      dispatch(setMinPriceData(minPriceTextState));
    }
  };

  const handleMaxTextChange = () => {
    if (maxPriceTextState > actualMaxPrice) {
      dispatch(setMaxPriceData(actualMaxPrice));
      setMaxPriceTextState(actualMaxPrice);
    } else if (maxPriceTextState < actualMinPrice) {
      dispatch(setMaxPriceData(actualMinPrice + 1));
      setMaxPriceTextState(actualMinPrice + 1);
    } else {
      dispatch(setMaxPriceData(maxPriceTextState));
    }
  };

  const minPercent =
    ((selectedMinPrice - actualMinPrice) / (actualMaxPrice - actualMinPrice)) *
    100;
  const maxPercent =
    ((selectedMaxPrice - actualMinPrice) / (actualMaxPrice - actualMinPrice)) *
    100;

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
      <h3 className={`${style.text} ${style.textPrice}`}>Цена</h3>
      <div className={style.slider} style={sliderStyle}>
        <input
          type="range"
          min={actualMinPrice}
          max={actualMaxPrice}
          value={selectedMinPrice}
          onChange={handleMinChange}
          className={`${style.thumb} ${style.thumbLeft}`}
        />
        <input
          type="range"
          min={actualMinPrice}
          max={actualMaxPrice}
          value={selectedMaxPrice}
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
            inputMode="numeric"
            pattern="[0-9]*"
            value={minPriceTextState}
            onChange={e => {
              let value = e.target.value;
              value = value.replace(/[^\d]/g, '');
              setMinPriceTextState(Number(value));
            }}
            onBlur={() => handleMinTextChange()}
          />
        </div>
        <div className={style.container}>
          <h4 className={style.text}>До</h4>
          <input
            type="text"
            className={`${style.input} ${style.text}`}
            inputMode="numeric"
            pattern="[0-9]*"
            value={maxPriceTextState}
            onChange={e => {
              let value = e.target.value;
              value = value.replace(/[^\d]/g, '');
              setMaxPriceTextState(Number(value));
            }}
            onBlur={() => handleMaxTextChange()}
          />
        </div>
      </div>
    </div>
  );
}
