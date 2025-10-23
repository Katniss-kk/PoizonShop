import style from '../BlockFooter.module.css'

export default function BlockHelp() {
    return(
        <div className={style.helpContainer}>
            <h5 className={`${style.text} ${style.title}`}>Помощь</h5>
            <button className={`${style.text} ${style.helpButton}`}>Частые вопросы</button>
            <button className={`${style.text} ${style.helpButton}`}>Доставка и самовывоз</button>
        </div>
    )
}