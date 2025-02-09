import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { QuestionTypeContext, SelectQuestionContext } from '@/components/pages/Test/Test';

import s from './Dropdown.module.scss';

const Dropdown = ({ options, onSelectOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(options[0].value);

  const { selectedQuestion } = useContext(SelectQuestionContext);
  const { questionType } = useContext(QuestionTypeContext);

  useEffect(() => {
    setSelectedItem(questionType);
  }, [questionType]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleItemClick = ({ target }) => {
    const id = target.id;

    const newQuestionType = options.find(item => item.value === id).value;

    setSelectedItem(id);
    setIsOpen(false);
    onSelectOption(newQuestionType);
  };

  return (
    <div className={cn(s.dropdown, { [s.selected]: selectedQuestion })}>
      <div className={s.header} onClick={toggleDropdown}>
        {options.find(item => item.value === selectedItem).text}
      </div>
      <div className={cn(s.body, { [s.open]: isOpen })}>
        {options.map(item => (
          <div
            id={item.value}
            key={item.id}
            className={cn(s.item, {
              [s.selected]: item.value === selectedItem
            })}
            onClick={handleItemClick}
          >
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      value: PropTypes.string
    })
  ),
  onSelectOption: PropTypes.func
};
