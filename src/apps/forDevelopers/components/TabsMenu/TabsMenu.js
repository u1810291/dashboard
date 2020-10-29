import Button from '@material-ui/core/Button';
import React from 'react';
import { TabID, TabType } from '../../../../models/ForDevelopers.model';
import { CascadeMenuButton } from '../CascadeMenuButton/CascadeMenuButton';

const createTab = (tab, onClick) => {
  switch (tab.type) {
    case TabType.CASCADE_TAB:
      return (
        <CascadeMenuButton name={tab.name} id={tab.id}>
          {tab.children.map((item) => createTab(item, onClick))}
        </CascadeMenuButton>
      );
    case TabType.TAB:
      return (<Button onClick={() => onClick(tab.id)} id={tab.id}>{tab.name}</Button>);
    default:
      return null;
  }
};

const menuStructure = [
  {
    id: TabID.API,
    name: 'API',
    type: TabType.TAB,
  },
  {
    id: TabID.SDK,
    name: 'SDK',
    type: TabType.CASCADE_TAB,
    children: [
      {
        id: TabID.WEB,
        name: 'WEB',
        type: TabType.TAB,
      },
      {
        id: TabID.MOBILE,
        name: 'Mobile',
        type: TabType.CASCADE_TAB,
        children: [
          {
            id: TabID.NATIVE,
            name: 'Native',
            type: TabType.CASCADE_TAB,
            children: [
              {
                id: TabID.IOS,
                name: 'IOS',
                type: TabType.TAB,
              },
              {
                id: TabID.ANDROID,
                name: 'Android',
                type: TabType.TAB,
              },
            ],
          },
          {
            id: TabID.HYBRID,
            name: 'Hybrid',
            type: TabType.TAB,
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
];

export const TabsMenu = ({ onClick }) => (
  <>
    {menuStructure.map((item) => createTab(item, onClick))}
  </>
);
