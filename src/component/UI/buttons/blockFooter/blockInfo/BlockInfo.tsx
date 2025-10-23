import style from '../BlockFooter.module.css'

export default function BlockInfo() {
    return(
        <div className={style.helpContainer}>
            <h5 className={`${style.text} ${style.title}`}>Политика и условия</h5>
            <button className={`${style.text} ${style.helpButton}`}>Обмен и возврат</button>
            <button className={`${style.text} ${style.helpButton}`}>Политика конфиденциальности</button>
            <button className={`${style.text} ${style.helpButton}`}>Условия предоставления услуг</button>
        </div>
    )
}