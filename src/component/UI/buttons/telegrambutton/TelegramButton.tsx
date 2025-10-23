import style from './TelegramButton.module.css';
import Logo from '../../logo/Logo';

export default function TelegramButton({ className = '', classSpan = '', logoColor = '' }) {
  return (
    <>
      <button className={`${style.button} ${className}`}>
        <Logo className={`${style.logo} ${logoColor}`} />
        Наш телеграм канал
        <span className={`${style.spanButton} ${classSpan}`}>
          Telegram web app
        </span>
      </button>
    </>
  );
}
