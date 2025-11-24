import { Link } from 'react-router-dom';
import type { UserMenu } from '../../../types';

export default function UserMenu({ style }: UserMenu) {
  return (
    <menu className={style.menu}>
      <Link to="/cloth" className={style.menuButton}>
        Одежда
      </Link>

      <Link to="/shoes" className={style.menuButton}>
        Обувь
      </Link>

      <Link to="/accessories" className={style.menuButton}>
        Аксессуары
      </Link>

      <button className={style.menuButton}>Калькулятор стоимости</button>
      <button className={style.menuButton}>Помощь</button>
      <button className={style.menuButton}>Мы на картах</button>
    </menu>
  );
}
