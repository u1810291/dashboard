import { useIntl } from 'react-intl';
import Button from '@material-ui/core/Button';
import cn from 'classnames';
import React from 'react';
import { CascadeMenuButton } from '../CascadeMenuButton/CascadeMenuButton';
import { useStyles } from './TabsMenu.styles';

export function CreateTab({ tab, onClick, selectedId }) {
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
      className={cn(classes.button, { [classes.selected]: tab.id === selectedId })}
      onClick={() => onClick(tab.id)}
      id={tab.id}
      data-qa={tab.qa}
      fullWidth
    >
      {intl.formatMessage({ id: `forDevs.sideMenu.${tab.id}` })}
    </Button>
  );
}
