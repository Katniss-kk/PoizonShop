import style from '../BlockFooter.module.css';
import { useData } from '../../../../hooks/dataProvider';
import {
  ReturnPage,
  PersonalDataPage,
  ConditionsPage,
} from '../../../../singlePage';

export default function BlockInfo() {
  const { setPage } = useData();
  return (
    <div className={style.helpContainer}>
      <h5 className={`${style.text} ${style.title}`}>Политика и условия</h5>
      <button
        className={`${style.text} ${style.helpButton}`}
        onClick={() => {
          setPage(<ReturnPage />);
        }}
      >
        Обмен и возврат
      </button>
      <button
        className={`${style.text} ${style.helpButton}`}
        onClick={() => {
          setPage(<PersonalDataPage />);
        }}
      >
        Политика конфиденциальности
      </button>
      <button
        className={`${style.text} ${style.helpButton}`}
        onClick={() => {
          setPage(<ConditionsPage />);
        }}
      >
        Условия предоставления услуг
      </button>
    </div>
  );
}
