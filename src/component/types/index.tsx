import type { ReactElement, ReactNode } from 'react';

export interface topMenuProps {
  setPage: (page: ReactElement) => void;
}

export interface LogoProps extends topMenuProps {
  className?: string;
}

export interface CardItems {
  items: IProduct[];
}

export interface CardOneItem {
  item: IProduct;
  producCustomtImage: string;
}

export interface CardCarouselProps extends CardItems {
  autoPlay?: boolean;
  showPagination?: boolean;
}

export interface IProduct {
  type: string;
  title: string;
  img: string[];
  brand: string;
  size: string[] | number[];
  price: string;
}

export interface PageItem extends CardItems {
  title: string;
  catalog: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply?: () => void;
  onReset?: () => void;
  children: ReactNode;
}

export interface IBrandSize {
  name: string;
  value: number;
}

export interface DataProvider {
  data: IProduct[];
  filterData: IProduct[];
  minPrice: number;
  maxPrice: number;
  brands: { name: string; value: number }[];
  sizes: { name: string; value: number }[];
  minAllPrice?: number,
  maxAllPrice?: number
}

export interface DataContextType {
  waitData: DataProvider;
  data: DataProvider;
  setData: React.Dispatch<React.SetStateAction<DataProvider>>;
  updateData: (newData: Partial<DataProvider>) => void;
  updateWaitData: (newData: Partial<DataProvider>) => void;
  setFilterData: () => void;
  resetData: () => void;
}

export interface DataProviderProps {
  children: ReactNode;
}
