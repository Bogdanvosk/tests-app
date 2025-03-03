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
