import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import PropTypes from 'prop-types';

import Icon from '../Icon/Icon';

import s from './SortableItem.module.scss';

function SortableItem({ field, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div style={style} className={s.item}>
      <div
        className={s.handleWrapper}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <Icon name='drag-handle' className={s.handle} />
      </div>
      {children}{' '}
    </div>
  );
}

export default SortableItem;

SortableItem.propTypes = {
  field: PropTypes.object,
  children: PropTypes.node,
};
