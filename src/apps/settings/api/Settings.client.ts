import { http } from 'lib/client/http';
import { Merchant } from 'models/Merchant.model';
import { PasswordExpirationPolicyDurationValue } from 'models/Settings.model';

export function updatePasswordExpirationPolicy(passwordExpirationPolicy: PasswordExpirationPolicyDurationValue) {
  return http.patch<Merchant>('/api/v1/merchants/me', { passwordExpirationPolicy });
}
