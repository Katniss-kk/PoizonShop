import { useState } from 'react';
import style from './filterPrice.module.css';

interface FilterPriceProps {
  minPrice: number;
  maxPrice: number;
  onPriceChange?: (min: number, max: number) => void;
}

export default function FilterPrice({ minPrice, maxPrice, onPriceChange }: FilterPriceProps) {
  const [selectedMin, setSelectedMin] = useState(minPrice);
  const [selectedMax, setSelectedMax] = useState(maxPrice);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), selectedMax - 1);
    setSelectedMin(value);
    onPriceChange?.(value, selectedMax);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), selectedMin + 1);
    setSelectedMax(value);
    onPriceChange?.(selectedMin, value);
  };

  const minPercent = maxPrice > minPrice ? ((selectedMin - minPrice) / (maxPrice - minPrice)) * 100 : 0;
  const maxPercent = maxPrice > minPrice ? ((selectedMax - minPrice) / (maxPrice - minPrice)) * 100 : 100;

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
          value={selectedMin}
          onChange={handleMinChange}
          className={`${style.thumb} ${style.thumbLeft}`}
        />
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={selectedMax}
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
            value={selectedMin.toLocaleString()} 
            readOnly 
          />
        </div>
        <div className={style.container}>
          <h4 className={style.text}>До</h4>
          <input 
            type="text" 
            className={`${style.input} ${style.text}`} 
            value={selectedMax.toLocaleString()} 
            readOnly 
          />
        </div>
      </div>
    </div>
  );
}