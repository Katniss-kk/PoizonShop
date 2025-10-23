import style from "./Header.module.css";
import { TopMenuButton, TelegramButton, Logo, BasketButton } from "../../UI/index";

export default function Header() {
  return (
    <header>
      <Logo className={style.logo}/>
      <TopMenuButton />
      <BasketButton />
      <TelegramButton className={style.topButton} classSpan={style.buttonSpan} logoColor={style.logoColor}/>
    </header>
  );
}
