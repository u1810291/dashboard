import { selectLoadableValue, selectModelValue } from 'lib/loadable.selectors';
import { createSelector } from 'reselect';
import { CollaboratorRoles, WithAuditor } from 'models/Collaborator.model';
import { selectUserRole, selectMerchantName, selectOwnerId, selectMerchantEmail } from 'state/merchant/merchant.selectors';
import { COLLABORATOR_STORE_KEY, CollaboratorSliceName } from './collaborator.store';

export const selectCollaboratorState = (state) => state[COLLABORATOR_STORE_KEY];

export const selectCollaboratorCollectionModel = createSelector(
  selectCollaboratorState,
  (store) => store[CollaboratorSliceName.CollaboratorList],
);

export const selectCollaboratorCollection = createSelector(
  selectCollaboratorCollectionModel,
  selectModelValue(),
);

export const selectCollaboratorCollectionWithOwnerModel = createSelector(
  selectCollaboratorCollectionModel,
  selectOwnerId,
  selectMerchantName,
  selectMerchantEmail,
  selectUserRole,
  selectLoadableValue((collaborators, id, displayName, email, userRole) => {
    const list = [...collaborators];
    if (WithAuditor.includes(userRole)) {
      list.unshift({
        role: CollaboratorRoles.ADMIN,
        user: {
          id,
          displayName,
          email,
        },
      });
    }
    return list;
  }),
);

export const selectCollaborator = createSelector(
  selectCollaboratorState,
  (store) => store[CollaboratorSliceName.Collaborator],
);
