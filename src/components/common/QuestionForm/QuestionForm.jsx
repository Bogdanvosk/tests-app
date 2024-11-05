import PropTypes from 'prop-types';
import cn from 'classnames';
import { DndContext } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';

import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { useEffect, useState } from 'react';

import Input from '../Input/Input';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import SortableItem from '../SortableItem/SortableItem';

import s from './QuestionForm.module.scss';

const QuestionForm = ({ questionType }) => {
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

  const { fields, append, remove, move } = useFieldArray({
    control: methods.control,
    name: 'answers',
  });

  console.log(fields.length);

  const handleSubmit = methods.handleSubmit((data) => {
    // methods.clearErrors('answers');

    if (
      (questionType === 'single' || questionType === 'multiple') &&
      fields.length < 2
    ) {
      console.log('sadasdsad');

      methods.setError('answers', {
        type: 'min',
        message: 'Required at least 2 answers',
      });
      return;
    }

    if (questionType === 'single') {
      const title = data.title;
      const answers = data.answers.map((answer, idx) => {
        return {
          text: answer.text,
          is_right: correctAnswer === fields[idx].id,
        };
      });
      // console.log({ title, answers }); // TODO: add question with type "single" (api call)
    }
    if (questionType === 'multiple') console.log(data); // TODO: add question with type "multiple" (api call)

    if (questionType === 'number') console.log(data); // TODO: add question with type "number" (api call)
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

  // TODO: add changing position field of answer in API
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over == null) {
      return;
    }
    if (active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      move(oldIndex, newIndex);
    }
  };

  console.log(methods.formState.errors);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <FormProvider {...methods}>
        <form className={s.form} onSubmit={handleSubmit}>
          <Input
            className={cn(s.input, s.text)}
            type='text'
            fieldName='title'
            placeholder='Введите вопрос'
          />

          <div className={s.answers}>
            <SortableContext items={fields}>
              {questionType === 'multiple' &&
                fields.map((field, index) => {
                  return (
                    <SortableItem field={field} key={field.id}>
                      <div className={s.answer}>
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
                    </SortableItem>
                  );
                })}

              {questionType === 'single' &&
                fields.map((field, index) => {
                  return (
                    <SortableItem field={field} key={field.id}>
                      <div className={s.answer}>
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
                          checked={correctAnswer === field.id}
                          onChange={() => handleChangeCorrectAnswer(field.id)}
                        />
                        <div onClick={() => handleDeleteAnswer(index)}>
                          <Icon name='delete' className={s.delete} />
                        </div>
                      </div>
                    </SortableItem>
                  );
                })}
            </SortableContext>

            {questionType === 'number' &&
              fields.map((field, index) => {
                return (
                  <div className={cn(s.answer, s.number)} key={field.id}>
                    <Input
                      className={s.input}
                      type='number'
                      fieldName={`answers.${index}.text`}
                      placeholder='Введите вариант ответа'
                    />
                  </div>
                );
              })}
          </div>
          <Button className={s.button} type='button' onClick={handleAddAnswer}>
            {/* TODO: dispatch action to add new answer */}
            Добавить вариант ответа
          </Button>
          <div>
            <Button className={s.button} type='submit'>
              Сохранить вопрос
            </Button>
            {methods.formState.errors && <p>Error</p>}
          </div>
        </form>
      </FormProvider>
    </DndContext>
  );
};

export default QuestionForm;

QuestionForm.propTypes = {
  questionType: PropTypes.oneOf(['single', 'multiple', 'number']),
};
