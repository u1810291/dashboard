export function selectIsOwner({ merchant, auth }) {
  if (!merchant.collaborators) {
    // means loading
    return false;
  }
  const userId = auth.user.id;
  const collaborators = merchant.collaborators || [];
  return collaborators.findIndex((item) => item.user === userId && item.role === 2) < 0;
}

export function selectIsBlocked({ merchant }) {
  return [
    !!merchant.blockedAt,
    // is loading
    merchant.blockedAt === undefined,
  ];
}
