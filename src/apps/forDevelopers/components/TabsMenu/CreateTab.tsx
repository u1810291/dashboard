import { useIntl } from 'react-intl';
import Button from '@material-ui/core/Button';
import cn from 'classnames';
import React, { useCallback } from 'react';
import { CascadeMenuButton } from '../CascadeMenuButton/CascadeMenuButton';
import { useStyles } from './TabsMenu.styles';
import { Tab, TabID } from '../../models/ForDevelopers.model';

export function CreateTab({ tab, onClick, selectedId }: {
  tab: Tab;
  onClick: (TabID) => void;
  selectedId: TabID;
}) {
  const classes = useStyles();
  const intl = useIntl();

  const handleRedirect = useCallback((url: string) => {
    window.open(url, '_blank', 'noopener');
  }, []);

  const handleClick = useCallback((tabData: Tab) => () => {
    if (tabData.link) {
      handleRedirect(tabData.link);
      return;
    }
    onClick(tabData.id);
  }, [onClick, handleRedirect]);

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
      onClick={handleClick(tab)}
      id={tab.id}
      data-qa={tab.qa}
      fullWidth
    >
      {intl.formatMessage({ id: `forDevs.sideMenu.${tab.id}` })}
    </Button>
  );
}
