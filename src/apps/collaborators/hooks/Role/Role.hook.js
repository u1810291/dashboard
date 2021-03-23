import { useSelector } from 'react-redux';
import { selectIsOwnerModel } from 'state/merchant/merchant.selectors';
import { CollaboratorRoles } from 'models/Collaborator.model';

export function useRole() {
  const ownerModel = useSelector(selectIsOwnerModel);
  const isOwner = ownerModel.isLoaded && ownerModel.value === true;
  return isOwner ? CollaboratorRoles.ADMIN : CollaboratorRoles.AGENT;
}
