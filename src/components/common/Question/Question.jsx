import PropTypes from 'prop-types';
import cn from 'classnames';
import { useContext } from 'react';

import { isOpenFormContext } from '@/components/common/Questions/Questions';

import { SelectQuestionContext } from '@/components/pages/Test/Test';

import s from './Question.module.scss';

const Question = ({ question }) => {
  const { open: isFormOpen, id } = useContext(isOpenFormContext);
  const { handleSelectQuestion } = useContext(SelectQuestionContext);

  return (
    <div
      onClick={() => handleSelectQuestion(question.id)}
      className={cn(s.question, {
        [s.selected]: isFormOpen && question.id === id
      })}
    >
      {question.title}
    </div>
  );
};

export default Question;

Question.propTypes = {
  question: PropTypes.shape({
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
};
