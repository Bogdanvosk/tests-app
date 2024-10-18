import PropTypes from 'prop-types';
import cn from 'classnames';

import { formInputs } from '../../../content';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { signInAction, signUpAction } from '../../../store/features/auth';
import {
  selectError,
  selectUser,
} from '../../../store/features/auth/selectors';

import Button from '../Button/Button';
import Input from '../Input/Input';
import Label from '../Label/Label';

import s from './Form.module.scss';
import { useRouter } from 'next/router';

const Form = ({ mode, className = '' }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const serverError = useSelector(selectError);
  const dispatch = useDispatch();
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
  }, [mode]);

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
          {formInputs.map((input) => {
            if (input.mode.includes(mode)) {
              return (
                <Label key={input.fieldName} title={input.title}>
                  <Input
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
            <Input
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

export default Form;

Form.propTypes = {
  mode: PropTypes.string,
  classNames: PropTypes.string,
};
