import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import useLocalStorage from '@/hooks/useLocalStorage';
import { useModalContext } from '../ModalProvider/ModalProvider';
import { clearCurrentTestAction } from '@/store/features/test';

import Button from '../Button/Button';

import s from './TestsList.module.scss';

const TestsList = ({ items }) => {
  const { showModal } = useModalContext();
  const [acceptedAction, setAcceptedAction] = useState(null);

  const { value: user } = useLocalStorage('user');
  const { setValue: setTestId } = useLocalStorage('selected-test');
  const { setValue: setProgressData } = useLocalStorage('progress');
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    setProgressData(null);
    setTestId(null);
    dispatch(clearCurrentTestAction());
  }, []);

  useEffect(() => {
    if (acceptedAction?.actionValue === 'pass-test') {
      handlePassTest(acceptedAction.id);
    }
  }, [acceptedAction]);

  const handleEditTest = id => {
    setTestId(id);
    router.push('/create-test');
  };

  const handlePassTest = id => {
    setTestId(id);
    router.push(`/test/${id}`);
  };

  const handleIsAccepted = value => setAcceptedAction(value);

  const acceptPassTest = id => {
    showModal('accept', {
      handleIsAccepted,
      actionValue: 'pass-test',
      id,
      title: 'Начать прохождение теста?',
      fail: 'Отмена'
    });
  };

  return (
    <div className={s.tests}>
      <ul className={s.list}>
        {items &&
          items.map(test => (
            <li id='test' key={test.id} className={s.item}>
              <Button className={s.itemButton} onClick={() => acceptPassTest(test.id)}>
                <div className={s.title}>{test.title}</div>
                {user.is_admin && (
                  <Button
                    className={s.edit}
                    iconName='edit'
                    onClick={() => handleEditTest(test.id)}
                  ></Button>
                )}
              </Button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TestsList;

TestsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      created_at: PropTypes.string,
      questions: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          title: PropTypes.string,
          question_type: PropTypes.string,
          answer: PropTypes.number,
          answers: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.number,
              text: PropTypes.string,
              is_right: PropTypes.bool
            })
          )
        })
      )
    })
  )
};
