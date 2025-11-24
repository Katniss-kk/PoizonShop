import style from './Header.module.css';
import {
  UserMenu,
  TelegramButton,
  Logo,
  BasketButton,
  MobileMenu,
} from '../../UI/index';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <div className={style.logoMenuContainer}>
        <Link to={'PoizonShop/'}>
          <Logo className={style.logo} />
        </Link>
        <UserMenu style={style} />
      </div>
      <div className={style.headerContainer}>
        {/* <BasketButton /> */}
        <MobileMenu />
        <TelegramButton
          className={style.topButton}
          classSpan={style.buttonSpan}
          logoColor={style.logoColor}
        />
      </div>
    </header>
  );
}
