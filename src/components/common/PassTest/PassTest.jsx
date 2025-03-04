import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { getTestByIdAction } from '@/store/features/test';
import { selectCurrentTest } from '@/store/features/test/selectors';
import useLocalStorage from '@/hooks/useLocalStorage';

import PassProgress from '../PassProgress/PassProgress';
import Container from '../Container/Container';
import Typography from '../Typography/Typography';
import PassQuestion from '../PassQuestion/PassQuestion';
import Button from '../Button/Button';

import s from './PassTest.module.scss';

const PassTest = () => {
  const [questions, setQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [progressData, setProgressData] = useLocalStorage('progress');

  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const currentTest = useSelector(selectCurrentTest);

  useEffect(() => {
    if (currentTest) {
      const questionsData = currentTest.questions.map(q => {
        return {
          ...q,
          isCorrect: null
        };
      });
      setQuestions(questionsData);
      setActiveQuestion(questionsData[0]);

      if (progressData !== null) {
        const progressIds = Object.keys(progressData).map(id => Number(id));
        const lastPassedQuestionIdx = questionsData.findIndex(
          q => q.id === progressIds[progressIds.length - 1]
        );
        setActiveQuestion(questionsData[lastPassedQuestionIdx + 1]);

        Object.keys(progressData).forEach(id => {
          const question = questionsData.find(q => q.id === Number(id));
          if (question) {
            question.isCorrect = progressData[id];
          }
        });
      }
    }
  }, [currentTest]);

  useEffect(() => {
    params && dispatch(getTestByIdAction(params.id));
  }, [params]);

  const modifyQuestion = (isCorrect, id) => {
    const newQuestionsData = questions.map(q => {
      if (q.id === id) {
        return {
          ...q,
          isCorrect
        };
      }
      return q;
    });

    return newQuestionsData;
  };

  const handlePassQuestion = isCorrect => {
    const newQuestionsData = modifyQuestion(isCorrect, activeQuestion?.id);
    const newActiveQuestion = newQuestionsData.find(q => q.id === activeQuestion?.id);
    const newProgressData = {
      ...progressData,
      [activeQuestion?.id]: isCorrect
    };

    setProgressData(newProgressData);
    setQuestions(newQuestionsData);
    setActiveQuestion(newActiveQuestion);
  };

  const handleSetNextQuestion = useCallback(() => {
    const newActiveQuestionId = questions.findIndex(q => q.id === activeQuestion?.id) + 1;
    setActiveQuestion(questions[newActiveQuestionId]);
  }, [activeQuestion?.id, questions]);

  const handleClickAllTests = () => {
    router.push('/test-list');
    setProgressData(null);
  };

  return (
    <div className={s.pass}>
      <Container>
        <div className={s.navbar}>
          <Typography className={s.title} tag='h1'>
            {currentTest?.title}
          </Typography>
          <Button className={s.button} type='button' onClick={handleClickAllTests}>
            Все тесты
          </Button>
        </div>
        {questions.length === 0 && (
          <Typography className={s.subtitle} tag='h3'>
            Тест пуст 😕
          </Typography>
        )}
        <PassProgress data={questions} active={activeQuestion?.id} />
        <PassQuestion
          questions={questions}
          question={activeQuestion}
          onSelectAnswer={handlePassQuestion}
          onSetNextQuestion={handleSetNextQuestion}
        />
        {}
      </Container>
    </div>
  );
};

export default PassTest;
