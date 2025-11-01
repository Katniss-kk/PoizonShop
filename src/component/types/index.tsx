import type { ReactElement } from 'react';

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
  children?: React.ReactNode;
};

export interface IBrandSize {
  name: string;
  value: number
}