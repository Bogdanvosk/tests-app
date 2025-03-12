import { useContext } from 'react';
import PropTypes from 'prop-types';

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
    if (questionType === 'single' && selected.length && correctAnswersIds.length) {
      if (selected[0] === correctAnswersIds[0]) return false;
      if (selected[0] !== correctAnswersIds[0] && selected[0] === id) return true;
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

RadioGroup.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
      is_right: PropTypes.bool
    })
  ),
  selected: PropTypes.arrayOf(PropTypes.number),
  onChange: PropTypes.func,
  isQuestionPassed: PropTypes.bool
};
