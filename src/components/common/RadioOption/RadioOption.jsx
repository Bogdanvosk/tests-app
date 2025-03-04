import cn from 'classnames';
import { useContext } from 'react';
import PropTypes from 'prop-types';

import { QuestionMetaContext } from '../PassQuestion/PassQuestion';

import s from './RadioOption.module.scss';

const RadioOption = ({ value, title, selected, onChange, incorrect, correct }) => {
  const questionType = useContext(QuestionMetaContext);

  const handleChange = () => {
    if (questionType === 'single') return onChange([value]);
    onChange([...selected, value]);
  };

  const isItemSelected = selected.includes(value) || correct;

  return (
    <div
      className={cn(s.item, {
        [s.selected]: isItemSelected,
        [s.incorrect]: selected && incorrect
      })}
      key={value}
      onClick={handleChange}
    >
      <label className={s.label}>
        {title}
        <span
          className={cn(s.radio, {
            [s.selected]: isItemSelected,
            [s.multiple]: questionType === 'multiple',
            [s.incorrect]: selected && incorrect
          })}
        ></span>
      </label>
    </div>
  );
};

export default RadioOption;

RadioOption.propTypes = {
  value: PropTypes.number,
  title: PropTypes.string,
  selected: PropTypes.arrayOf(PropTypes.number),
  onChange: PropTypes.func,
  incorrect: PropTypes.bool,
  correct: PropTypes.bool
};
