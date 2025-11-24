import style from '../BlockFooter.module.css';
import { Link } from 'react-router-dom';

export default function BlockInfo() {
  return (
    <div className={style.helpContainer}>
      <h5 className={`${style.text} ${style.title}`}>Политика и условия</h5>
      <Link
        to={'/return'}
        className={`${style.text} ${style.helpButton}`}
      >
        Обмен и возврат
      </Link>
      <Link
        to={'/personal'}
        className={`${style.text} ${style.helpButton}`}
      >
        Политика конфиденциальности
      </Link>
      <Link
        to={'/conditions'}
        className={`${style.text} ${style.helpButton}`}
      >
        Условия предоставления услуг
      </Link>
    </div>
  );
}
