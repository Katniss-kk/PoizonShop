import React, { createContext, useContext, useEffect, useState } from 'react';
import type {
  DataProvider,
  DataContextType,
  DataProviderProps,
} from '../types';

import { DataFilter } from './dataFilter';

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: DataProviderProps) {
  const [data, setData] = useState<DataProvider>({
    data: [],
    filterData: [],
    minPrice: 0,
    maxPrice: 0,
    brands: [],
    sizes: [],
  });

  const [waitData, setWaitData] = useState<DataProvider>({
    data: [],
    filterData: [],
    minPrice: 0,
    maxPrice: 0,
    brands: [],
    sizes: [],
    minAllPrice: 0,
    maxAllPrice: 0,
  });

  const setFilterData = () => {
    const updatedData = {
      minPrice: waitData.minPrice,
      maxPrice: waitData.maxPrice,
      brands: waitData.brands,
      sizes: waitData.sizes,
      filterData: DataFilter({
        ...data,
        minPrice: waitData.minPrice,
        maxPrice: waitData.maxPrice,
        brands: waitData.brands,
        sizes: waitData.sizes,
      }),
    };

    updateData(updatedData);
  };
  // TODO: дописать функцию фильтрации по брендам и размерам
  // на данный момент сохраняются данные не туда и фильтрация не работает
  // нужно временное хранилище и дальнейшая реализация этот код только перебирает данные и сохраняет их
  useEffect(() => {
    // Бренды - убираем пустые
    const allBrands = data.data.map(item => item.brand).filter(brand => brand);
    const uniqueBrands = Array.from(new Set(allBrands));
    const brandsArray = uniqueBrands.map((brand, index) => ({
      name: brand,
      value: index + 1,
    }));

    // Размеры - убираем пустые
    const allSizes = data.data.map(item => item.size).filter(size => size);
    const uniqueSizes = Array.from(new Set(allSizes)).sort((a, b) => a - b);
    const sizesArray = uniqueSizes.map((size, index) => ({
      name: size.toString(),
      value: index + 1,
    }));

    updateWaitData({
      brands: brandsArray,
      sizes: sizesArray,
    });
  }, [data.data]);

  const updateData = (newData: Partial<DataProvider>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const updateWaitData = (newData: Partial<DataProvider>) => {
    setWaitData(prev => ({ ...prev, ...newData }));
  };

  const resetData = () => {
    const products = data.data;
    const min = waitData.minAllPrice;
    const max = waitData.maxAllPrice;
    updateData({
      filterData: products,
    });
    updateWaitData({
      minPrice: min,
      maxPrice: max,
    });
  };

  const value: DataContextType = {
    data,
    waitData,
    setData,
    updateData,
    updateWaitData,
    setFilterData,
    resetData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData(): DataContextType {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
