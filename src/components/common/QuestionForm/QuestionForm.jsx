import PropTypes from 'prop-types';
import cn from 'classnames';

import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import Input from '../Input/Input';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';

import s from './QuestionForm.module.scss';

const QuestionForm = ({ questionType = 'single' }) => {
  const [correctAnswer, setCorrectAnswer] = useState(null);

  const methods = useForm({
    defaultValues: {
      title: '',
      answers: [],
    },
  });

  useEffect(() => {
    methods.reset();
    setCorrectAnswer(null);
  }, [questionType]);

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'answers',
  });

  const handleSubmit = methods.handleSubmit((data) => {
    if (questionType === 'single') {
      const title = data.title;
      const answers = data.answers.map((answer, idx) => {
        return {
          text: answer.text,
          is_right: correctAnswer === fields[idx].id,
        };
      });
      console.log({ title, answers }); // TODO: add question with type "single"
    }
    if (questionType === 'multiple') console.log(data); // TODO: add question with type "multiple"

    if (questionType === 'number') console.log(data); // TODO: add question with type "number"
  });

  const handleChangeCorrectAnswer = (id) => {
    setCorrectAnswer(id);
  };

  const handleDeleteAnswer = (id) => {
    remove(id);
  };

  const handleAddAnswer = () => {
    if (questionType !== 'number' || fields.length < 1) {
      append({ text: '', is_right: false });
    }
  };

  return (
    <FormProvider {...methods}>
      <form className={s.form} onSubmit={handleSubmit}>
        <Input
          className={cn(s.input, s.text)}
          type='text'
          fieldName='title'
          placeholder='Введите вопрос'
        />

        <div className={s.answers}>
          {questionType === 'multiple' &&
            fields.map((field, index) => {
              return (
                <div className={s.answer} key={field.id}>
                  <Input
                    className={s.input}
                    type='text'
                    fieldName={`answers.${index}.text`}
                    placeholder='Введите вариант ответа'
                  />
                  <Input
                    className={s.checkbox}
                    type='checkbox'
                    fieldName={`answers[${index}].is_right`}
                    defaultChecked={field.is_right}
                  />
                  <div onClick={() => handleDeleteAnswer(index)}>
                    <Icon name='delete' className={s.delete} />
                  </div>
                </div>
              );
            })}

          {questionType === 'single' &&
            fields.map((field, index) => {
              return (
                <div className={s.answer} key={field.id}>
                  <Input
                    className={s.input}
                    type='text'
                    fieldName={`answers.${index}.text`}
                    placeholder='Введите вариант ответа'
                  />
                  <Input
                    className={s.checkbox}
                    type='checkbox'
                    fieldName={`answers.${index}.is_right`}
                    checked={correctAnswer === field.id}
                    onChange={() => handleChangeCorrectAnswer(field.id)}
                  />
                  <div onClick={() => handleDeleteAnswer(index)}>
                    <Icon name='delete' className={s.delete} />
                  </div>
                </div>
              );
            })}

          {questionType === 'number' &&
            fields.map((field, index) => {
              return (
                <div className={s.answer} key={field.id}>
                  <Input
                    className={s.input}
                    type='number'
                    fieldName={`answers.${index}.text`}
                    placeholder='Введите вариант ответа'
                  />
                </div>
              );
            })}

          <Button className={s.button} type='button' onClick={handleAddAnswer}>
            {/* TODO: dispatch action to add new answer */}
            Добавить вариант ответа
          </Button>
        </div>
        <Button className={s.button} type='submit'>
          Сохранить вопрос
        </Button>
      </form>
    </FormProvider>
  );
};

export default QuestionForm;

QuestionForm.propTypes = {
  questionType: PropTypes.oneOf(['single', 'multiple', 'number']),
};
