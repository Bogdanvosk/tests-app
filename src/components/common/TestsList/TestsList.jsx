import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import useLocalStorage from '@/hooks/useLocalStorage';

import Button from '../Button/Button';

import s from './TestsList.module.scss';

const TestsList = ({ items }) => {
  const [user, setUser] = useLocalStorage('user');
  const [testId, setTestId] = useLocalStorage('test');
  const router = useRouter();

  const handleEditTest = id => {
    setTestId(id);
    router.push('/test');
  };

  return (
    <div className={s.tests}>
      <ul className={s.list}>
        {items &&
          items.map(test => (
            <li key={test.id} className={s.item}>
              <div className={s.title}>{test.title}</div>
              {user.is_admin && (
                <Button
                  className={s.edit}
                  iconName='edit'
                  onClick={() => handleEditTest(test.id)}
                ></Button>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TestsList;

TestsList.propTypes = {
  tests: PropTypes.arrayOf(
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
          answers: PropTypes.arrayOf(PropTypes.object)
        })
      )
    })
  )
};
