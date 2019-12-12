export function addUser(user) {
  if (!window.mixpanel) {
    console.warn('Mixpanel was not initialized');
    return;
  }
  window.mixpanel.identify(user.id);
  window.mixpanel.people.set({
    $email: user.email,
    $first_name: user.firstName,
    $last_name: user.lastName,
    lead_qualification: 0,
    is_live: false,
  });
}

export function setUserProperties(data) {
  if (!window.mixpanel) {
    console.warn('Mixpanel was not initialized');
    return;
  }
  window.mixpanel.people.set(data);
}

export function trackEvent(event, props) {
  if (!window.mixpanel) {
    console.warn('Mixpanel was not initialized');
    return;
  }

  window.mixpanel.track(event, props);
}
