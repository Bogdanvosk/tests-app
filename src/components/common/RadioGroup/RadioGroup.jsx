import { useContext } from 'react';

import { QuestionMetaContext } from '../PassQuestion/PassQuestion';

import RadioOption from '../RadioOption/RadioOption';

import s from './RadioGroup.module.scss';

const RadioGroup = ({ options, selected, onChange, isQuestionPassed }) => {
  const questionType = useContext(QuestionMetaContext);

  const handleChange = value => {
    if (isQuestionPassed) return;
    onChange(value);
  };

  const setIncorrect = id => {
    const correctAnswersIds = options.filter(a => a.is_right).map(a => a.id);
    if (questionType === 'single') {
      if (selected === correctAnswersIds[0]) return false;
      if (selected !== correctAnswersIds[0] && selected === id) return true;
    }
    if (questionType === 'multiple') {
      if (selected.includes(id) && !correctAnswersIds.includes(id)) return true;
    }
  };

  return (
    <div className={s.group}>
      {options.map(option => {
        const isIncorrect = isQuestionPassed && setIncorrect(option.id);
        const isCorrect = isQuestionPassed && option.is_right;
        return (
          <RadioOption
            key={option.id}
            value={option.id}
            title={option.text}
            selected={selected}
            onChange={handleChange}
            incorrect={isIncorrect}
            correct={isCorrect}
          />
        );
      })}
    </div>
  );
};

export default RadioGroup;
