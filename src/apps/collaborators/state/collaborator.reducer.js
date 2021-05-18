import { LoadableAdapter } from 'lib/Loadable.adapter';
import { createReducer } from 'state/utils';
import { CollaboratorActionGroups, CollaboratorSliceName } from './collaborator.store';

const initialState = {
  [CollaboratorSliceName.CollaboratorList]: LoadableAdapter.createState([]),
  [CollaboratorSliceName.Collaborator]: LoadableAdapter.createState(),
};

export default createReducer(initialState, {
  ...LoadableAdapter.createHandlers(CollaboratorActionGroups.CollaboratorList, CollaboratorSliceName.CollaboratorList),
  ...LoadableAdapter.createHandlers(CollaboratorActionGroups.Collaborator, CollaboratorSliceName.Collaborator),
});
