import { useContext, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { SortableContext } from '@dnd-kit/sortable';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { SelectQuestionContext } from '@/components/pages/Test/Test';
import {
  CorrectAnswerContext,
  EditingAnswerContext,
} from '../QuestionForm/QuestionForm';
import { useModalContext } from '../ModalProvider/ModalProvider';
import { toastify } from '@/utils/toastify';

import Answer from '../Answer/Answer';
import Input from '../Input/Input';

import s from './AnswersList.module.scss';

const AnswersList = ({
  fields,
  questionType,
  questionStep,
  setAcceptedAction,
}) => {
  const methods = useFormContext();

  const { showModal } = useModalContext();
  const { correctAnswer, setCorrectAnswer } = useContext(CorrectAnswerContext);
  const { selectedQuestion } = useContext(SelectQuestionContext);
  const editingAnswerId = useContext(EditingAnswerContext);

  const isNumberInputVisible = useMemo(() => {
    if (selectedQuestion) return questionType === 'number';

    return questionType === 'number' && questionStep === 2;
  }, [questionStep, questionType, selectedQuestion]);

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
    const answers = methods.getValues().answers;

    if (editingAnswerId === index && correctAnswer !== null) {
      toastify('warning', 'Завершите редактирование ответа');
      methods.setValue(`answers.${index}.is_right`, false);
      return;
    }

    if (questionType === 'single') {
      const oldCorrectAnswerIdx = answers.findIndex((f) => f.is_right === true);

      if (index === oldCorrectAnswerIdx) {
        methods.setValue(`answers.${index}.is_right`, answers[index].is_right);
        return;
      }

      setCorrectAnswer(index);
      methods.setValue(`answers.${index}.is_right`, true);
      methods.setValue(`answers.${oldCorrectAnswerIdx}.is_right`, false);
    }

    if (questionType === 'multiple') {
      methods.setValue(`answers.${index}.is_right`, !answers[index].is_right);
    }
  };

  return (
    <>
      <SortableContext items={fields}>
        {questionType !== 'number' &&
          fields.map((field, index) => {
            return (
              <Answer
                key={field.id}
                field={field}
                fieldIndex={index}
                acceptDeleteAnswer={acceptDeleteAnswer}
                handleChangeCorrectAnswer={handleChangeCorrectAnswer}
              />
            );
          })}
      </SortableContext>

      {isNumberInputVisible && (
        <div className={cn(s.answer, s.number)}>
          <Input
            className={s.input}
            fieldName={`answers.0.text`}
            placeholder='Введите вариант ответа'
          />
        </div>
      )}
    </>
  );
};

export default AnswersList;

AnswersList.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      is_right: PropTypes.bool,
    })
  ),
  questionType: PropTypes.string,
  questionStep: PropTypes.number,
  setAcceptedAction: PropTypes.func,
};
