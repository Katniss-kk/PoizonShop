import style from '../BlockFooter.module.css';
import { QuestionsPage, DeliveryPage } from '../../../../singlePage';
import { useData } from '../../../../hooks/dataProvider';

export default function BlockHelp() {
  const { setPage } = useData();

  return (
    <div className={style.helpContainer}>
      <h5 className={`${style.text} ${style.title}`}>Помощь</h5>
      <button
        className={`${style.text} ${style.helpButton}`}
        onClick={() => {
          setPage(<QuestionsPage />);
        }}
      >
        Частые вопросы
      </button>
      <button
        className={`${style.text} ${style.helpButton}`}
        onClick={() => {
          setPage(<DeliveryPage />);
        }}
      >
        Доставка и самовывоз
      </button>
    </div>
  );
}
