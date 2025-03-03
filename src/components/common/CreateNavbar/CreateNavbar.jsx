import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import cn from 'classnames';

import {
  clearCurrentTest,
  createTestAction,
  deleteTestAction,
  updateTestAction
} from '@/store/features/test';
import { logoutAction } from '@/store/features/auth';
import useDebounce from '@/hooks/useDebounce';
import { toastify } from '@/utils/toastify';
import useLocalStorage from '@/hooks/useLocalStorage';

import Container from '../Container/Container';
import Button from '../Button/Button';
import Input from '../Input/Input';

import s from './CreateNavbar.module.scss';

const CreateNavbar = ({ currentTest }) => {
  const [user, setUser] = useLocalStorage('user');
  const [currTestId, setCurrTestId] = useLocalStorage('selected-test');
  const [title, setTitle] = useState('');

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (currentTest) {
      setTitle(currentTest.title);
      setCurrTestId(currentTest.id);
    }
  }, [currentTest]);

  useEffect(() => {
    if (user === null) router.push('/sign-in');
  }, [user]);

  const debouncedValue = useDebounce(title, 500).trim();
  useEffect(() => {
    if (!currentTest || !title) return;
    dispatch(updateTestAction({ testId: currentTest.id, title: debouncedValue }));
    toastify('success', 'Имя теста успешно обновлено');
  }, [debouncedValue]);

  const handleChangeTitle = e => {
    setTitle(e.target.value);
  };

  const handleCreateTest = () => {
    if (title) {
      dispatch(createTestAction({ title }));
      toastify('success', 'Тест успешно создан');
    }
  };

  const handleDeleteTest = () => {
    dispatch(deleteTestAction(currentTest.id));
    dispatch(clearCurrentTest());
    setTitle('');
    toastify('success', 'Тест успешно удален');
  };

  const handleLogout = () => {
    setUser(null);
    dispatch(logoutAction());
  };

  const handleClickAllTests = () => {
    router.push('/test-list');
  };

  const handleClearTitle = () => {
    setTitle('');
  };

  return (
    <div className={s.navbarWrapper}>
      <Container className={s.container}>
        <div className={s.buttons}>
          <Button className={cn(s.button, s.delete)} onClick={handleLogout}>
            Выйти из аккаунта
          </Button>
          <Button className={s.button} type='button' onClick={handleClickAllTests}>
            Все тесты
          </Button>
        </div>
        <div className={s.navbar}>
          <label htmlFor='title' className={s.titleLabel}>
            <Input
              id='title'
              value={title}
              onChange={handleChangeTitle}
              placeholder='Введите название теста'
            />
            <span className={s.deleteIcon} onClick={handleClearTitle}></span>
          </label>
          {!currentTest && (
            <Button
              className={cn(s.button, { [s.show]: currentTest })}
              type='button'
              onClick={handleCreateTest}
            >
              Создать тест
            </Button>
          )}
          {currentTest && (
            <Button className={cn(s.button, s.delete)} type='button' onClick={handleDeleteTest}>
              Удалить тест
            </Button>
          )}
        </div>
      </Container>
    </div>
  );
};

export default CreateNavbar;

CreateNavbar.propTypes = {
  currentTest: PropTypes.shape({
    created_at: PropTypes.string,
    id: PropTypes.number,
    title: PropTypes.string,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        question_type: PropTypes.string,
        answer: PropTypes.number,
        answers: PropTypes.arrayOf(PropTypes.object)
      })
    )
  })
};
