import client from 'lib/client';
import { hubspotForms } from './constants';

export function requestApi(email, contactData) {
  client.hubspot.hubspotApiRequest({
    email,
    contactData,
  });
}

export function submitSignUpForm(email) {
  client.hubspot.hubspotSubmitForm(hubspotForms.signUp, { email });
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
