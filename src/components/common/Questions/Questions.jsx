import PropTypes from 'prop-types';

import Question from '../Question/Question';

const Questions = ({ questions = [] }) => {
  {
    questions.map((question) => (
      <Question key={question.id} question={question} />
    )) || <></>;
  }
};

export default Questions;

// TODO: change type for props
Questions.propTypes = {
  questions: PropTypes.array,
};
