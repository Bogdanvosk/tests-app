import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { authFormInputs } from '@/content';
import { signInAction, signUpAction } from '@/store/features/auth';
import { selectError, selectUser } from '@/store/features/auth/selectors';
import useLocalStorage from '@/hooks/useLocalStorage';

import Button from '../Button/Button';
import AuthInput from '../AuthInput/AuthInput';
import Label from '../Label/Label';

import s from './AuthForm.module.scss';

const AuthForm = ({ mode, className = '' }) => {
  const [user, setUser] = useLocalStorage('user');
  const [isAdmin, setIsAdmin] = useState(false);
  const serverError = useSelector(selectError);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const router = useRouter();

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
      password_confirmation: '',
    },
  });

  useEffect(() => {
    methods.clearErrors();
    methods.reset();
  }, [mode, methods]);

  useEffect(() => {
    if (currentUser !== null) {
      setUser(currentUser);
      currentUser.is_admin ? router.push('/test') : router.push('/tests');
    }
  }, [currentUser, router, setUser, methods]);

  const handleSubmit = methods.handleSubmit((data) => {
    const signInData = { username: data.username, password: data.password };
    const signUpData = {
      ...data,
      is_admin: isAdmin,
    };

    if (mode === 'signIn') dispatch(signInAction(signInData));
    else dispatch(signUpAction(signUpData));

    methods.reset();
  });

  const onCheckboxChange = () => {
    setIsAdmin(!isAdmin);
  };

  const handleSetServerError = () => {
    return (
      serverError?.error ||
      (serverError?.password && `Password ${serverError.password}`) ||
      (serverError?.username && `Username ${serverError.username}`) ||
      ''
    );
  };

  return (
    <FormProvider {...methods}>
      <form className={cn(s.form, className)} onSubmit={handleSubmit}>
        <div className={s.inputs}>
          {authFormInputs.map((input) => {
            if (input.mode.includes(mode)) {
              return (
                <Label key={input.fieldName} title={input.title}>
                  <AuthInput
                    className={s.input}
                    placeholder={input.placeholder}
                    type={input.type}
                    fieldName={input.fieldName}
                  />
                </Label>
              );
            }
          })}
        </div>

        {mode === 'signUp' && (
          <Label title='Администратор' className={s.admin} reversed>
            <AuthInput
              type='checkbox'
              checkboxValue={isAdmin}
              handleCheckboxChange={onCheckboxChange}
            />
          </Label>
        )}

        <span className={s.error}>{handleSetServerError()}</span>
        <Button
          variant='tabs'
          iconName='submit'
          type='submit'
          className={s.button}
        >
          {mode === 'signIn' ? 'Войти' : 'Создать аккаунт'}
        </Button>
      </form>
    </FormProvider>
  );
};

export default AuthForm;

AuthForm.propTypes = {
  mode: PropTypes.string,
  classNames: PropTypes.string,
};
