import PropTypes from 'prop-types';
import cn from 'classnames';
import { DndContext } from '@dnd-kit/core';

import {
  QuestionTypeContext,
  SelectQuestionContext,
} from '@/components/pages/Test/Test';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentTest } from 'store/features/test/selectors';
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
import AnswersList from '../AnswersList/AnswersList';

import s from './QuestionForm.module.scss';

// TODO: добавить toaster для уведомлений валидации/создания/обновления вопросов и ответов

const QuestionForm = ({ onCloseForm }) => {
  const [questionStep, setQuestionStep] = useState(1);
  const [isAnswerEditing, setIsAnswerEditing] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [acceptedAction, setAcceptedAction] = useState(null);

  const { selectedQuestion } = useContext(SelectQuestionContext);
  const { questionType } = useContext(QuestionTypeContext);

  const test = useSelector(selectCurrentTest);
  const dispatch = useDispatch();

  const firstStep = useMemo(
    () => questionStep === 1 && !selectedQuestion,
    [questionStep, selectedQuestion]
  );

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
    if (selectedQuestion) {
      methods.reset({
        title: selectedQuestion.title,
        answers: selectedQuestion.answers,
      });
      update(-1, selectedQuestion.answers);

      const correctAnswer = selectedQuestion.answers.findIndex(
        (a) => a.is_right
      );
      setCorrectAnswer(correctAnswer);
    }
  }, [selectedQuestion]);

  useEffect(() => {
    if (acceptedAction?.actionValue === 'delete-answer') {
      handleDeleteAnswer(acceptedAction.id);
    }
  }, [acceptedAction]);

  const onSubmit = useCallback(
    (data) => {
      if (selectedQuestion) {
        const oldTitle = selectedQuestion.title;
        if (oldTitle !== data.title) {
          dispatch(
            updateQuestionAction({
              questionId: selectedQuestion.id,
              title: data.title,
              question_type: questionType,
            })
          );
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

        resetForm();
      } else if (questionStep === 1) {
        handleCreateQuestion(data);
      }
    },
    [selectedQuestion, questionStep, dispatch]
  );

  const handleSubmit = methods.handleSubmit(onSubmit);

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

  const handleCreateAnswer = () => {
    if (!isAnswerEditing) {
      if (questionType !== 'number') {
        append({ text: '', is_right: false });
      } else {
        append({ text: '' });
      }

      setIsAnswerEditing(true);
      return;
    }

    const questionId = selectedQuestion
      ? selectedQuestion.id
      : test.questions[test.questions.length - 1].id;

    const newAnswer = methods.getValues().answers.slice(-1)[0];

    if (!newAnswer.text.trim()) {
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
    handleValidateAnswer(id);

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
      setAcceptedAction(null);
    }
  };

  const handleValidateAnswer = (id) => {
    const deletedAnswer = methods.getValues().answers[id];
    const answersCount = methods.getValues().answers.length;
    const correctAnswersCount = methods
      .getValues()
      .answers.filter((a) => a.is_right === true).length;

    if (answersCount === 2) {
      alert(
        'Нельзя удалить вопрос, количество вариантов ответа должно быть более 2'
      );
      return;
    }

    if (deletedAnswer.is_right && questionType === 'single') {
      alert('Нельзя удалить правильный ответ');
      return;
    }

    if (deletedAnswer.is_right && correctAnswersCount === 1) {
      alert(
        'Нельзя удалить вопрос, количество правильных вариантов ответа должно быть более 1'
      );
      return;
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
    }
  };

  const handleCloseForm = () => {
    if (handleValidateQuestion() && !selectedQuestion) {
      resetForm();
    } else {
      handleSubmit();
    }
  };

  const handleValidateQuestion = () => {
    if (firstStep) {
      return true;
    }

    if (questionType !== 'number') {
      if (fields.length < 2) {
        alert('Добавьте хотя бы два варианта ответа');
        return false;
      }

      if (correctAnswer === null && questionType === 'single') {
        alert('Выберите правильный ответ');
        return false;
      }

      return true;
    }

    // TODO: add validation for "number"
  };

  const resetForm = () => {
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
          <AnswersList
            fields={fields}
            questionType={questionType}
            questionStep={questionStep}
            correctAnswer={correctAnswer}
            setCorrectAnswer={setCorrectAnswer}
          />

          {firstStep && (
            <Button className={s.button} type='submit'>
              {selectedQuestion ? 'Сохранить вопрос' : 'Создать вопрос'}
            </Button>
          )}

          {(questionStep === 2 || selectedQuestion) && (
            <Button
              className={s.button}
              type='button'
              onClick={handleCreateAnswer}
            >
              {isAnswerEditing ? 'Создать ответ' : 'Добавить вариант ответа'}
            </Button>
          )}
          <Button
            className={cn(s.button, {
              [s.cancel]: firstStep,
            })}
            onClick={handleCloseForm}
          >
            {firstStep ? 'Отмена' : 'Готово'}
          </Button>
        </form>
      </FormProvider>
    </DndContext>
  );
};

export default QuestionForm;

QuestionForm.propTypes = {
  onCloseForm: PropTypes.func,
};
