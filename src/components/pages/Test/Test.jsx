import cn from 'classnames';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTestAction } from '@/store/features/test';

import { questionTypes } from '@/content';
import Container from '../../common/Container/Container';
import Button from '../../common/Button/Button';
import Questions from '../../common/Questions/Questions';
import QuestionForm from '@/components/common/QuestionForm/QuestionForm';
import Dropdown from '@/components/common/Dropdown/Dropdown';

import s from './Test.module.scss';

const Test = () => {
  const [title, setTitle] = useState('');
  const [questionType, setQuestionType] = useState(questionTypes[0].value);
  const dispatch = useDispatch();

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleSelectQuestionType = (value) => {
    setQuestionType(value);
  };

  const handleCreateTest = () => {
    dispatch(createTestAction(title));
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
              <Button className={cn(s.button, s.delete)} type='button'>
                Удалить
              </Button>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <div className={s.content}>
          <div className={s.questions}>
            <Questions />
            <Button className={s.button} type='button'>
              Добавить вопрос
            </Button>
            <Dropdown
              options={questionTypes}
              onSelectQuestionType={handleSelectQuestionType}
            />
          </div>
          <QuestionForm questionType={questionType} />
        </div>
      </Container>
    </div>
  );
};

export default Test;
