import React, { createContext, useContext, useEffect, useState } from 'react';
import type {
  DataProvider,
  DataContextType,
  DataProviderProps,
  order,
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
    allBrands: [],
    allSizes: [],
  });

  const [order, setOrder] = useState<order>({
    product: '',
    size: '',
    receive: '',
    point: '',
    name: '',
    number: ''
  })

  const [page, setPage] = useState<React.ReactNode>();

  useEffect(() => {
    // Бренды - убираем пустые

    const allBrands = data.data.map(item => item.brand).filter(brand => brand);
    const uniqueBrands = Array.from(new Set(allBrands));
    const brandsArray = uniqueBrands.map((brand, index) => ({
      name: brand,
      value: index + 1,
    }));

    // Размеры - обрабатываем массивы и убираем пустые
    const allSizes = data.data
      .map(item => item.size)
      .filter(sizeArray => sizeArray && sizeArray.length > 0) // Фильтруем непустые массивы
      .flat(); // Разворачиваем все массивы в один плоский массив

    const uniqueSizes = Array.from(new Set(allSizes)).sort((a, b) => a - b);
    const sizesArray = uniqueSizes.map(size => ({
      name: size.toString(),
      value: size, // Используем сам размер как значение
    }));

    updateWaitData({
      allBrands: brandsArray,
      allSizes: sizesArray,
    });
  }, [data.data]);

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

  // нужно адаптировать функции под универсальность. кроссовки одежда аксессуры. сейчас все работает напрямую с dataShoes

  const updateData = (newData: Partial<DataProvider>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const updateWaitData = (newData: Partial<DataProvider>) => {
    setWaitData(prev => ({ ...prev, ...newData }));
  };

    const updateOrder = (newOrder: Partial<order>) => {
    setOrder(prev => ({ ...prev, ...newOrder }));
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
      sizes: [],
      brands: [],
    });
  };

  const value: DataContextType = {
    data,
    waitData,
    order,
    setData,
    updateData,
    updateWaitData,
    updateOrder,
    setFilterData,
    resetData,
    page,
    setPage,
    setOrder
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
