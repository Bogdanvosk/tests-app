import PropTypes from 'prop-types';

import s from './Question.module.scss';

const Question = ({ question }) => {
  return <div className={s.question}>{question.title}</div>;
};

export default Question;

Question.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    question_type: PropTypes.string,
    answer: PropTypes.number,
    answers: PropTypes.arrayOf(PropTypes.object),
  }),
};
