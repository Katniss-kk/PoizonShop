import type { DataProvider, IProduct } from '../types';

export function DataFilter(data: DataProvider): IProduct[] {
  if (!data.data || !Array.isArray(data.data)) {
    return [];
  }

  return data.data.filter(item => {
    const price = parseFloat(item.price.replace(/\./g, '')) || 0;

    if (data.minPrice !== 0 && price < data.minPrice) return false;
    if (data.maxPrice !== 0 && price > data.maxPrice) return false;
    if (data.brands.length > 0 && !data.brands.includes(item.brand))
      return false;
    
    if (data.sizes.length > 0) {
      // item.size - массив размеров, проверяем пересечение
      const itemSizes = Array.isArray(item.size) ? item.size : [item.size];
      const filterSizes = data.sizes.map(size => String(size).trim());
      
      // Проверяем, есть ли хотя бы один общий размер
      const hasSizeMatch = itemSizes.some(itemSize => 
        filterSizes.includes(String(itemSize).trim())
      );
      
      if (!hasSizeMatch) return false;
    }

    return true;
  });
}