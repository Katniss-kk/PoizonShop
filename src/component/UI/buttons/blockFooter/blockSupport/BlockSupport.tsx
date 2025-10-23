import style from '../BlockFooter.module.css'

export default function BlockSupport() {
    return(
        <div className={style.helpContainer}>
            <h5 className={`${style.text} ${style.title}`}>Служба клиентской поддержки</h5>
            <button className={`${style.text} ${style.helpButton}`}>support@thesortage.com <br />+7(995)788-00-58</button>
            <button className={`${style.text} ${style.helpButton}`}>Звонки принимаются ежедневно <br />с 10:00 до 22:00 по МСК.</button>
        </div>
    )
}