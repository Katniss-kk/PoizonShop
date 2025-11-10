import style from './blockInfoPages.module.css'
import { ConditionsPageContent } from '../../../constants/ConditionsPageContent'

export default function ConditionsPage() {
  return (
    <div className={style.deliveryContainer}>
      <h1 className={`${style.textStyle} ${style.titleOwner}`}>{ConditionsPageContent.title}</h1>
      <h2 className={`${style.textStyle} ${style.title} ${style.sectionTitle}`}>{ConditionsPageContent.sectionTitle}</h2>
      
      {ConditionsPageContent.sections.map((section, index) => (
        <div key={index} className={style.section}>
          <h3 className={`${style.textStyle} ${style.sectionTitle}`}>{section.title}</h3>
          
          {section.title === 'Реквизиты The Sortage' ? (
            <div className={style.detailsContainer}>
              {Array.isArray(section.content) ? (
                section.content.map((paragraph, idx) => (
                  <div key={idx}>
                    {paragraph}
                  </div>
                ))
              ) : (
                <div className={`${style.textStyle} ${style.mainText}`}>
                  {section.content}
                </div>
              )}
            </div>
          ) : (
            <>
              {Array.isArray(section.content) ? (
                section.content.map((paragraph, idx) => (
                  <p key={idx} className={`${style.textStyle} ${style.mainText}`}>
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className={`${style.textStyle} ${style.mainText}`}>
                  {section.content}
                </p>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  )
}