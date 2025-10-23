import style from '../BlockFooter.module.css'

export default function BlockSupport() {
    return(
        <div className={style.helpContainer}>
            <h5 className={`${style.text} ${style.title}`}>Адреса складов</h5>
            <button className={`${style.text} ${style.helpButton}`}>Москва, Кутузовский проспект 48<br />ТЦ Галереи "Времена Года", 3 этаж.</button>
            <button className={`${style.text} ${style.helpButton}`}>Время работы: ежедневно с 11:00<br />до 22:00.</button>
            <button className={`${style.text} ${style.helpButton}`}>Московская область, деревня Воронки,<br />1 к. 4. ТЦ Архангельское Аутлет.</button>
            <button className={`${style.text} ${style.helpButton}`}>Время работы: ежедневно с 10:00<br />до 22:00.</button>
        </div>
    )
}