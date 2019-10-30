import client from 'lib/client';
import { hubspotForms } from './constants';

export function requestApi(token, email, inputs = {}) {
  const data = {
    email,
    contactData: {
      company: inputs.organization,
      website: inputs.websiteUrl,
      start_verifying_users: inputs.whenToStart,
      how_many_verifications: inputs.verificationsVolume,
      why_do_you_need_mati: inputs.whyDoYouNeedMati,
      phone_number: inputs.phone,
    },
  };
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
