import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getAllTestsAction } from '@/store/features/test';

import TestsNavbar from '@/components/common/TestsNavbar/TestsNavbar';

import s from './Tests.module.scss'

const Tests = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTestsAction());
  }, []);
  return (
    <div className={s.tests}>
      <TestsNavbar />
    </div>
  );
};

export default Tests;
