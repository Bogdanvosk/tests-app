import PropTypes from 'prop-types';

import Icon from '../Icon/Icon';
import Input from '../Input/Input';
import SortableItem from '../SortableItem/SortableItem';

import s from './Answer.module.scss';

const Answer = ({
  field,
  index,
  acceptDeleteAnswer,
  handleChangeCorrectAnswer,
}) => {
  const onChangeCorrectAnswer = () => {
    handleChangeCorrectAnswer(index);
  };

  const onDeleteAnswer = () => {
    acceptDeleteAnswer(index);
  };

  return (
    <SortableItem field={field} key={field.id}>
      <div className={s.answer}>
        <Input
          className={s.input}
          type='text'
          fieldName={`answers.${index}.text`}
          placeholder='Введите вариант ответа'
        />

        <Input
          type='checkbox'
          fieldName={`answers.${index}.is_right`}
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
