import cn from 'classnames';
import { toast } from 'react-toastify';

export const toastify = (type, message, classNames = '') => {
  switch (type) {
    case 'success':
      return toast.success(message, {
        classname: cn(classNames),
      });
    case 'error':
      return toast.error(message, {
        classname: cn(classNames),
      });
    case 'info':
      return toast.info(message, {
        classname: cn(classNames),
      });
    case 'warning':
      return toast.warning(message, {
        classname: cn(classNames),
      });
    default:
      return toast(message);
  }
};
