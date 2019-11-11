
export function selectAuthToken({ auth }) {
  return auth.token;
}

export function selectAuthUser({ auth }) {
  return auth.user;
}

export function selectUserEmail({ auth }) {
  return auth.user.email;
}
