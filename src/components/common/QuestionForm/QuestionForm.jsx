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
  updateAnswerAction,
  updatePositionAction,
  updateQuestionAction,
} from '@/store/features/test';

import Input from '../Input/Input';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import SortableItem from '../SortableItem/SortableItem';

import s from './QuestionForm.module.scss';

// TODO: добавить toaster для уведомлений валидации/создания/обновления вопросов и ответов

const QuestionForm = ({ questionType, selectedQuestion, onCloseForm }) => {
  const [questionStep, setQuestionStep] = useState(1);
  const [isAnswerEditing, setIsAnswerEditing] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [isPositionChanged, setIsPositionChanged] = useState(false);

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
      update(-1, selectedQuestion.answers);

      const correctAnswer = selectedQuestion.answers.findIndex(
        (a) => a.is_right
      );
      setCorrectAnswer(correctAnswer);
    }
  }, [selectedQuestion]);

  const handleSubmit = methods.handleSubmit((data) => {
    if (selectedQuestion) {
      const oldTitle = selectedQuestion.title;
      const oldAnswersSet = new Set(selectedQuestion.answers);
      const newAnswersSet = new Set(data.answers);

      const isAnswersChanged =
        JSON.stringify(selectedQuestion.answers) !==
        JSON.stringify(data.answers);

      if (oldTitle !== data.title) {
        dispatch(
          updateQuestionAction({
            questionId: selectedQuestion.id,
            title: data.title,
            question_type: selectedQuestion.question_type,
          })
        );
      }

      // Определяю, есть ли изменения в ответах и патчу ответы
      if (
        isAnswersChanged &&
        data.answers.length === selectedQuestion.answers.length
      ) {
        if (oldAnswersSet.size === newAnswersSet.size && isPositionChanged) {
          resetForm();
          return;
        }

        data.answers.forEach((_, index) => {
          const newAnswer = data.answers[index];
          const oldAnswer = selectedQuestion.answers[index];

          if (
            oldAnswer.text !== newAnswer.text ||
            oldAnswer.is_right !== newAnswer.is_right
          ) {
            dispatch(
              updateAnswerAction({
                answerId: oldAnswer.id,
                questionId: selectedQuestion.id,
                newData: newAnswer,
              })
            );
          }
        });
      }

      // ? Нужно ли закрывать форму
      resetForm();
      return;
    }

    if (questionStep === 1 && questionType !== 'number')
      handleCreateQuestion(data);

    if (questionType === 'number') console.log(data); // TODO: add question with type "number" (api call)
  });

  const handleCreateQuestion = (data) => {
    const title = data.title;

    dispatch(
      addNewQuestionAction({
        title,
        question_type: questionType,
        answer: 1,
        testId: test.id,
      })
    );

    setQuestionStep(2);
  };

  const handleAppendAnswer = () => {
    if (questionType !== 'number') {
      append({ text: '', is_right: false });
    }

    setIsAnswerEditing(true);
  };

  const handleCreateAnswer = () => {
    const questionId = !selectedQuestion
      ? test.questions[test.questions.length - 1].id
      : selectedQuestion.id;
    const allAnswers = methods.getValues().answers;
    const newAnswer = allAnswers[allAnswers.length - 1];

    if (newAnswer.text === '') {
      alert('Введите текст ответа');
      return;
    }

    dispatch(
      addAnswerAction({
        questionId,
        answer: newAnswer,
      })
    );
    setIsAnswerEditing(false);
  };

  const handleDeleteAnswer = (id) => {
    if (methods.getValues().answers.length < 3) {
      alert(
        'Нельзя удалить вопрос, если количество вариантов ответа не менее 3'
      );
      return;
    }

    const index = fields.findIndex((f, idx) => idx === id);
    remove(id);
    if (index === correctAnswer) setCorrectAnswer(null);

    if (index < correctAnswer) setCorrectAnswer(correctAnswer - 1);

    if (selectedQuestion) {
      const answerId = selectedQuestion.answers[id].id;

      dispatch(
        deleteAnswerAction({
          questionId: selectedQuestion.id,
          answerId,
        })
      );
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    const field = fields.find((f) => f.id === active.id);

    const answerId = selectedQuestion.answers.find(
      (a) => a.text === field.text
    ).id;

    if (over == null) {
      return;
    }
    if (active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);

      dispatch(
        updatePositionAction({
          questionId: selectedQuestion.id,
          position: newIndex,
          answerId,
        })
      );
      move(oldIndex, newIndex);

      // Присваиваю корректный индекс правильного ответа
      if (correctAnswer === oldIndex) setCorrectAnswer(newIndex);
      if (correctAnswer === newIndex) setCorrectAnswer(oldIndex);

      if (correctAnswer >= newIndex && correctAnswer < oldIndex) {
        setCorrectAnswer(correctAnswer + 1);
      } else if (correctAnswer <= newIndex && correctAnswer > oldIndex) {
        setCorrectAnswer(correctAnswer - 1);
      }

      setIsPositionChanged(true);
    }
  };

  // TODO: style validation
  const handleValidate = () => {
    if (questionStep === 1 && !selectedQuestion) {
      return true;
    }

    if (questionType === 'single' || questionType === 'multiple') {
      if (fields.length < 2) {
        alert('Добавьте хотя бы два варианта ответа');
        return false;
      }

      if (correctAnswer === null) {
        alert('Выберите правильный ответ');
        return false;
      }

      return true;
    }

    if (questionType === 'number') {
      // TODO: add validation for "number"
    }
  };

  const resetForm = () => {
    setQuestionStep(1);
    setCorrectAnswer(null);
    methods.reset();
    onCloseForm();
  };

  const handleCloseForm = () => {
    if (handleValidate()) {
      if (!selectedQuestion) {
        resetForm();
      } else {
        handleSubmit();
      }
    }
  };

  const handleChangeCorrectAnswer = (field, index) => {
    const oldCorrectAnswerIdx = fields.findIndex((f) => f.is_right === true);

    setCorrectAnswer(index);
    methods.setValue(`answers.${index}.is_right`, true);
    methods.setValue(`answers.${oldCorrectAnswerIdx}.is_right`, false);
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
                          checked={correctAnswer === index}
                          onClick={() =>
                            handleChangeCorrectAnswer(field, index)
                          }
                        />
                        <div
                          onClick={() => {
                            handleDeleteAnswer(index);
                          }}
                        >
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

          {questionStep === 1 && !selectedQuestion && (
            <Button className={s.button} type='submit'>
              {selectedQuestion ? 'Сохранить вопрос' : 'Создать вопрос'}
            </Button>
          )}

          {(questionStep === 2 || selectedQuestion) && (
            <Button
              className={s.button}
              type='button'
              onClick={
                isAnswerEditing ? handleCreateAnswer : handleAppendAnswer
              }
            >
              {isAnswerEditing ? 'Создать ответ' : 'Добавить вариант ответа'}
            </Button>
          )}

          <Button
            className={cn(s.button, {
              [s.cancel]: questionStep === 1 && !selectedQuestion,
            })}
            onClick={handleCloseForm}
          >
            {questionStep === 1 && !selectedQuestion ? 'Отмена' : 'Готово'}
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
