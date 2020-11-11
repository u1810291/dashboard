import React from 'react';
import { menuStructure } from '../../../../models/ForDevelopers.model';
import { CreateTab } from './CreateTab';

export function TabsMenu({ onClick, selectedId }) {
  return menuStructure.map((item) => (
    <CreateTab tab={item} onClick={onClick} selectedId={selectedId} key={item.id} />
  ));
}
