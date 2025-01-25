import { SortableContext } from '@dnd-kit/sortable';

import Answer from '../Answer/Answer';
import Input from '../Input/Input';

import s from './AnswersList.module.scss';
import { useFormContext } from 'react-hook-form';

const AnswersList = ({
  fields,
  questionType,
  questionStep,
  correctAnswer,
  setCorrectAnswer,
}) => {
  const methods = useFormContext();

  const handleIsAccepted = (value) => {
    setAcceptedAction(value);
  };

  const acceptDeleteAnswer = (index) => {
    showModal('accept', {
      handleIsAccepted,
      actionValue: 'delete-answer',
      id: index,
    });
  };

  const handleChangeCorrectAnswer = (index) => {
    if (questionStep === 2 && correctAnswer !== null) {
      alert('Нельзя изменить правильный ответ');
      return;
    }

    if (questionType === 'single') {
      const oldCorrectAnswerIdx = fields.findIndex((f) => f.is_right === true);

      setCorrectAnswer(index);
      methods.setValue(`answers.${index}.is_right`, true);
      methods.setValue(`answers.${oldCorrectAnswerIdx}.is_right`, false);
    }

    if (questionType === 'multiple') {
      methods.setValue(`answers.${index}.is_right`, !fields[index].is_right);
    }
  };

  return (
    <>
      <SortableContext items={fields}>
        {questionType === 'single' &&
          fields.map((field, index) => {
            return (
              <Answer
                key={field.id}
                field={field}
                index={index}
                acceptDeleteAnswer={acceptDeleteAnswer}
                handleChangeCorrectAnswer={handleChangeCorrectAnswer}
              />
            );
          })}

        {questionType === 'multiple' &&
          fields.map((field, index) => {
            return (
              <Answer
                key={field.id}
                field={field}
                index={index}
                acceptDeleteAnswer={acceptDeleteAnswer}
                handleChangeCorrectAnswer={handleChangeCorrectAnswer}
              />
            );
          })}
      </SortableContext>

      {questionType === 'number' && (
        <div className={cn(s.answer, s.number)} key={fields[0].id}>
          <Input
            className={s.input}
            type='number'
            fieldName={`answers.0.text`}
            placeholder='Введите вариант ответа'
          />
        </div>
      )}
    </>
  );
};

export default AnswersList;
