import PropTypes from 'prop-types';
import cn from 'classnames';
import { DndContext } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';

import { FormProvider, set, useFieldArray, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentTest } from '@/store/features/test/selectors';
import {
  addAnswerAction,
  addNewQuestionAction,
  deleteAnswerAction,
  updateQuestionAction,
} from '@/store/features/test';

import Input from '../Input/Input';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import SortableItem from '../SortableItem/SortableItem';

import s from './QuestionForm.module.scss';

const QuestionForm = ({ questionType, selectedQuestion, onCloseForm }) => {
  const [questionStep, setQuestionStep] = useState(1);
  const [isAnswerEditing, setIsAnswerEditing] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const test = useSelector(selectCurrentTest);
  const dispatch = useDispatch();

  const methods = useForm({
    defaultValues: {
      title: '',
      answers: [],
    },
  });

  const { fields, append, remove, move, update } = useFieldArray({
    control: methods.control,
    name: 'answers',
  });

  useEffect(() => {
    methods.reset();
    setCorrectAnswer(null);
  }, [questionType]);

  useEffect(() => {
    if (selectedQuestion) {
      methods.setValue('title', selectedQuestion.title);
      methods.setValue('answers', selectedQuestion.answers);
      update('answers', selectedQuestion.answers);
    }
  }, [selectedQuestion]);

  const handleSubmit = methods.handleSubmit((data) => {
    if (selectedQuestion) {
      dispatch(
        updateQuestionAction({
          questionId: selectedQuestion.id,
          title: data.title,
          question_type: selectedQuestion.question_type,
        })
      );
      return;
    }

    // TODO: Validation
    if (questionType === 'single') {
      const title = data.title;
      const answers = data.answers.map((answer, idx) => {
        return {
          text: answer.text,
          is_right: correctAnswer === fields[idx].id,
        };
      });

      dispatch(
        addNewQuestionAction({
          title,
          question_type: questionType,
          answer: 1,
          answers,
          testId: test.id,
        })
      );

      setQuestionStep(2);
    }

    if (questionType === 'multiple') console.log(data); // TODO: add question with type "multiple" (api call)

    if (questionType === 'number') console.log(data); // TODO: add question with type "number" (api call)
  });

  const handleChangeCorrectAnswer = (id) => {
    setCorrectAnswer(id);
  };

  const handleAddAnswer = () => {
    if (questionType !== 'number' || fields.length < 1) {
      append({ text: '', is_right: false });
    }
    setIsAnswerEditing(true);
  };

  const handleCreateAnswer = () => {
    const questionId = test.questions[test.questions.length - 1].id;
    const allAnswers = methods.getValues().answers;
    const newAnswer = allAnswers[allAnswers.length - 1];

    dispatch(
      addAnswerAction({
        questionId,
        answer: newAnswer,
      })
    );
    setIsAnswerEditing(false);
  };

  const handleDeleteAnswer = (id) => {
    remove(id);
    const answerId = selectedQuestion.answers[id].id;

    dispatch(
      deleteAnswerAction({
        questionId: selectedQuestion.id,
        answerId,
      })
    );
  };
  // TODO: add changing position field of answer in API
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over == null) {
      return;
    }
    if (active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      move(oldIndex, newIndex);
    }
  };

  const handleCloseForm = () => {
    setQuestionStep(1);
    setCorrectAnswer(null);
    methods.reset();
    onCloseForm();
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <FormProvider {...methods}>
        <form className={s.form} onSubmit={handleSubmit}>
          <Input
            className={cn(s.input, s.text)}
            type='text'
            fieldName='title'
            placeholder='Введите вопрос'
          />

          <div className={s.answers}>
            <SortableContext items={fields}>
              {questionType === 'multiple' &&
                fields.map((field, index) => {
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
                          className={s.checkbox}
                          type='checkbox'
                          fieldName={`answers.${index}.is_right`}
                          defaultChecked={field.is_right}
                        />
                        <div onClick={() => handleDeleteAnswer(index)}>
                          <Icon name='delete' className={s.delete} />
                        </div>
                      </div>
                    </SortableItem>
                  );
                })}

              {questionType === 'single' &&
                fields.map((field, index) => {
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
                          className={s.checkbox}
                          type='checkbox'
                          fieldName={`answers.${index}.is_right`}
                          checked={correctAnswer === field.id}
                          onClick={() => handleChangeCorrectAnswer(field.id)}
                        />
                        <div onClick={() => handleDeleteAnswer(index)}>
                          <Icon name='delete' className={s.delete} />
                        </div>
                      </div>
                    </SortableItem>
                  );
                })}
            </SortableContext>

            {questionType === 'number' &&
              fields.map((field, index) => {
                return (
                  <div className={cn(s.answer, s.number)} key={field.id}>
                    <Input
                      className={s.input}
                      type='number'
                      fieldName={`answers.${index}.text`}
                      placeholder='Введите вариант ответа'
                    />
                  </div>
                );
              })}
          </div>

          {questionStep === 1 && (
            <div>
              <Button className={s.button} type='submit'>
                {selectedQuestion ? 'Сохранить вопрос' : 'Создать вопрос'}
              </Button>
              {/* {methods.formState.errors && <p>Error</p>} */}
            </div>
          )}
          {questionStep === 2 && (
            <Button
              className={s.button}
              type='button'
              onClick={isAnswerEditing ? handleCreateAnswer : handleAddAnswer}
            >
              {isAnswerEditing ? 'Создать ответ' : 'Добавить вариант ответа'}
            </Button>
          )}
          <Button className={cn(s.button, s.cancel)} onClick={handleCloseForm}>
            Отмена
          </Button>
        </form>
      </FormProvider>
    </DndContext>
  );
};

export default QuestionForm;

QuestionForm.propTypes = {
  questionType: PropTypes.oneOf(['single', 'multiple', 'number']),
  selectedQuestion: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    question_type: PropTypes.string,
    answer: PropTypes.number,
    answers: PropTypes.arrayOf(PropTypes.object),
  }),
  onUpdateQuestion: PropTypes.func,
};
