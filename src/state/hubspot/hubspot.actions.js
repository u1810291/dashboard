import { requestApi } from 'lib/hubspot';
import { selectAuthToken, selectUserEmail } from 'state/auth/auth.selectors';

export const hubspotTrack = (data) => (dispatch, getState) => {
  try {
    const state = getState();
    const email = selectUserEmail(state);
    const token = selectAuthToken(state);
    requestApi(token, email, data);
  } catch (error) {
    console.error('hubspot error', error.message);
  }
};
