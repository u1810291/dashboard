
export const selectIdentity = (id) => ({ identities }) => identities.identities.find((item) => item.id === id);

export function selectIdentityDeleting({ identities }) {
  return identities.deletingIdentities;
}
