import PropTypes from 'prop-types';
import cn from 'classnames';

import Button from '../Button/Button';

import s from './Pagination.module.scss';

const Pagination = ({ totalPages, handleSetPage, currentPage }) => {
  return (
    <div className={s.pagination}>
      <ul className={s.pages}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <li key={`${page}-page`} className={cn(s.page, { [s.active]: page === currentPage })}>
            <Button className={s.button} onClick={() => handleSetPage(page)}>{page}</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;

Pagination.propTypes = {
  totalPages: PropTypes.number,
  handleSetPage: PropTypes.func,
  currentPage: PropTypes.number
};
