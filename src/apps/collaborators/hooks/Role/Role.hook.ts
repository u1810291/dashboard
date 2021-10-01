import { useSelector } from 'react-redux';
import { selectIsOwnerModel, selectUserRole } from 'state/merchant/merchant.selectors';
import { CollaboratorRoles } from 'models/Collaborator.model';

export function useRole(): CollaboratorRoles {
  const ownerModel = useSelector(selectIsOwnerModel);
  const userRole = useSelector(selectUserRole);

  const isOwner = ownerModel.isLoaded && ownerModel.value === true;
  return isOwner ? CollaboratorRoles.ADMIN : userRole;
}
