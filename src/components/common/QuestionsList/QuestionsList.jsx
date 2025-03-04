import PropTypes from 'prop-types';

import Question from '../Question/Question';
import Icon from '../Icon/Icon';

import s from './QuestionsList.module.scss';

const QuestionsList = ({ questions = [], onDeleteQuestion }) => {
  return (
    <ul className={s.questions}>
      {questions.map(question => {
        return (
          <li className={s.question} key={question.id}>
            <Question question={question} />
            <div onClick={() => onDeleteQuestion(question.id)}>
              <Icon name='delete' className={s.delete} />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default QuestionsList;

QuestionsList.propTypes = {
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
  ),
  onDeleteQuestion: PropTypes.func
};
