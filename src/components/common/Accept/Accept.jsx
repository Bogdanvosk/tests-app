import cn from 'classnames';

import Button from '../Button/Button';
import Typography from '../Typography/Typography';

import { useModalContext } from '../ModalProvider/ModalProvider';

import s from './Accept.module.scss';

const Accept = ({ handleIsAccepted, actionValue, id }) => {
  const { hideModal } = useModalContext();

  const onCloseModal = () => {
    hideModal();
  };

  const onAccept = () => {
    handleIsAccepted({ actionValue, id });
    hideModal();
  };

  return (
    <div className={s.accept}>
      <Typography tag='p' className={s.title}>
        Вы уверены?
      </Typography>
      <div className={s.buttons}>
        <Button className={s.button} onClick={onAccept}>
          Да
        </Button>
        <Button className={cn(s.button, s.cancel)} onClick={onCloseModal}>
          Отмена
        </Button>
      </div>
    </div>
  );
};

export default Accept;
