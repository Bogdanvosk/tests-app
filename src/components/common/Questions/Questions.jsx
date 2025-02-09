import { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { QuestionTypeContext, SelectQuestionContext } from '@/components/pages/Test/Test';
import { useModalContext } from '../ModalProvider/ModalProvider';
import { toastify } from '@/utils/toastify';
import { deleteQuestionAction } from '@/store/features/test';

import { questionTypes } from '@/content';
import Button from '@/components/common/Button/Button';
import QuestionsList from '@/components/common/QuestionsList/QuestionsList';
import Dropdown from '@/components/common/Dropdown/Dropdown';

import s from './Questions.module.scss';

export const isOpenFormContext = createContext({ open: false, id: null });

const Questions = ({
  currentQuestions,
  currentTest,
  isQuestionFormOpen,
  setIsQuestionFormOpen,
  onCloseForm
}) => {
  const dispatch = useDispatch();
  const { showModal } = useModalContext();
  const { selectedQuestion, handleSelectQuestion } = useContext(SelectQuestionContext);
  const { setQuestionType } = useContext(QuestionTypeContext);

  const [questions, setQuestions] = useState([]);
  const [acceptedAction, setAcceptedAction] = useState(null);

  useEffect(() => {
    if (acceptedAction?.actionValue === 'delete-question') {
      handleDeleteQuestion(acceptedAction.id);
    }
  }, [acceptedAction]);

  useEffect(() => {
    currentQuestions && setQuestions(currentQuestions);

    if (selectedQuestion) handleSelectQuestion(selectedQuestion?.id);
  }, [currentTest, currentQuestions]);

  const handleSelectQuestionType = value => {
    setQuestionType(value);
  };

  const handleOpenQuestionForm = () => {
    setIsQuestionFormOpen(true);
  };

  const handleDeleteQuestion = id => {
    dispatch(deleteQuestionAction(id));
    toastify('success', 'Вопрос успешно удален');
    onCloseForm();
  };

  const acceptDeleteQuestion = id => {
    showModal('accept', {
      handleIsAccepted,
      actionValue: 'delete-question',
      id
    });
  };

  const handleIsAccepted = value => {
    setAcceptedAction(value);
  };

  return (
    <div>
      <isOpenFormContext.Provider value={{ open: isQuestionFormOpen, id: selectedQuestion?.id }}>
        <QuestionsList questions={questions} onDeleteQuestion={acceptDeleteQuestion} />
      </isOpenFormContext.Provider>

      <Button
        className={cn(s.button, s.addQuestion)}
        type='button'
        onClick={handleOpenQuestionForm}
      >
        Добавить вопрос
      </Button>
      <Dropdown options={questionTypes} onSelectOption={handleSelectQuestionType} />
    </div>
  );
};

export default Questions;

Questions.propTypes = {
  currentQuestions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      question_type: PropTypes.string,
      answer: PropTypes.number,
      answers: PropTypes.arrayOf(PropTypes.object)
    })
  ),
  currentTest: PropTypes.shape({
    created_at: PropTypes.string,
    id: PropTypes.number,
    title: PropTypes.string,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        question_type: PropTypes.string,
        answer: PropTypes.number,
        answers: PropTypes.arrayOf(PropTypes.object)
      })
    )
  }),
  isQuestionFormOpen: PropTypes.bool,
  setIsQuestionFormOpen: PropTypes.func,
  onCloseForm: PropTypes.func
};
