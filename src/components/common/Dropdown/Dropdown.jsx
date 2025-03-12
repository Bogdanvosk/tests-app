import { useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { QuestionTypeContext, SelectQuestionContext } from '@/components/pages/Test/Test';
import Button from '../Button/Button';

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

  const handleItemClick = value => {
    const newQuestionType = options.find(item => item.value === value).value;

    setSelectedItem(value);
    setIsOpen(false);
    onSelectOption(newQuestionType);
  };

  const option = useMemo(
    () => options.find(item => item.value === selectedItem).text,
    [options, selectedItem]
  );

  return (
    <div className={cn(s.dropdown, { [s.selected]: selectedQuestion })}>
      <Button className={s.header} onClick={toggleDropdown}>
        {option}
      </Button>
      <div className={cn(s.body, { [s.open]: isOpen })}>
        {options.map(item => (
          <Button
            id={item.value}
            key={item.id}
            className={cn(s.item, {
              [s.selected]: item.value === selectedItem
            })}
            onClick={() => handleItemClick(item.value)}
          >
            {item.text}
          </Button>
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
