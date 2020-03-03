import { LoadableAdapter } from 'lib/Loadable.adapter';
import { createReducer } from 'state/utils';
import { CollaboratorSliceName, CollaboratorActionGroups } from './collaborator.model';

const initialState = {
  [CollaboratorSliceName.CollaboratorList]: LoadableAdapter.createState([]),
};

export default createReducer(initialState, {
  ...LoadableAdapter.createHandlers(CollaboratorActionGroups.CollaboratorList, CollaboratorSliceName.CollaboratorList),
});
