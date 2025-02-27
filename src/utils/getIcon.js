import Delete from '@/components/icons/Delete';
import Password from '@/components/icons/Auth/Password';
import Submit from '@/components/icons/Submit';
import Create from '@/components/icons/Auth/Create';
import User from '@/components/icons/Auth/User';
import Username from '@/components/icons/Auth/Username';
import DragHandle from '@/components/icons/DragHandle';
import Arrow from '@/components/icons/Arrow';
import Edit from '@/components/icons/Edit';

export const getIcon = iconName => {
  switch (iconName) {
    case 'create':
      return Create;
    case 'user':
      return User;
    case 'username':
      return Username;
    case 'password':
      return Password;
    case 'submit':
      return Submit;
    case 'delete':
      return Delete;
    case 'drag-handle':
      return DragHandle;
    case 'arrow':
      return Arrow;
    case 'edit':
      return Edit;
    default:
      break;
  }
};
