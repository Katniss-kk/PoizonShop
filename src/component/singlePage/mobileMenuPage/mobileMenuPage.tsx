import style from './mobileMenuPage.module.css'
import { TelegramButton, UserMenu } from '../../UI'

export default function MobileMenuPage() {
    return (
        <div className={style.page}>
            <UserMenu style={style}/>
            <TelegramButton className={style.topButton} classSpan={style.buttonSpan} logoColor={style.logoColor}/>
        </div>
    )
}