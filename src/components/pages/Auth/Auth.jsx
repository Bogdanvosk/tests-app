import Image from 'next/image';

import { authTabs } from '@/content';
import { useDispatch, useSelector } from 'react-redux';
import { selectMode } from '@/store/features/auth/selectors';
import { useRouter } from 'next/router';

import authImg from '@/assets/auth.png';
import logoImg from '@/assets/logo.png';

import Container from '../../common/Container/Container';
import Logo from '../../common/Logo/Logo';
import Tabs from '../../common/Tabs/Tabs';
import Form from '../../common/Form/Form';

import s from './Auth.module.scss';
import Button from '@/components/common/Button/Button';
import { getUserAction } from '@/store/features/auth';
import useLocalStorage from '@/hooks/useLocalStorage';

const Auth = () => {
  const [mode, setMode] = useLocalStorage('mode');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSetFormMode = (modeValue) => {
    if (modeValue === 'signUp') router.push('/sign-up');
    else router.push('/sign-in');

    setMode(modeValue);
  };

  return (
    <div className={s.auth}>
      <Container>
        <div className={s.wrapper}>
          <div className={s.content}>
            <Logo imageSrc={logoImg} />
            <h1 className={s.title}>Продолжайте обучение с QuizWiz!</h1>
            <Tabs
              activeTab={mode}
              tabs={authTabs}
              onSetFormMode={handleSetFormMode}
            />
            <Form mode={mode} className={s.form} />
          </div>
          <div className={s.image}>
            <Image width={450} src={authImg} alt='Auth' />
          </div>
          <Button onClick={() => dispatch(getUserAction())}>get user</Button>
        </div>
      </Container>
    </div>
  );
};

export default Auth;
