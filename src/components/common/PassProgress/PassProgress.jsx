import PropTypes from 'prop-types';
import cn from 'classnames';

import s from './PassProgress.module.scss';

const PassProgress = ({ data, active, className = '' }) => {
  return (
    <ul className={cn(s.progress, className)}>
      {data.map(q => {
        return (
          <li
            key={q.id}
            className={cn(
              s.question,
              { [s.active]: q.id === active },
              { [s.correct]: q.isCorrect },
              { [s.incorrect]: q.isCorrect === false }
            )}
          ></li>
        );
      })}
    </ul>
  );
};

export default PassProgress;

PassProgress.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      isCorrect: PropTypes.bool,
      question_type: PropTypes.string,
      title: PropTypes.string,
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
  active: PropTypes.number,
  className: PropTypes.string
};
