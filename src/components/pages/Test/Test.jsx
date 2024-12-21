import cn from 'classnames';

import { createContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createTestAction,
  deleteQuestionAction,
  getCurrentTestAction,
  updateTestAction,
} from '@/store/features/test';
import {
  selectCurrentQuestions,
  selectCurrentTest,
} from '@/store/features/test/selectors';
import { useRouter } from 'next/router';
import { logoutAction } from '@/store/features/auth';
import useLocalStorage from '@/hooks/useLocalStorage';
import useDebounce from '@/hooks/useDebounce';
import { useModalContext } from '@/components/common/ModalProvider/ModalProvider';

import { questionTypes } from '@/content';
import Container from '../../common/Container/Container';
import Button from '../../common/Button/Button';
import Questions from '../../common/Questions/Questions';
import QuestionForm from '@/components/common/QuestionForm/QuestionForm';
import Dropdown from '@/components/common/Dropdown/Dropdown';

import s from './Test.module.scss';

export const isOpenFormContext = createContext({ open: false, id: null });

const Test = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [user, setUser] = useLocalStorage('user');

  const [isTestCreated, setIsTestCreated] = useState(true);
  const [isQuestionFormOpen, setIsQuestionFormOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [questionType, setQuestionType] = useState(questionTypes[0].value);
  const [acceptedAction, setAcceptedAction] = useState(null);
  const { showModal } = useModalContext();

  const currentTest = useSelector(selectCurrentTest);
  const currentQuestions = useSelector(selectCurrentQuestions);

  useEffect(() => {
    currentTest && setTitle(currentTest.title);
    currentQuestions && setQuestions(currentQuestions);

    if (selectedQuestion) handleSelectQuestion(selectedQuestion?.id);
  }, [currentTest, currentQuestions]);

  useEffect(() => {
    if (acceptedAction?.actionValue === 'delete-question') {
      handleDeleteQuestion(acceptedAction.id);
    }
  }, [acceptedAction]);

  useEffect(() => {
    // TODO: get testId from props if existed test, else null
    dispatch(getCurrentTestAction(1562));
  }, []);

  useEffect(() => {
    if (user === null) router.push('/sign-in');
  }, [user]);

  const debouncedValue = useDebounce(title, 500).trim();
  useEffect(() => {
    if (!currentTest) return;
    dispatch(
      updateTestAction({ testId: currentTest.id, title: debouncedValue })
    );
  }, [debouncedValue]);

  useEffect(() => {
    !isQuestionFormOpen && setQuestionType(questionTypes[0].value);
  }, [isQuestionFormOpen]);

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleSelectQuestionType = (value) => {
    setQuestionType(value);
  };

  const handleCreateTest = () => {
    if (title) {
      dispatch(createTestAction({ title }));
      setIsTestCreated(true);
    }
  };

  const handleOpenQuestionForm = () => {
    setIsQuestionFormOpen(true);
  };

  const handleLogout = () => {
    setUser(null);
    dispatch(logoutAction());
  };

  const handleCloseQuestionForm = () => {
    setIsQuestionFormOpen(false);
    setSelectedQuestion(null);
  };

  const acceptDeleteQuestion = (id) => {
    showModal('accept', {
      handleIsAccepted,
      actionValue: 'delete-question',
      id,
    });
  };

  const handleIsAccepted = (value) => {
    setAcceptedAction(value);
  };

  const handleDeleteQuestion = (id) => {
    dispatch(deleteQuestionAction(id));
    handleCloseQuestionForm();
  };

  const handleSelectQuestion = (id) => {
    const question = currentQuestions.find((q) => q.id === id);
    question && setSelectedQuestion(question);
    setIsQuestionFormOpen(true);
  };

  return (
    <div className={s.test}>
      <div className={s.navbarWrapper}>
        <Container>
          <div className={s.logout}>
            <Button className={cn(s.button, s.delete)} onClick={handleLogout}>
              Выйти
            </Button>
          </div>
          <div className={s.navbar}>
            <input
              type='text'
              className={s.input}
              value={title}
              onChange={(e) => handleChangeTitle(e)}
              placeholder='Введите название теста'
            />
            <div className={s.buttons}>
              <Button
                className={cn(s.button, { [s.show]: currentTest })}
                type='button'
                onClick={handleCreateTest}
              >
                {/* // TODO: conditional button (create && "Создать" | edit && "Сохранить") */}
                Создать
              </Button>
              <Button className={cn(s.button, s.delete)} type='button'>
                Удалить
              </Button>
            </div>
          </div>
        </Container>
      </div>
      {isTestCreated && (
        <Container>
          <div className={s.content}>
            <div className={s.questions}>
              <isOpenFormContext.Provider
                value={{ open: isQuestionFormOpen, id: selectedQuestion?.id }}
              >
                <Questions
                  questions={questions}
                  onDeleteQuestion={acceptDeleteQuestion}
                  onSelectQuestion={handleSelectQuestion}
                />
              </isOpenFormContext.Provider>

              <Button
                className={cn(s.button, s.addQuestion)}
                type='button'
                onClick={handleOpenQuestionForm}
              >
                Добавить вопрос
              </Button>
              <Dropdown
                disabled={selectedQuestion}
                options={questionTypes}
                selectedQuestion={selectedQuestion}
                onSelectQuestionType={handleSelectQuestionType}
              />
            </div>
            {isQuestionFormOpen && (
              <QuestionForm
                questionType={questionType}
                selectedQuestion={selectedQuestion}
                onSelectQuestion={handleSelectQuestion}
                onCloseForm={handleCloseQuestionForm}
              />
            )}
          </div>
        </Container>
      )}
    </div>
  );
};

export default Test;
