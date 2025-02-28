import cn from 'classnames';

import s from './Pagination.module.scss';

const Pagination = ({ totalPages, handleSetPage, currentPage }) => {
  return (
    <div className={s.pagination}>
      <ul className={s.pages}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <li
            key={`${page}-page`}
            onClick={() => handleSetPage(page)}
            className={cn(s.page, { [s.active]: page === currentPage })}
          >
            {page}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
