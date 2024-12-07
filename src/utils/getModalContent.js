import Accept from '@/components/common/Accept/Accept';

export const getModalContent = (type) => {
  switch (type) {
    case 'accept':
      return Accept;
    default:
      return null;
  }
};
