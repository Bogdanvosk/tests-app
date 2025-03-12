import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { getAllTestsAction } from '@/store/features/test';
import { selectAllTests } from '@/store/features/test/selectors';
import useDebounce from '@/hooks/useDebounce';
import { toastify } from '@/utils/toastify';

import TestsNavbar from '@/components/common/TestsNavbar/TestsNavbar';
import TestsList from '@/components/common/TestsList/TestsList';
import Icon from '@/components/common/Icon/Icon';
import Container from '@/components/common/Container/Container';
import Input from '@/components/common/Input/Input';
import Pagination from '@/components/common/Pagination/Pagination';
import Button from '@/components/common/Button/Button';

import s from './Tests.module.scss';

const Tests = () => {
  const [tests, setTests] = useState({});
  const [sort, setSort] = useState('created_at_desc');
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const searchParams = useSearchParams();

  const router = useRouter();
  const dispatch = useDispatch();
  const allTests = useSelector(selectAllTests);
  const debouncedValue = useDebounce(searchValue, 500).trim();

  useEffect(() => {
    if (searchParams.get('search')) setSearchValue(searchParams.get('search'));
    if (searchParams.get('sort')) setSort(searchParams.get('sort'));
    if (searchParams.get('page')) setCurrentPage(Number(searchParams.get('page')));
  }, [searchParams]);

  useEffect(() => {
    dispatch(getAllTestsAction({ search: searchValue, sort, page: currentPage }));
    searchValue && toastify('success', 'Тесты успешно обновлены');
  }, [debouncedValue]);

  useEffect(() => {
    dispatch(getAllTestsAction({ search: searchValue, sort, page: currentPage }));
  }, [sort]);

  useEffect(() => {
    setTests(allTests);
  }, [allTests]);

  useEffect(() => {
    dispatch(getAllTestsAction({ search: searchValue, sort, page: currentPage }));
  }, [currentPage]);

  const handleSetSort = () => {
    const newSort = sort === 'created_at_asc' ? 'created_at_desc' : 'created_at_asc';
    setSort(newSort);
    router.push(`/test-list?search=${searchValue}&sort=${newSort}&page=1`);
  };

  const handleChangeSearch = e => {
    setSearchValue(e.target.value);
    handleSetPage(1);
    router.push(`/test-list?search=${e.target.value}&sort=${sort}&page=1`);
  };

  const handleClearSearch = () => {
    setSearchValue('');
  };

  const handleSetPage = page => {
    setCurrentPage(page);
    router.push(`/test-list?search=${searchValue}&sort=${sort}&page=${page}`);
  };

  return (
    <div className={s.tests}>
      <TestsNavbar sort={sort} />
      <Container className={s.container}>
        <div className={s.params}>
          <Button className={s.sort} onClick={handleSetSort}>
            <span>По дате создания</span>{' '}
            <Icon name='arrow' className={cn(s.sortArrow, { [s.up]: sort === 'created_at_asc' })} />
          </Button>
          <label htmlFor='search' className={s.searchLabel}>
            <Input
              id='search'
              className={s.search}
              value={searchValue}
              onChange={handleChangeSearch}
              placeholder='Поиск'
            />
            <Button className={s.deleteIcon} onClick={handleClearSearch}></Button>
          </label>
        </div>
        {allTests && <TestsList items={tests.tests} />}
        {allTests && (
          <Pagination
            currentPage={currentPage}
            totalPages={allTests.meta?.total_pages}
            handleSetPage={handleSetPage}
          />
        )}
      </Container>
    </div>
  );
};

export default Tests;
