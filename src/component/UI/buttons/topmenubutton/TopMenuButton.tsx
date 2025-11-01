import style from './TopMenuButton.module.css';
import type { topMenuProps } from '../../../types';
import { PageItems } from '../../../singlePage';

import { DataShoes } from '../../../../../public/DataProductShoes';

export default function TopMenuButton({ setPage }: topMenuProps) {
  return (
    <menu className={style.menu}>
      <button
        className={style.menuButton}
        onClick={() =>
          setPage(
            <PageItems
              items={DataShoes}
              title={'Одежда'}
              catalog={'Главная / Одежда'}
            />
          )
        }
      >
        Одежда
      </button>
      <button
        className={style.menuButton}
        onClick={() =>
          setPage(
            <PageItems
              items={DataShoes}
              title={'Обувь'}
              catalog={'Главная / Обувь'}
            />
          )
        }
      >
        Обувь
      </button>
      <button
        className={style.menuButton}
        onClick={() =>
          setPage(
            <PageItems
              items={DataShoes}
              title={'Аксессуары'}
              catalog={'Главная / Аксессуары'}
            />
          )
        }
      >
        Аксессуары
      </button>
      <button className={style.menuButton}>Калькулятор стоимости</button>
      <button className={style.menuButton}>Помощь</button>
      <button className={style.menuButton}>Мы на картах</button>
    </menu>
  );
}
