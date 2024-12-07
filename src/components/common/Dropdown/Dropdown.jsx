import PropTypes from 'prop-types';
import cn from 'classnames';

import { useState } from 'react';

import s from './Dropdown.module.scss';

const Dropdown = ({ options, onSelectQuestionType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItem] = useState(options);
  const [selectedItem, setSelectedItem] = useState(options[0].id);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleItemClick = (id) => {
    const questionType = items.find((item) => item.id === id).value;

    setSelectedItem(id);
    setIsOpen(false);
    onSelectQuestionType(questionType);
  };

  return (
    <div className={s.dropdown}>
      <div className={s.header} onClick={toggleDropdown}>
        {items.find((item) => item.id === selectedItem).text}
      </div>
      <div className={cn(s.body, { [s.open]: isOpen })}>
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(s.item, { [s.selected]: item.id === selectedItem })}
            onClick={(e) => handleItemClick(e.target.id)}
            id={item.id}
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
