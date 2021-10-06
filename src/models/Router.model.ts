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
    history: {
      root: '/history',
      details: '/identities/:id/history',
    },
  },
  flows: {
    root: '/flows',
    details: '/flows/:id',
  },
  identity: {
    profile: {
      root: '/identity',
      details: {
        root: '/identity/:identityId',
        verificationDetails: '/identity/:identityId/verification/:verificationId',
      },
    },
    verification: {
      root: '/verification',
    },
  },
  flow: {
    root: '/flow',
    details: '/flow/:id',
  },
  dev: { root: '/dev' },
  settings: {
    root: '/settings',
  },
  collaborators: {
    agentProfile: {
      root: '/agentHistory',
      details: '/agentHistory/:id',
    },
  },
  info: { root: '/info' },
  review: { root: '/review' },
};
