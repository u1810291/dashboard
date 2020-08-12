import { createSelector } from 'reselect';
import { COLLABORATOR_STORE_KEY, CollaboratorSliceName } from './collaborator.store';

export const selectCollaboratorState = (state) => state[COLLABORATOR_STORE_KEY];

export const selectCollaboratorCollection = createSelector(
  selectCollaboratorState,
  (store) => store[CollaboratorSliceName.CollaboratorList],
);
