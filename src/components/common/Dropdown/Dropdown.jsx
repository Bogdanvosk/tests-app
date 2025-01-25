import PropTypes from 'prop-types';
import cn from 'classnames';

import { useContext, useEffect, useState } from 'react';
import { SelectQuestionContext } from '@/components/pages/Test/Test';

import s from './Dropdown.module.scss';

const Dropdown = ({ options, onSelectQuestionType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState(options);
  const [selectedItem, setSelectedItem] = useState(options[0].value);

  const { selectedQuestion } = useContext(
      SelectQuestionContext
    );

  useEffect(() => {
    selectedQuestion && setSelectedItem(selectedQuestion.question_type);

    !selectedQuestion && setSelectedItem(options[0].value);
  }, [selectedQuestion]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleItemClick = (value) => {
    const questionType = items.find((item) => item.value === value).value;

    setSelectedItem(value);
    setIsOpen(false);
    onSelectQuestionType(questionType);
  };

  return (
    <div className={cn(s.dropdown, { [s.disabled]: selectedQuestion })}>
      <div className={s.header} onClick={toggleDropdown}>
        {items.find((item) => item.value === selectedItem).text}
      </div>
      <div className={cn(s.body, { [s.open]: isOpen })}>
        {items.map((item) => (
          <div
            id={item.value}
            key={item.id}
            className={cn(s.item, {
              [s.selected]: item.value === selectedItem,
            })}
            onClick={(e) => handleItemClick(e.target.id)}
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
      value: PropTypes.string,
    })
  ),
  onSelectQuestionType: PropTypes.func,
};
