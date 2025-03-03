import cn from 'classnames';
import PropTypes from 'prop-types';

import Button from '../Button/Button';
import Typography from '../Typography/Typography';

import { useModalContext } from '../ModalProvider/ModalProvider';

import s from './Accept.module.scss';

const Accept = ({
  handleIsAccepted,
  actionValue,
  id = null,
  title = 'Вы уверены?',
  success,
  fail
}) => {
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
        {title}
      </Typography>
      <div className={s.buttons}>
        <Button className={s.button} onClick={onAccept}>
          {success || 'Да'}
        </Button>
        {fail && (
          <Button className={cn(s.button, s.cancel)} onClick={onCloseModal}>
            {fail}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Accept;

Accept.propTypes = {
  handleIsAccepted: PropTypes.func,
  actionValue: PropTypes.string,
  id: PropTypes.number
};
