export function updateIntercom(user) {
  if (process.env.NODE_ENV === 'production') {
    window.Intercom('update', {
      name: `${user.firstName} ${user.lastName}`,
      user_id: user.id,
      email: user.email,
    });
  }
}

export function updateData(data) {
  if (process.env.NODE_ENV === 'production') {
    window.Intercom('update', data);
  }
}

export function showIntercom() {
  window.Intercom('show');
}
