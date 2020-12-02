export const Routes = {
  root: '/',
  auth: {
    root: '/auth',
    signUp: '/auth/signup',
    signIn: '/auth/signin',
    passwordRecovery: '/auth/password-recovery',
    passwordReset: '/auth/password-reset/:token',
  },
  analytics: { root: '/analytics' },
  list: {
    root: '/identities',
    details: '/identities/:id',
    demo: '/identities/demo/:demoId',
  },
  flows: {
    root: '/flows',
    details: '/flows/:id',
  },
  dev: { root: '/dev' },
  settings: { root: '/settings' },
  info: { root: '/info' },
};
