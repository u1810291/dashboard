export function updateIntercom(user) {
  window.Intercom('update', {
    name: user.firstName + ' ' + user.lastName,
    user_id: user.id
  });
}

export function showIntercom() {
  window.Intercom('show')
}