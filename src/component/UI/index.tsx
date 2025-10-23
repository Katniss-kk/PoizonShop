export { default as TopMenuButton } from './buttons/topmenubutton/TopMenuButton';
export { default as TelegramButton } from './buttons/telegrambutton/TelegramButton';
export { default as Logo } from './logo/Logo';
export { default as BasketButton } from './buttons/basketbutton/BasketButton';
export { default as BlockHelp } from './buttons/blockFooter/blockHelp/BlockHelp';
export { default as BlockAddress } from './buttons/blockFooter/blockAddress/BlockAddress';
export { default as BlockInfo } from './buttons/blockFooter/blockInfo/BlockInfo';
export { default as BlockSupport } from './buttons/blockFooter/blockSupport/BlockSupport';
export { default as CardCarousel } from './cards/cardCarousel/CardCarousel';

export interface IProduct {
  type: string;
  title: string;
  img: string[];
  brand: string;
  size: string[] | number[];
  price: string;
}