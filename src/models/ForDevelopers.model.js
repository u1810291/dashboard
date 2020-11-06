export const TabID = {
  api: 'api',
  sdk: 'sdk',
  web: 'web',
  mobile: 'mobile',
  native: 'native',
  ios: 'ios',
  android: 'android',
  hybrid: 'hybrid',
  reactNative: 'reactNative',
  xamarin: 'xamarin',
  cordova: 'cordova',
  cordovaIonic: 'cordovaIonic',
  directLink: 'directLink',
};

export const TabTypes = {
  tab: 'tab',
  cascadeTab: 'cascadeTab',
};

export const menuStructure = [
  {
    id: TabID.api,
    type: TabTypes.tab,
  },
  {
    id: TabID.sdk,
    type: TabTypes.cascadeTab,
    defaultOpen: true,
    children: [
      {
        id: TabID.web,
        type: TabTypes.tab,
      },
      {
        id: TabID.mobile,
        type: TabTypes.cascadeTab,
        children: [
          {
            id: TabID.native,
            type: TabTypes.cascadeTab,
            children: [
              {
                id: TabID.ios,
                type: TabTypes.tab,
              },
              {
                id: TabID.android,
                type: TabTypes.tab,
              },
            ],
          },
          {
            id: TabID.hybrid,
            type: TabTypes.cascadeTab,
            children: [
              {
                id: TabID.reactNative,
                type: TabTypes.tab,
              },
              {
                id: TabID.xamarin,
                type: TabTypes.tab,
              },
              {
                id: TabID.cordova,
                type: TabTypes.tab,
              },
              {
                id: TabID.cordovaIonic,
                type: TabTypes.tab,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: TabID.directLink,
    type: TabTypes.tab,
  },
];

export function getIsSelected(tab, selectedId) {
  if (tab.id === selectedId) return true;
  if (tab.type === TabTypes.tab) return false;
  return tab.children.some((child) => getIsSelected(child, selectedId));
}
