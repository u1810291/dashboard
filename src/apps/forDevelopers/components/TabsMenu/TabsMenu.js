import Button from '@material-ui/core/Button';
import React from 'react';
import { useIntl } from 'react-intl';
import cn from 'classnames';
import { menuStructure } from '../../../../models/ForDevelopers.model';
import { CascadeMenuButton } from '../CascadeMenuButton/CascadeMenuButton';
import { useStyles } from './TabsMenu.styles';

const CreateTab = ({ tab, onClick, selectedId }) => {
  const classes = useStyles();
  const intl = useIntl();
  if (tab.children) {
    return (
      <CascadeMenuButton tab={tab} selectedId={selectedId} defaultOpen={tab.defaultOpen}>
        {tab.children.map((item) => (
          <CreateTab tab={item} onClick={onClick} selectedId={selectedId} key={item.id} />
        ))}
      </CascadeMenuButton>
    );
  }
  return (
    <Button
      className={cn(classes.button, { [classes.selected]: tab.id === selected })}
      onClick={() => onClick(tab.id)}
      id={tab.id}
      fullWidth
    >
      {intl.formatMessage({ id: `forDevs.sideMenu.${tab.id}` })}
    </Button>
  );
};

export const TabsMenu = ({ onClick, selected }) => (
  <>
    {menuStructure.map((item) => (
      <CreateTab tab={item} onClick={onClick} selected={selected} key={item.id} />
    ))}
  </>
);
