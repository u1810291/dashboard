import { isEmpty } from 'lodash';
import { createSelector } from 'reselect';


export const selectCollaboratorState = (state) => state.collaborators;

export const selectCollaborators = createSelector(
  selectCollaboratorState,
  (state) => state.collaborators
    .filter((item) => !isEmpty(item.user))
    .map((item) => ({
      role: item.role,
      name: `${item.user.firstName} ${item.user.lastName}`,
      id: item.user.id,
      email: item.user.email,
    })),
);
