import axios from 'axios';

const httpClient = axios.create();

const portalId = '6251453';
const signUpFormId = '997e0d2c-285f-4caa-8918-7924d91651b5';
const additionalQuestionsFormId = '';

export const hubspotEvents = {
  signIn: 'signed_in',
  signUp: 'signed_up',
  startPlan: 'started_plan',
  unlockIntegration: 'entered_cc_to_unlock_integration',
};

function submitFormApiRequest(formId, formData = {}) {
  const fields = [];
  // eslint-disable-next-line
  for (const [key, value] of Object.entries(formData)) {
    fields.push({ name: key, value });
  }
  const apiUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;
  httpClient.post(apiUrl, { fields });
}

export function createContact(rawData) {
  const { email, firstName, lastName } = rawData;
  submitFormApiRequest(signUpFormId, {
    email,
    firstName,
    lastName,
  });
}

export function submitAdditionalQuestions(rawData) {
  submitFormApiRequest(additionalQuestionsFormId, rawData);
}

export function trackEvent(eventName, value) {
  if (!window._hsq) {
    console.warn('Hubspot was not initialized');
    return;
  }
  window._hsq.push('trackEvent', { id: eventName, value });
}
