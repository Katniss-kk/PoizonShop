import style from './Header.module.css';
import {
  TopMenuButton,
  TelegramButton,
  Logo,
  BasketButton,
} from '../../UI/index';
import { useData } from '../../hooks/dataProvider';

export default function Header() {
  return (
    <header>
      <Logo className={style.logo} />
      <TopMenuButton />
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
