import client from 'lib/client';

export const hubspotEvents = {
  signIn: 'signed_in',
  signUp: 'signed_up',
  startPlan: 'started_plan',
  unlockIntegration: 'entered_cc_to_unlock_integration',
};

export function requestApi(token, data = {}) {
  client.hubspot(token, data);
}

export function trackEvent(eventName, value) {
  if (!window._hsq) {
    console.warn('Hubspot was not initialized');
    return;
  }
  window._hsq.push('trackEvent', { id: eventName, value });
}
