export const authTabs = [
  {
    mode: 'signIn',
    title: 'Войти',
    name: 'user',
  },
  {
    mode: 'signUp',
    title: 'Создать аккаунт',
    name: 'create',
  },
];

export const formInputs = [
  {
    title: 'Логин',
    fieldName: 'username',
    placeholder: 'Логин',
    type: 'text',
    mode: ['signIn', 'signUp'],
  },
  {
    title: 'Пароль',
    fieldName: 'password',
    placeholder: 'Пароль',
    type: 'password',
    mode: ['signIn', 'signUp'],
  },
  {
    title: 'Подтвердите пароль',
    fieldName: 'password_confirmation',
    placeholder: 'Подтвердите пароль',
    type: 'password',
    mode: ['signUp'],
  },
];
