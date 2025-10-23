import style from "./TopMenuButton.module.css";

export default function TopMenuButton() {
  return (
    <menu className={style.menu}>
      <button className={style.menuButton}>Одежда</button>
      <button className={style.menuButton}>Обувь</button>
      <button className={style.menuButton}>Аксессуары</button>
      <button className={style.menuButton}>Калькулятор стоимости</button>
      <button className={style.menuButton}>Помощь</button>
      <button className={style.menuButton}>Мы на картах</button>
    </menu>
  );
}
