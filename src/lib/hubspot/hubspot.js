import client from 'lib/client';
import { hubspotForms } from './constants';

export const contactProperties = {
  planName: 'plan_name',
  planPrice: 'subscription_price',
  companyName: 'company',
  website: 'website',
  startVerifyingUsers: 'start_verifying_users',
  verificationsVolume: 'how_many_verifications',
  whyDoYouNeedMati: 'why_do_you_need_mati',
  phoneNumber: 'phone_number',
};

export function requestApi(token, email, contactData) {
  const data = {
    email,
    contactData,
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
