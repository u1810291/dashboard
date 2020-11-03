import Button from '@material-ui/core/Button';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { TabID, TabType } from '../../../../models/ForDevelopers.model';
import { CascadeMenuButton } from '../CascadeMenuButton/CascadeMenuButton';
import { useStyles } from './TabsMenu.styles';

export const TabsMenu = ({ onClick, selected }) => {
  const classes = useStyles();
  const intl = useIntl();

  const getMenuStructure = useCallback(() => ([
    {
      id: TabID.API,
      name: intl.formatMessage({ id: 'forDevs.sideMenu.api' }),
      type: TabType.TAB,
    },
    {
      id: TabID.SDK,
      name: intl.formatMessage({ id: 'forDevs.sideMenu.sdk' }),
      type: TabType.CASCADE_TAB,
      children: [
        {
          id: TabID.WEB,
          name: intl.formatMessage({ id: 'forDevs.sideMenu.web' }),
          type: TabType.TAB,
        },
        {
          id: TabID.MOBILE,
          name: intl.formatMessage({ id: 'forDevs.sideMenu.mobile' }),
          type: TabType.CASCADE_TAB,
          children: [
            {
              id: TabID.NATIVE,
              name: intl.formatMessage({ id: 'forDevs.sideMenu.native' }),
              type: TabType.CASCADE_TAB,
              children: [
                {
                  id: TabID.IOS,
                  name: intl.formatMessage({ id: 'forDevs.sideMenu.ios' }),
                  type: TabType.TAB,
                },
                {
                  id: TabID.ANDROID,
                  name: intl.formatMessage({ id: 'forDevs.sideMenu.android' }),
                  type: TabType.TAB,
                },
              ],
            },
            {
              id: TabID.HYBRID,
              name: intl.formatMessage({ id: 'forDevs.sideMenu.hybrid' }),
              type: TabType.CASCADE_TAB,
              children: [
                {
                  id: TabID.REACT_NATIVE,
                  name: intl.formatMessage({ id: 'forDevs.sideMenu.reactNative' }),
                  type: TabType.TAB,
                },
                {
                  id: TabID.XAMARIN,
                  name: intl.formatMessage({ id: 'forDevs.sideMenu.xamarin' }),
                  type: TabType.TAB,
                },
                {
                  id: TabID.CORDOVA,
                  name: intl.formatMessage({ id: 'forDevs.sideMenu.cordova' }),
                  type: TabType.TAB,
                },
                {
                  id: TabID.CORDOVA_IONIC,
                  name: intl.formatMessage({ id: 'forDevs.sideMenu.cordovaIonic' }),
                  type: TabType.TAB,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: TabID.DIRECT_LINK,
      name: 'Direct Link',
      type: TabType.TAB,
    },
  ]), [intl]);

  const createTab = useCallback((tab) => {
    switch (tab.type) {
      case TabType.CASCADE_TAB:
        return (
          <CascadeMenuButton name={tab.name} id={tab.id}>
            {tab.children.map((item) => createTab(item, onClick))}
          </CascadeMenuButton>
        );
      case TabType.TAB:
        return (
          <Button
            className={`${classes.button} ${tab.id === selected && classes.selected}`}
            onClick={() => onClick(tab.id)}
            id={tab.id}
            fullWidth
          >
            {tab.name}
          </Button>
        );
      default:
        return null;
    }
  }, [classes.selected, onClick, selected]);

  return (
    <>
      {getMenuStructure().map((item) => createTab(item))}
    </>
  );
};
