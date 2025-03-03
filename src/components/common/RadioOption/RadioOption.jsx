import cn from 'classnames';
import { useContext } from 'react';

import { QuestionMetaContext } from '../PassQuestion/PassQuestion';

import s from './RadioOption.module.scss';

const RadioOption = ({ value, title, selected, onChange, incorrect, correct }) => {
  const questionType = useContext(QuestionMetaContext);

  const handleChange = () => {
    if (questionType === 'single') return onChange(value);
    if (selected.includes(value)) return onChange(selected.filter(item => item !== value));
    onChange([...selected, value]);
  };

  const selectedItem =
    (questionType === 'single' ? selected === value : selected.includes(value)) || correct;

  return (
    <div
      className={cn(s.item, {
        [s.selected]: selectedItem,
        [s.incorrect]: selected && incorrect
      })}
      key={value}
      onClick={handleChange}
    >
      <label className={s.label} htmlFor={`radio__${title}`}>
        {title}
        <span
          className={cn(s.radio, {
            [s.selected]: selectedItem,
            [s.multiple]: questionType === 'multiple',
            [s.incorrect]: selected && incorrect
          })}
        ></span>
      </label>
    </div>
  );
};

export default RadioOption;
