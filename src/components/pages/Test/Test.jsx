import { createContext, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getTestByIdAction } from '@/store/features/test';
import { selectCurrentQuestions, selectCurrentTest } from '@/store/features/test/selectors';
import { selectIsLoading } from '@/store/features/auth/selectors';
import useLocalStorage from '@/hooks/useLocalStorage';
import { questionTypes } from '@/content';

import Container from '@/components/common/Container/Container';
import QuestionForm from '@/components/common/QuestionForm/QuestionForm';
import CreateNavbar from '@/components/common/CreateNavbar/CreateNavbar';
import Questions from '@/components/common/Questions/Questions';

import s from './Test.module.scss';

export const SelectQuestionContext = createContext(null);
export const QuestionTypeContext = createContext(null);

const Test = () => {
  const dispatch = useDispatch();
  const { value: currTestId } = useLocalStorage('selected-test');

  const currentTest = useSelector(selectCurrentTest);
  const currentQuestions = useSelector(selectCurrentQuestions);
  const isLoading = useSelector(selectIsLoading);

  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [questionType, setQuestionType] = useState(questionTypes[0].value);
  const [isQuestionFormOpen, setIsQuestionFormOpen] = useState(false);

  useEffect(() => {
    currTestId && dispatch(getTestByIdAction(currTestId));
  }, []);

  useEffect(() => {
    !isQuestionFormOpen && setQuestionType(questionTypes[0].value);
  }, [isQuestionFormOpen]);

  const handleCloseQuestionForm = () => {
    setIsQuestionFormOpen(false);
    setSelectedQuestion(null);
  };

  const handleSelectQuestion = useCallback(
    id => {
      if (isLoading) return;

      const question = currentQuestions.find(q => q.id === id);
      if (question) {
        setSelectedQuestion(question);
        setIsQuestionFormOpen(true);
        setQuestionType(question.question_type);
      }
    },
    [currentQuestions, isLoading]
  );

  return (
    <div className={s.test}>
      <CreateNavbar currentTest={currentTest} />
      {currentTest && (
        <Container>
          <div className={s.content}>
            <SelectQuestionContext.Provider
              value={{
                selectedQuestion,
                handleSelectQuestion
              }}
            >
              <QuestionTypeContext.Provider
                value={{
                  questionType,
                  setQuestionType
                }}
              >
                <Questions
                  currentQuestions={currentQuestions}
                  currentTest={currentTest}
                  isQuestionFormOpen={isQuestionFormOpen}
                  setIsQuestionFormOpen={setIsQuestionFormOpen}
                  onCloseForm={handleCloseQuestionForm}
                />
                {isQuestionFormOpen && <QuestionForm onCloseForm={handleCloseQuestionForm} />}
              </QuestionTypeContext.Provider>
            </SelectQuestionContext.Provider>
          </div>
        </Container>
      )}
    </div>
  );
};

export default Test;
