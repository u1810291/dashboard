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
  identityProfile: {
    root: '/identity-profile',
    details: {
      root: '/identity-profile/:identityId',
      verificationDetails: '/identity-profile/:identityId/verification/:verificationId',
    },
  },
  flow: {
    root: '/flow',
    details: '/flow/:id',
  },
  templates: {
    root: '/templates',
    newTemplate: '/new_template',
    details: '/templates/:id',
  },
  workflow: {
    root: '/workflow',
    details: '/workflow/:id',
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
  productBoard: { root: '/feedback' },
};
