
export const selectIdentity = (id) => ({ identities }) => identities.instances[id];

export function selectIdentityDeleting({ identities }) {
  return identities.deletingIdentities;
}
