import { DEFAULT_LANG } from 'components/intl-provider/IntlProvider.model';
import { fromIsoPeriod } from 'lib/date';
import { get, last } from 'lodash';

export function selectIsOwner({ merchant, auth }) {
  if (!merchant.collaborators) {
    // means loading
    return [false, true];
  }
  const userId = auth.user.id;
  const collaborators = merchant.collaborators || [];
  const isOwner = collaborators.findIndex((item) => item.user === userId && item.role === 2) < 0;
  return [isOwner, false];
}

export function selectIsBlocked({ merchant }) {
  return [
    !!merchant.blockedAt,
    // TODO @dkchv: don't work, add loading field to store
    false,
  ];
}

export function selectLanguage({ merchant }) {
  return merchant.configurations.dashboard.language || DEFAULT_LANG;
}

export function selectShouldPassOnboarding({ merchant }) {
  return [
    merchant.configurations.dashboard.shouldPassOnboarding || false,
    // TODO @dkchv: don't work, add loading field to store
    false,
  ];
}

export function selectMerchantName({ merchant }) {
  return merchant.displayName;
}

export function selectPolicyInterval({ merchant }) {
  return fromIsoPeriod(merchant.configurations.policyInterval);
}

export function selectMerchantOrganizationName({ merchant }) {
  return get(merchant, 'configurations.dashboard.info.organization');
}

/**
 * @return { clientId, clientSecret }
 */
export function selectMerchantApps({ merchant }) {
  return last(merchant.apps) || {};
}
