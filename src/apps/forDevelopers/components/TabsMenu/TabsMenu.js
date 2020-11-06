import Button from '@material-ui/core/Button';
import React from 'react';
import { useIntl } from 'react-intl';
import cn from 'classnames';
import { menuStructure } from '../../../../models/ForDevelopers.model';
import { CascadeMenuButton } from '../CascadeMenuButton/CascadeMenuButton';
import { useStyles } from './TabsMenu.styles';

export const TabsMenu = ({ onClick, selectedId }) => {
  const classes = useStyles();
  const intl = useIntl();

  const CreateTab = ({ tab }) => {
    if (tab.children) {
      return (
        <CascadeMenuButton key={tab.id} tab={tab} selectedId={selectedId} defaultOpen={tab.defaultOpen}>
          {tab.children.map((item) => (<CreateTab key={item.id} tab={item} />))}
        </CascadeMenuButton>
      );
    }
    return (
      <Button
        className={cn(classes.button, { [classes.selected]: tab.id === selectedId })}
        onClick={() => onClick(tab.id)}
        key={tab.id}
        id={tab.id}
        fullWidth
      >
        {intl.formatMessage({ id: `forDevs.sideMenu.${tab.id}` })}
      </Button>
    );
  };

  return (
    <>
      {menuStructure.map((item) => (<CreateTab key={item.id} tab={item} />))}
    </>
  );
};
