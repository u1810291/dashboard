import React from 'react';
import { menuStructure, TabID } from '../../models/ForDevelopers.model';
import { CreateTab } from './CreateTab';

export function TabsMenu({ onClick, selectedId }: {
  onClick: (TabID) => void;
  selectedId: TabID;
}) {
  return menuStructure.map((item) => (
    <CreateTab tab={item} onClick={onClick} selectedId={selectedId} key={item.id} />
  ));
}
