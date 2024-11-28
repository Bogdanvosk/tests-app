import Image from 'next/image';

import { authTabs } from '@/content';
import { useRouter } from 'next/router';
import useLocalStorage from '@/hooks/useLocalStorage';

import Container from '../../common/Container/Container';
import Logo from '../../common/Logo/Logo';
import Tabs from '../../common/Tabs/Tabs';
import AuthForm from '../../common/AuthForm/AuthForm';

import s from './Auth.module.scss';

const Auth = () => {
  const [mode, setMode] = useLocalStorage('mode');
  const router = useRouter();

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
            <Logo imageSrc={'/logo.png'} />
            <h1 className={s.title}>Продолжайте обучение с QuizWiz!</h1>
            <Tabs
              activeTab={mode}
              tabs={authTabs}
              onSetFormMode={handleSetFormMode}
            />
            <AuthForm mode={mode} className={s.form} />
          </div>
          <div className={s.image}>
            <Image width={450} height={450} src={'/auth.png'} alt='Auth' />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Auth;
