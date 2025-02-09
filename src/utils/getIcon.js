import Delete from '@/components/icons/Delete';
import Password from '@/components/icons/Password';
import Submit from '@/components/icons/Submit';
import Create from '@/components/icons/Tabs/Create';
import User from '@/components/icons/Tabs/User';
import Username from '@/components/icons/Username';
import DragHandle from '@/components/icons/DragHandle';

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
    default:
      break;
  }
};
