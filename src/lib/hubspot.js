import client from 'lib/client';

export const hubspotEvents = {
  signIn: 'signed_in',
  signUp: 'signed_up',
  startPlan: 'started_plan',
  unlockIntegration: 'entered_cc_to_unlock_integration',
};

export const hubspotForms = {
  signUp: '7d3325f0-89d1-4422-b8b2-5267ad287be2',
  legalServices: '54c30de9-4021-4d72-95a0-b2a904d5b296',
};

export function requestApi(token, data = {}) {
  client.hubspot.hubspotApiRequest(token, data);
}

export function submitSignUpForm(email) {
  const signUpFormId = hubspotForms.signUp;
  client.hubspot.hubspotSubmitForm(signUpFormId, { email });
}

export function trackEvent(eventName, value) {
  if (!window._hsq) {
    console.warn('Hubspot was not initialized');
    return;
  }
  window._hsq.push('trackEvent', { id: eventName, value });
}

export function showWidget() {
  window.HubSpotConversations.widget.open();
}
