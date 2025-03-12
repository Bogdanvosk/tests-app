import PropTypes from 'prop-types';

import Icon from '../Icon/Icon';
import FormInput from '../FormInput/FormInput';
import SortableItem from '../SortableItem/SortableItem';
import Button from '../Button/Button';

import s from './Answer.module.scss';

const Answer = ({ field, fieldIndex = 0, acceptDeleteAnswer, handleChangeCorrectAnswer }) => {
  const onChangeCorrectAnswer = () => {
    handleChangeCorrectAnswer(fieldIndex);
  };

  const onDeleteAnswer = () => {
    acceptDeleteAnswer(fieldIndex);
  };

  return (
    <SortableItem field={field} key={field.id}>
      <div className={s.answer}>
        <FormInput
          className={s.input}
          type='text'
          fieldName={`answers.${fieldIndex}.text`}
          placeholder='Введите вариант ответа'
        />

        <FormInput
          type='checkbox'
          fieldName={`answers.${fieldIndex}.is_right`}
          onClick={onChangeCorrectAnswer}
        />

        <Button className={s.deleteButton} onClick={onDeleteAnswer}>
          <Icon id='delete' name='delete' className={s.delete} />
        </Button>
      </div>
    </SortableItem>
  );
};

export default Answer;

Answer.propTypes = {
  field: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    is_right: PropTypes.bool
  }),
  index: PropTypes.number,
  acceptDeleteAnswer: PropTypes.func,
  handleChangeCorrectAnswer: PropTypes.func
};
