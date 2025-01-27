import PropTypes from 'prop-types';

import { useContext } from 'react';
import { editingAnswerContext } from '../QuestionForm/QuestionForm';

import Icon from '../Icon/Icon';
import Input from '../Input/Input';
import SortableItem from '../SortableItem/SortableItem';

import s from './Answer.module.scss';

const Answer = ({
  field,
  fieldIndex = 0,
  acceptDeleteAnswer = () => {},
  handleChangeCorrectAnswer = () => {},
}) => {
  // const editingAnswerId = useContext(editingAnswerContext);

  const onChangeCorrectAnswer = () => {
    handleChangeCorrectAnswer(fieldIndex);
  };

  const onDeleteAnswer = () => {
    acceptDeleteAnswer(fieldIndex);
  };

  // if (editingAnswerId === fieldIndex)
  //   return (
  //     <div className={s.answer}>
  //       <Input
  //         className={s.input}
  //         type='text'
  //         fieldName={`answers.${fieldIndex}.text`}
  //         placeholder='Введите вариант ответа'
  //       />

  //     </div>
  //   );

  return (
    <SortableItem field={field} key={field.id}>
      <div className={s.answer}>
        <Input
          className={s.input}
          type='text'
          fieldName={`answers.${fieldIndex}.text`}
          placeholder='Введите вариант ответа'
        />

        <Input
          type='checkbox'
          fieldName={`answers.${fieldIndex}.is_right`}
          onClick={onChangeCorrectAnswer}
        />

        <div onClick={onDeleteAnswer}>
          <Icon id='delete' name='delete' className={s.delete} />
        </div>
      </div>
    </SortableItem>
  );
};

export default Answer;

Answer.propTypes = {
  field: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    is_right: PropTypes.bool,
  }),
  index: PropTypes.number,
  acceptDeleteAnswer: PropTypes.func,
  handleChangeCorrectAnswer: PropTypes.func,
};
