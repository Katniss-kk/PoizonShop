import style from './blockInfoPages.module.css';
import { PersonalDataContent } from '../../../constants/PersonalDataContent';

export default function PersonalDataPage() {
  return (
    <div className={style.deliveryContainer}>
      <h1 className={`${style.textStyle} ${style.titleOwner}`}>
        {PersonalDataContent.title}
      </h1>
      <h2 className={`${style.textStyle} ${style.title} ${style.sectionTitle}`}>
        {PersonalDataContent.sectionTitle}
      </h2>
      <div className={style.personalBlock}>
        {PersonalDataContent.sections.map((section, index) => (
          <div key={index}>
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
          </div>
        ))}
      </div>
    </div>
  );
}
