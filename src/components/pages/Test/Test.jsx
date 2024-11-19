import cn from 'classnames';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTestAction, getAllTestsAction } from '@/store/features/test';
import { selectCurrentTest } from '@/store/features/test/selectors';

import { questionTypes } from '@/content';
import Container from '../../common/Container/Container';
import Button from '../../common/Button/Button';
import Questions from '../../common/Questions/Questions';
import QuestionForm from '@/components/common/QuestionForm/QuestionForm';
import Dropdown from '@/components/common/Dropdown/Dropdown';

import s from './Test.module.scss';

const Test = () => {
  const [isTestCreated, setIsTestCreated] = useState(false);
  const [isQuestionFormOpen, setIsQuestionFormOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [questionType, setQuestionType] = useState(questionTypes[0].value);
  const dispatch = useDispatch();
  const test = useSelector(selectCurrentTest);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleSelectQuestionType = (value) => {
    setQuestionType(value);
  };

  const handleCreateTest = () => {
    if (title) {
      dispatch(createTestAction({ title }));
      setIsTestCreated(true);
      console.log('test', test);
    }
  };

  const handleOpenQuestionForm = () => {
    setIsQuestionFormOpen(true);
  };

  return (
    <div className={s.test}>
      <div className={s.navbarWrapper}>
        <Container>
          <div className={s.navbar}>
            <input
              type='text'
              className={s.input}
              value={title}
              onChange={(e) => onChangeTitle(e)}
              placeholder='Введите название теста'
            />
            <div className={s.buttons}>
              <Button
                className={s.button}
                type='button'
                onClick={handleCreateTest}
              >
                {/* // TODO: conditional button (create && "Создать" | edit && "Сохранить") */}
                Создать
              </Button>
              <Button
                className={s.button}
                type='button'
                onClick={() => dispatch(getAllTestsAction())}
              >
                All tests
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
              <Questions />
              <Button
                className={s.button}
                type='button'
                onClick={handleOpenQuestionForm}
              >
                Добавить вопрос
              </Button>
              <Dropdown
                options={questionTypes}
                onSelectQuestionType={handleSelectQuestionType}
              />
            </div>
            {isQuestionFormOpen && <QuestionForm questionType={questionType} />}
          </div>
        </Container>
      )}
    </div>
  );
};

export default Test;
