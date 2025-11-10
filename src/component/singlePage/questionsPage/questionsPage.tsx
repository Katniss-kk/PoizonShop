import style from './questionsPage.module.css';
import { QuestionsPageContent } from '../../../constants/QuestionsPageContent';
import { useState } from 'react';

export default function QuestionsPage() {
  const [selectedButton, setSelectedButton] = useState<number | null>(null);

  const handleButtonClick = (index: number) => {
    setSelectedButton(selectedButton === index ? null : index);
  };

  return (
    <div className={style.pageContainer}>
      <h1 className={style.title}>{QuestionsPageContent.title}</h1>
      <div className={style.questionsContainer}>
        {QuestionsPageContent.questions.map((item, index) => (
          <div key={index} className={style.questionItem}>
            <button
              className={`${style.button} ${
                selectedButton === index ? style.buttonActive : ''
              }`}
              onClick={() => handleButtonClick(index)}
            >
              <span className={style.buttonText}>{item.question}</span>
              <svg
                width="18"
                height="10"
                viewBox="0 0 18 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${style.arrowSvg} ${
                  selectedButton === index ? style.arrowSvgRotate : ''
                }`}
              >
                <path d="M8.57101 9.5C8.11753 9.49991 7.68266 9.33338 7.36204 9.03703L0.522043 2.71664C0.358721 2.57088 0.228449 2.39653 0.13883 2.20375C0.0492101 2.01097 0.00203759 1.80363 6.45645e-05 1.59383C-0.00190846 1.38402 0.0413571 1.17596 0.127337 0.981769C0.213318 0.787581 0.340291 0.611161 0.500847 0.462801C0.661404 0.314441 0.852329 0.197114 1.06248 0.117666C1.27263 0.0382168 1.49781 -0.00176348 1.72486 5.96577e-05C1.95191 0.0018828 2.1763 0.0454718 2.38492 0.128283C2.59355 0.211094 2.78224 0.331471 2.93998 0.482386L8.57101 5.68565L14.202 0.482386C14.5246 0.194559 14.9565 0.0352938 15.4049 0.0388939C15.8532 0.0424941 16.2821 0.208671 16.5992 0.501634C16.9162 0.794597 17.096 1.19091 17.0999 1.6052C17.1038 2.0195 16.9315 2.41863 16.62 2.71664L9.77998 9.03703C9.45937 9.33338 9.0245 9.49991 8.57101 9.5Z" />
              </svg>
            </button>
              {selectedButton === index && (
                  <p className={style.answerText}>{item.answer}</p>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}
