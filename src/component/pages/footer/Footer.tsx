import style from './Footer.module.css';
import {
  BlockHelp,
  BlockAddress,
  BlockInfo,
  BlockSupport,
  TelegramButton,
} from '../../UI/index';

export default function Footer() {
  return (
    <footer>
      <BlockHelp />
      <BlockInfo />
      <BlockSupport />
      <BlockAddress />
      <TelegramButton
        className={style.botButton}
        classSpan={style.buttonSpan}
        logoColor={style.logoColor}
      />
    </footer>
  );
}
