import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import cn from 'classnames';

import {
  QuestionTypeContext,
  SelectQuestionContext,
} from '@/components/pages/Test/Test';
import { selectCurrentTest } from '@/store/features/test/selectors';
import {
  addAnswerAction,
  addNewQuestionAction,
  deleteAnswerAction,
  updateAnswerAction,
  updateQuestionAction,
} from '@/store/features/test';
import { isNumber } from '@/utils/isNumber';
import { toastify } from '@/utils/toastify';
import { selectIsLoading } from '@/store/features/auth/selectors';

import Input from '../Input/Input';
import Button from '../Button/Button';
import AnswersList from '../AnswersList/AnswersList';
import DndArea from '../DndArea/DndArea';

import s from './QuestionForm.module.scss';

export const CorrectAnswerContext = createContext(null);
export const EditingAnswerContext = createContext(null);

const QuestionForm = ({ onCloseForm }) => {
  const [questionStep, setQuestionStep] = useState(1);
  const [editingAnswerId, setEditingAnswerId] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [acceptedAction, setAcceptedAction] = useState(null);

  const isLoading = useSelector(selectIsLoading);

  const { selectedQuestion } = useContext(SelectQuestionContext);
  const { questionType } = useContext(QuestionTypeContext);

  const test = useSelector(selectCurrentTest);
  const dispatch = useDispatch();

  const firstStep = useMemo(
    () => questionStep === 1 && !selectedQuestion,
    [questionStep, selectedQuestion]
  );

  const secondStep = useMemo(
    () => questionStep === 2 || selectedQuestion,
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

  const updateSelectedQuestion = (data) => {
    const oldTitle = selectedQuestion.title;
    if (oldTitle !== data.title) {
      dispatch(
        updateQuestionAction({
          questionId: selectedQuestion.id,
          title: data.title,
          question_type: questionType,
        })
      );
      toastify('success', 'Вопрос успешно обновлен');
    }

    if (data.answers.slice(-1)[0].text === '') {
      toastify('error', 'Введите текст ответа');
      return;
    }

    let countOfChangedAnswers = 0;

    data.answers.forEach((_, index) => {
      const newAnswer = data.answers[index];
      const oldAnswer = selectedQuestion.answers[index];
      if (questionType === 'number' && !isNumber(newAnswer.text)) {
        toastify('error', 'Введите число');
        return;
      }

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
        countOfChangedAnswers += 1;
      }
    });

    countOfChangedAnswers > 1
      ? toastify('success', 'Ответы успешно обновлены')
      : countOfChangedAnswers === 1
      ? toastify('success', 'Ответ успешно обновлен')
      : null;

    resetForm();
  };

  const onSubmit = useCallback(
    (data) => {
      if (selectedQuestion) {
        updateSelectedQuestion(data);
      } else if (questionStep === 1) {
        handleCreateQuestion(data);
      }
    },
    [selectedQuestion, questionStep, dispatch, questionType]
  );

  const handleSubmit = methods.handleSubmit(onSubmit);

  const handleCreateQuestion = (data) => {
    const title = data.title;

    if (!title) {
      toastify('error', 'Введите название вопроса');
      return;
    }

    dispatch(
      addNewQuestionAction({
        title,
        question_type: questionType,
        answer: 1,
        testId: test.id,
      })
    );
    toastify('success', 'Вопрос успешно добавлен');

    setQuestionStep(2);
  };

  const handleCreateAnswer = () => {
    if (firstStep) {
      onCloseForm();
      return;
    }

    const currentQuestion = test.questions[test.questions.length - 1];
    const questionId = selectedQuestion
      ? selectedQuestion.id
      : currentQuestion.id;
    const allAnswers = methods.getValues().answers;

    const newAnswer = allAnswers.slice(-1)[0];

    if (questionType === 'number') {
      if (currentQuestion.answers.length === 1) {
        onCloseForm();
        return;
      }

      const newNumberAnswer = allAnswers[0];

      if (!isNumber(newNumberAnswer.text)) {
        toastify('error', 'Введите число');
        return;
      }

      dispatch(
        addAnswerAction({
          questionId,
          answer: newNumberAnswer,
        })
      );
      toastify('success', 'Ответ успешно добавлен');
      onCloseForm();
      return;
    }

    if (editingAnswerId === null) {
      append({ text: '', is_right: false });

      setEditingAnswerId(allAnswers.length);
      return;
    }

    if (!newAnswer.text.trim()) {
      toastify('error', 'Введите текст ответа');
      return;
    }

    dispatch(
      addAnswerAction({
        questionId,
        answer: newAnswer,
      })
    );

    toastify('success', 'Ответ успешно добавлен');
    setEditingAnswerId(null);
  };

  const handleDeleteAnswer = (id) => {
    if (handleValidateAnswer(id)) {
      const index = fields.findIndex((f, idx) => idx === id);
      remove(id);
      setEditingAnswerId(null);

      if (index === correctAnswer) setCorrectAnswer(null);
      if (index < correctAnswer) setCorrectAnswer(correctAnswer - 1);

      if (
        selectedQuestion &&
        fields.length === selectedQuestion.answers.length
      ) {
        const answerId = selectedQuestion.answers[id].id;

        dispatch(
          deleteAnswerAction({
            questionId: selectedQuestion.id,
            answerId,
          })
        );

        toastify('success', 'Ответ успешно удален');
        setAcceptedAction(null);
      }
    }
  };

  const handleValidateAnswer = (id) => {
    const answers = methods.getValues().answers;

    const deletedAnswerId = answers[id];
    const answersCount = answers.length;
    const correctAnswersCount = answers.filter(
      (a) => a.is_right === true
    ).length;

    if (answersCount === 2) {
      toastify(
        'error',
        'Нельзя удалить вопрос, количество вариантов ответа должно быть более 2'
      );
      return false;
    }

    if (deletedAnswerId.is_right && questionType === 'single') {
      toastify('error', 'Нельзя удалить правильный ответ');
      return false;
    }

    if (deletedAnswerId.is_right && correctAnswersCount === 1) {
      toastify(
        'error',
        'Нельзя удалить вопрос, количество правильных вариантов ответа должно быть более 1'
      );
      return false;
    }
    return true;
  };

  const handleCloseForm = () => {
    const isNumberType = questionType === 'number';
    const isValidQuestion = handleValidateQuestion();

    if (isNumberType) {
      !selectedQuestion ? handleCreateAnswer() : handleSubmit();
      return;
    }

    if (isValidQuestion && !selectedQuestion) resetForm();
    else handleSubmit();
  };

  const handleValidateQuestion = () => {
    if (firstStep) return true;
    if (editingAnswerId !== null) {
      toastify('warning', 'Завершите редактирование ответа');
      return false;
    }

    if (questionType !== 'number') {
      if (fields.length < 2) {
        toastify('error', 'Добавьте хотя бы два варианта ответа');
        return false;
      }

      if (correctAnswer === null && questionType === 'single') {
        toastify('error', 'Выберите правильный ответ');
        return false;
      }
      return true;
    }
  };

  const resetForm = () => {
    setQuestionStep(1);
    setCorrectAnswer(null);
    methods.reset();
    onCloseForm();
  };

  return (
    <CorrectAnswerContext.Provider value={{ correctAnswer, setCorrectAnswer }}>
      <EditingAnswerContext.Provider value={editingAnswerId}>
        <DndArea fields={fields} move={move}>
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
                setAcceptedAction={setAcceptedAction}
              />

              {firstStep && (
                <Button className={s.button} type='submit' disabled={isLoading}>
                  Создать вопрос
                </Button>
              )}

              {questionType !== 'number' && secondStep && (
                <Button
                  className={s.button}
                  type='button'
                  onClick={handleCreateAnswer}
                  disabled={isLoading}
                >
                  {editingAnswerId !== null
                    ? 'Создать ответ'
                    : 'Добавить вариант ответа'}
                </Button>
              )}

              <Button
                className={cn(s.button, {
                  [s.cancel]: firstStep,
                })}
                onClick={handleCloseForm}
                disabled={isLoading}
              >
                {firstStep ? 'Отмена' : 'Готово'}
              </Button>
            </form>
          </FormProvider>
        </DndArea>
      </EditingAnswerContext.Provider>
    </CorrectAnswerContext.Provider>
  );
};

export default QuestionForm;

QuestionForm.propTypes = {
  onCloseForm: PropTypes.func,
};
