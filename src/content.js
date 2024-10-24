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

export const authFormInputs = [
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

export const questionTypes = [
  { id: "1", value: 'single', text: 'Один из списка' },
  { id: "2", value: 'multiple', text: 'Несколько из списка' },
  { id: "3", value: 'number', text: 'Численный ответ' },
];
