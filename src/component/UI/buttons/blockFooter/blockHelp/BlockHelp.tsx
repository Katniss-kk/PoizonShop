import style from '../BlockFooter.module.css';
import { Link } from 'react-router-dom';

export default function BlockHelp() {
  return (
    <div className={style.helpContainer}>
      <h5 className={`${style.text} ${style.title}`}>Помощь</h5>
      <Link
        to={'PoizonShop/questions'}
        className={`${style.text} ${style.helpButton}`}
      >
        Частые вопросы
      </Link>
      <Link
        to={'PoizonShop/delivery'}
        className={`${style.text} ${style.helpButton}`}
      >
        Доставка и самовывоз
      </Link>
    </div>
  );
}
