import { http } from 'lib/client/http';
import { IMerchant } from 'models/Merchant.model';
import { PasswordExpirationPolicyDurationValue } from 'models/Settings.model';

export function updatePasswordExpirationPolicy(passwordExpirationPolicy: PasswordExpirationPolicyDurationValue) {
  return http.patch<IMerchant>('/api/v1/merchants/me', { passwordExpirationPolicy });
}
