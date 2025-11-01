import style from './Header.module.css';
import {
  TopMenuButton,
  TelegramButton,
  Logo,
  BasketButton,
} from '../../UI/index';
import type { topMenuProps } from '../../types';

export default function Header({ setPage }: topMenuProps) {
  return (
    <header>
      <Logo className={style.logo} setPage={setPage} />
      <TopMenuButton setPage={setPage} />
      <div className={style.headerContainer}>
        <BasketButton />
        <TelegramButton
          className={style.topButton}
          classSpan={style.buttonSpan}
          logoColor={style.logoColor}
        />
      </div>
    </header>
  );
}
