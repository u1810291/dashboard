import ls from 'localstorage-slim';

export const LAST_ACTIVITY_KEY = 'DASHBOARD_AFK_LOGOUT_LISTENER_LAST_ACTIVITY';
export const THROTTLE_COEFFICIENT = 0.8;
export const LOGOUT_ALERT_MINUTES = 1;
export const AFK_BEFORE_LOGOUT_MINUTES = 10 - LOGOUT_ALERT_MINUTES;

export function setLastActivityLocalStorage(lastActivity: number) {
  ls.set<number>(LAST_ACTIVITY_KEY, lastActivity, { encrypt: true });
}

export function getLastActivityLocalStorage(): number {
  return ls.get<number>(LAST_ACTIVITY_KEY, { decrypt: true });
}
