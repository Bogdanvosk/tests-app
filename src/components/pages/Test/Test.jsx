import cn from 'classnames';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Container from '../../common/Container/Container';
import Button from '../../common/Button/Button';
import Questions from '../../common/Questions/Questions';

import s from './Test.module.scss';

const Test = () => {
  const [title, setTitle] = useState('');

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
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
              <Button className={s.button} type='button'>
                Сохранить
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
            <div className={s.controls}>
              <Button
                className={s.button}
                type='button'
                onClick={onAddQuestion}
              >
                Добавить вопрос
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Test;
