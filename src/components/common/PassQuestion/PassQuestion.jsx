import { createContext, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';

import { isNumber } from '@/utils/isNumber';
import { toastify } from '@/utils/toastify';
import { useModalContext } from '../ModalProvider/ModalProvider';
import useLocalStorage from '@/hooks/useLocalStorage';

import RadioGroup from '../RadioGroup/RadioGroup';
import Typography from '../Typography/Typography';
import Button from '../Button/Button';
import Input from '../Input/Input';

import s from './PassQuestion.module.scss';

export const QuestionMetaContext = createContext(null);

const PassQuestion = ({ question, onSelectAnswer, onSetNextQuestion, questions }) => {
  const [isQuestionPassed, setIsQuestionPassed] = useState(false);
  const [selectedAnswerId, setSelectedAnswer] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [numberAnswer, setNumberAnswer] = useState('');
  const [acceptedAction, setAcceptedAction] = useState(null);

  const router = useRouter();
  const { showModal } = useModalContext();

  const correctQuestions = useMemo(() => questions.filter(q => q.isCorrect).length, [questions]);
  const passedQuestions = useMemo(() => {
    return questions.filter(q => q.isCorrect !== null).length;
  }, [questions]);

  const handleIsAccepted = value => setAcceptedAction(value);

  useEffect(() => {
    if (acceptedAction?.actionValue === 'finish-test') {
      router.push('/test-list');
    }
  }, [acceptedAction]);

  const handleSelectAnswer = () => {
    if (isQuestionPassed) {
      setIsQuestionPassed(false);
      setSelectedAnswers([]);
      setSelectedAnswer(null);
      setNumberAnswer('');
      return onSetNextQuestion();
    }

    if (question.question_type === 'single') {
      if (!selectedAnswerId) {
        toastify('error', 'Выберите ответ');
        return;
      }
      const isCorrect = question.answers.find(answer => answer.id === selectedAnswerId).is_right;
      onSelectAnswer(isCorrect);
    }

    if (question.question_type === 'multiple') {
      if (selectedAnswers.length < 1) {
        toastify('error', 'Выберите ответы');
        return;
      }
      const isCorrect = selectedAnswers.every(
        answerId => question.answers.find(answer => answer.id === answerId).is_right
      );
      onSelectAnswer(isCorrect);
    }

    if (question.question_type === 'number') {
      if (!numberAnswer) {
        toastify('error', 'Введите ответ');
        return;
      }

      const isCorrect = +question.answers[0].text === +numberAnswer;
      onSelectAnswer(isCorrect);
    }

    setIsQuestionPassed(true);
  };

  const handleChangeNumberAnswer = e => {
    if (!isNumber(e.target.value) && e.target.value !== '') {
      toastify('error', 'Введите число');
      return;
    }
    setNumberAnswer(e.target.value);
  };

  const handleFinishTest = () => {
    const passedPercent = Math.round((correctQuestions / questions.length) * 100);
    if (passedQuestions < questions.length) {
      toastify('error', 'Пройдите тест до конца');
      return;
    }

    showModal('accept', {
      handleIsAccepted,
      actionValue: 'finish-test',
      title: `Поздравляем❗ 😁 Вы ответили правильно на ${correctQuestions} из ${questions.length} вопросов. (${passedPercent}%) ${passedPercent > 50 ? '✅' : '❌'}`,
      success: 'Завершить тест',
      fail: null
    });
  };

  if (question) {
    return (
      <div className={s.question}>
        <Typography tag='h2' className={s.title}>
          {question.title}
        </Typography>
        {question.question_type !== 'number' && (
          <QuestionMetaContext.Provider value={question.question_type}>
            <RadioGroup
              options={question.answers}
              selected={question.question_type === 'single' ? selectedAnswerId : selectedAnswers}
              onChange={
                question.question_type === 'single' ? setSelectedAnswer : setSelectedAnswers
              }
              isQuestionPassed={isQuestionPassed}
            />
          </QuestionMetaContext.Provider>
        )}
        {question.question_type === 'number' && (
          <Input className={s.input} value={numberAnswer} onChange={handleChangeNumberAnswer} />
        )}
        <div className={s.buttons}>
          {passedQuestions < questions.length && (
            <Button className={cn(s.button, s.next)} onClick={handleSelectAnswer}>
              {isQuestionPassed ? 'Далее' : 'Подтвердить'}
            </Button>
          )}

          <Button className={cn(s.button, s.finish)} onClick={handleFinishTest}>
            Закончить тест
          </Button>
        </div>
      </div>
    );
  }

  return null;
};

export default PassQuestion;
