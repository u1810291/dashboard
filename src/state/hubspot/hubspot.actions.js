import { requestApi } from 'lib/hubspot';
import { selectUserEmail } from 'apps/user/state/user.selectors';

export const hubspotTrack = (data) => (dispatch, getState) => {
  try {
    const email = selectUserEmail(getState());
    requestApi(email, data);
  } catch (error) {
    console.error('hubspot error', error.message);
  }
};
