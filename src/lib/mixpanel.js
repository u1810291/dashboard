export function addUser(user) {
  window.mixpanel.identify(user.id)
  window.mixpanel.people.set({
    $email: user.email,
    account_name: user.firstName,
    account_lastname: user.lastName
  });
}