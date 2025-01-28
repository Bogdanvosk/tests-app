import PropTypes from 'prop-types';
import { DndContext } from '@dnd-kit/core';

import { useContext } from 'react';
import { SelectQuestionContext } from '@/components/pages/Test/Test';
import { CorrectAnswerContext, EditingAnswerContext } from '../QuestionForm/QuestionForm';
import { useDispatch } from 'react-redux';
import { updatePositionAction } from '@/store/features/test';
import { toastify } from '@/utils/toastify';

const DndArea = ({ fields, move, children }) => {
  const dispatch = useDispatch();

  const { selectedQuestion } = useContext(SelectQuestionContext);
  const { correctAnswer, setCorrectAnswer } = useContext(CorrectAnswerContext);
  const editingAnswerId = useContext(EditingAnswerContext);

  const handleDragEnd = (event) => {
    console.log('editingAnswerId', editingAnswerId);
    
    if (!selectedQuestion) {
      toastify('warning', 'Завершите редактирование вопроса');
      return;
    }
    if (editingAnswerId !== null) {
      toastify('warning', 'Завершите редактирование ответа');
      return;
    }

    const { active, over } = event;
    const field = fields.find((f) => f.id === active.id);
    const answerId = selectedQuestion.answers.find(
      (a) => a.text === field.text
    ).id;

    if (over === null) {
      return;
    }

    if (active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);

      dispatch(
        updatePositionAction({
          questionId: selectedQuestion.id,
          position: newIndex,
          answerId,
        })
      );

      move(oldIndex, newIndex);
      toastify('success', 'Порядок изменен');

      // Присваиваю корректный индекс правильного ответа
      if (correctAnswer === oldIndex) setCorrectAnswer(newIndex);
      if (correctAnswer === newIndex) setCorrectAnswer(oldIndex);

      if (correctAnswer >= newIndex && correctAnswer < oldIndex) {
        setCorrectAnswer(correctAnswer + 1);
      } else if (correctAnswer <= newIndex && correctAnswer > oldIndex) {
        setCorrectAnswer(correctAnswer - 1);
      }
    }
  };

  return <DndContext onDragEnd={handleDragEnd}>{children}</DndContext>;
};

export default DndArea;

DndArea.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      is_right: PropTypes.bool,
    })
  ),
  children: PropTypes.node,
  move: PropTypes.func,
};
