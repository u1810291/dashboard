import { createSelector } from 'reselect';
import { COLLABORATOR_STORE_KEY, CollaboratorSliceName } from './collaborator.store';
import { selectModelValue } from '../../../lib/loadable.selectors';

export const selectCollaboratorState = (state) => state[COLLABORATOR_STORE_KEY];

export const selectCollaboratorCollectionModel = createSelector(
  selectCollaboratorState,
  (store) => store[CollaboratorSliceName.CollaboratorList],
);

export const selectCollaboratorCollection = createSelector(
  selectCollaboratorCollectionModel,
  selectModelValue(),
);

export const selectCollaborator = createSelector(
  selectCollaboratorState,
  (store) => store[CollaboratorSliceName.Collaborator],
);
