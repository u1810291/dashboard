export const QATags = {
  Dashboard: {
    Loader: 'dashboard-loader',
  },

  Menu: {
    Logo: 'menu-logo',
    RollUpButton: 'menu-rollUp',
    Metrics: 'menu-metrics',
    VerificationList: 'menu-verificationList',
    Product: 'menu-verificationFlows',
    Workflow: 'menu-workflows',
    Templates: 'menu-tenplates',
    ForDevelopers: 'menu-forDevelopers',
    FAQ: 'menu-faq',
    InviteTeammate: 'menu-inviteTeammate',
    Account: 'menu-account',
    LanguageSelect: 'menu-languageSelect',
    Logout: 'menu-logout',
    WhatsNew: 'menu-whats-new',
    ProductBoard: 'menu-roadmap',
    StatusPage: 'status-page',
  },

  Modal: {
    CloseButton: 'modal-button-close',
    Delete: {
      ConfirmDeleteButton: 'modal-button-confirm-delete',
    },
  },

  Auth: {
    SignIn: {
      EmailInput: 'login-input-email',
      PasswordInput: 'login-input-password',
      SubmitButton: 'login-button-submit',
    },
    Recovery: {
      EmailInput: 'recovery-input-email',
      ResetPasswordSubmit: 'recovery-button-reset-password-submit',
      GoBackButton: 'recovery-button-go-back',
      ForgotPasswordButton: 'recovery-button-forgot-password',
    },
    SignUp: {
      EmailInput: 'sign-up-input-email',
      PasswordInput: 'sign-up-input-password',
      SignUpSubmitButton: 'sign-up-button-submit',
      LoginButton: 'sign-up-button-login',
    },
    ChangePassword: {
      CurrentPasswordInput: 'change-password-input-current',
      NewPasswordInput: 'change-password-input-new-password',
      RepeatPasswordInput: 'change-password-input-repeat',
      SubmitButton: 'change-password-button-submit',
      CancelButton: 'change-password-button-cancel',
    },
    Logout: {
      CancelButton: 'logout-button-cancel',
      ConfirmButton: 'logout-button-confirm',
    },
  },

  Filter: {
    DatePicker: {
      YearsFromSelect: 'years-from-select',
      YearsToSelect: 'years-to-select',
      Periods: 'filter-buttons-periods',
    },
    byFlow: 'filter-block-by-flow',
    byStatus: 'filter-block-by-status',
    byAgents: 'filter-block-by-agents',
    byActionTypes: 'filter-block-by-action-types',
    ClearAllButton: 'filter-button-clear-all',
    ApplyFilterButton: 'filter-button-apply',
  },

  Analytics: {
    FilterButton: 'analytics-button-open-filter',
  },

  Collaborators: {
    FirstNameInput: 'collaborators-input-first-name',
    LastNameInput: 'collaborators-input-last-name',
    EmailInput: 'collaborators-input-email',
    SendButton: 'collaborators-button-send',
    DeleteMemberButton: 'collaborators-button-delete-member',
    TeamTable: 'collaborators-team-table',
    Role: {
      Agent: 'collaborators-radiobutton-role-agent',
      Admin: 'collaborators-radiobutton-role-admin',
      Auditor: 'collaborators-radiobutton-role-auditor',
    },
  },

  Flows: {
    CreateNewFlowButton: 'flows-button-create',
    Create: {
      FlowNameInput: 'flows-create-input-name',
      CreateButton: 'flows-create-button-success',
      CancelButton: 'flows-create-button-denied',
    },
    Table: 'flows-table',
    CountrySwitch: 'country-switch',
    FlowIssueNotificationDesktop: 'desktop-flow-issue',
    FlowIssueNotification: 'flow-issue',
    SaveButtonIssue: 'save-button-issue',
  },

  VerificationList: {
    Filter: 'verificationList-button-openFilter',
    DownloadCsv: 'verificationList-button-downloadCsv',
    Search: 'verificationList-input-search',
    Table: 'verificationList-table',
  },

  VerificationHistory: {
    Buttons: {
      Filter: 'verificationHistory-button-openFilter',
      BackToList: 'verificationHistory-button-back',
    },
    Table: 'verificationHistory-table',
  },

  Product: {
    Tab: {
      Configuration: 'product-tab-configuration',
      GovChecks: 'product-tab-gov-checks',
    },
  },

  MatiButton: {
    ColorPickerButton: 'product-color-picker-button',
  },

  Integration: {
    FlowSelector: 'integration-selector-flows',
    Doc: {
      Mati: 'integration-doc-button-mati',
      Banner: 'integration-doc-button-banner',
    },
    ClientId: {
      Value: 'integration-client-id-value',
      Copy: 'integration-client-id-copy',
    },
    FlowId: {
      Value: 'integration-flow-id-value',
      Copy: 'integration-flow-id-copy',
    },
    ClientSecret: {
      Value: 'integration-client-secret-value',
      Copy: 'integration-client-secret-copy',
    },
    Tabs: {
      Api: 'integration-tabs-api',
      Sdk: 'integration-tabs-sdk',
      Web: 'integration-tabs-web',
      Mobile: 'integration-tabs-mobile',
      Native: 'integration-tabs-native',
      Ios: 'integration-tabs-ios',
      Android: 'integration-tabs-android',
      Hybrid: 'integration-tabs-hybrid',
      ReactNative: 'integration-tabs-reactNative',
      Xamarin: 'integration-tabs-xamarin',
      Cordova: 'integration-tabs-cordova',
      CordovaIonic: 'integration-tabs-cordovaIonic',
      DirectLink: 'integration-tabs-directLink',
    },
  },

  Webhook: {
    Configure: 'webhook-button-configure',
    Url: 'webhook-input-url',
    Secret: 'webhook-input-secret',
    Save: 'webhook-button-save',
    Doc: 'webhook-button-documentation',
  },

  Verification: {
    Date: 'verification-date',
    Flow: 'verification-flow',
    Source: 'verification-source',
    Number: {
      Value: 'verification-number-value',
      Copy: 'verification-number-copy',
    },
    StatusSelector: {
      Button: 'verification-statusSelector-button',
      Content: 'verification-statusSelector-content',
    },
    Buttons: {
      DownloadPdf: 'verification-button-downloadPdf',
      Data: 'verification-button-data',
      BackToList: 'verification-button-backToList',
      Delete: 'verification-button-delete',
      History: 'verification-button-history',
    },
    Data: {
      Json: {
        Value: 'verification-data-json-value',
        Copy: 'verification-data-json-copy',
      },
      ResourceUrl: {
        Value: 'verification-data-resourceUrl-value',
        Copy: 'verification-data-resourceUrl-copy',
      },
      Close: 'verification-data-button-close',
    },
  },

  Document: {
    Change: {
      EditData: 'document-change-button-editData',
      Save: 'document-change-button-save',
      Cancel: 'document-change-button-cancel',
      Form: 'document-change-form',
    },
  },

  Settings: {
    ChangePassword: {
      Change: 'settings-changePassword-button-change',
    },
    ContactUs: 'settings-changePassword-button-contact',
  },

  Review: {
    VerificationCount: 'review-verificationCount',
    Banner: {
      ReviewMode: 'review-banner-button-goToReviewMode',
      ShowVerifications: 'review-banner-button-showVerifications',
    },
    Page: {
      Buttons: {
        Verified: 'review-page-button-verified',
        Rejected: 'review-page-button-rejected',
        Skip: 'review-page-button-skip',
        Exit: 'review-page-button-exit',
        Cancel: 'review-page-button-cancel',
        Next: 'review-page-button-next',
      },
      ExitModal: {
        Exit: 'review-page-exitModal-button-exit',
        Cancel: 'review-page-exitModal-button-cancel',
      },
    },
  },

  AgentHistory: {
    FilterButton: 'agent-history-button-open-filter',
    GoBackButton: 'agent-history-button-go-back',
    HistoryTable: 'agent-history-table',
    AgentRoleSelect: 'agent-history-select-role',
  },

  FlowBuilder: {
    Integration: {
      API: 'flow-builder-integration-api',
      SDK: 'flow-builder-integration-sdk',
    },
  },

  Onboarding: {
    Steps: {
      Docs: 'onboarding-steps-read-docs',
      Invite: 'onboarding-steps-invite-teammate',
      Meta: 'onboarding-steps-create-meta',
    },
  },

  Templates: {
    Modal: {
      SaveButton: 'templates-modal-save-button',
      Description: 'templates-modal-description',
      CountriesSelect: 'templates-modal-countries-select',
      IndustriesSelect: 'templates-modal-industries-select',
      MetamapName: 'templates-modal-metamap-name',
      TemplateTitle: 'templates-modal-template-title',
    },
    EditButton: 'templates-edit-button',
    CreateNewTemplateButton: 'templates-create-new-template',
  },

  TemplatesModal: {
    ChosenFilters: {
      DeleteAll: 'templates-modal-chosenFilters-deleteAll',
    },
    Filters: {
      industry: 'templates-modal-filters-industry-button',
      country: 'templates-modal-filters-country-button',
    },
  },
};
