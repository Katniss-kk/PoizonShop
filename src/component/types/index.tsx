import type { ReactElement, ReactNode } from 'react';

export interface LogoProps {
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
  size?: string[] | number[] | undefined;
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
  allBrands?: { name: string; value: number }[];
  allSizes?: { name: string; value: number }[];
}

export interface DataProvider {
  data: IProduct[];
  filterData: IProduct[];
  minPrice: number;
  maxPrice: number;
  brands: { name: string; value: number }[];
  sizes: { name: string; value: number }[];
  minAllPrice?: number;
  maxAllPrice?: number;
  allBrands?: { name: string; value: number }[];
  allSizes?: { name: string; value: number }[];
}

export interface DataContextType {
  waitData: DataProvider;
  data: DataProvider;
  setData: React.Dispatch<React.SetStateAction<DataProvider>>;
  updateData: (newData: Partial<DataProvider>) => void;
  updateWaitData: (newData: Partial<DataProvider>) => void;
  updateOrder: (newOrder: Partial<order>) => void;
  setFilterData: () => void;
  resetData: () => void;
  page: React.ReactNode;
  setPage: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  order: order;
  setOrder: React.Dispatch<React.SetStateAction<order>>
}

export interface DataProviderProps {
  children: ReactNode;
}

export interface order {
  product: IProduct | '';
  size: number | '';
  receive: string;
  point: string;
  name: string;
  number: string | '';
}
