import PropTypes from 'prop-types';

import Question from '../Question/Question';

import s from './Questions.module.scss';
import Icon from '../Icon/Icon';

const Questions = ({ questions = [], onDeleteQuestion, onSelectQuestion }) => {
  return (
    <ul className={s.questions}>
      {questions.map((question) => {
        return (
          <li className={s.question} key={question.id}>
            <Question
              question={question}
              handleSelectQuestion={onSelectQuestion}
            />
            <div onClick={() => onDeleteQuestion(question.id)}>
              <Icon name='delete' className={s.delete} />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Questions;

Questions.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      question_type: PropTypes.string,
      answer: PropTypes.number,
      answers: PropTypes.arrayOf(PropTypes.object),
    })
  ),
  onDeleteQuestion: PropTypes.func,
  onSelectQuestion: PropTypes.func,
};
