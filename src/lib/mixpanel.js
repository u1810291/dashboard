export function addUser(user) {
  window.mixpanel.identify(user.id)
  window.mixpanel.people.set({
    $email: user.email,
    $first_name: user.firstName,
    $last_name: user.lastName
  });
}