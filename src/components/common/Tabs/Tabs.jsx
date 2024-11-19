import PropTypes from 'prop-types';
import cn from 'classnames';

import Typography from '../Typography/Typography';
import Icon from '../Icon/Icon';

import s from './Tabs.module.scss';

const Tabs = ({ activeTab, tabs, onSetFormMode }) => {
  const handleClickTab = (mode) => {
    onSetFormMode(mode);
  };

  return (
    <div className={s.tabs}>
      {tabs.map((tab, index) => (
        <div
          key={`tab-${tab.title}_${index}`}
          className={cn(s.tab, { [s.active]: activeTab === tab.mode })}
          onClick={() => handleClickTab(tab.mode)}
        >
          <Icon name={tab.name} className={s.icon} />
          <Typography tag='p' className={s.title}>
            {tab.title}
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default Tabs;

Tabs.propTypes = {
  activeTab: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      mode: PropTypes.string,
      name: PropTypes.string,
  })),
  onSetFormMode: PropTypes.func,
};