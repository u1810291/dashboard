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

export const InformationImageTypes = {
  directLink: 'directLink',
  mobile: 'mobile',
  web: 'web',
  api: 'api',
  ios: 'ios',
  android: 'android',
};

export const menuStructure = [
  { id: TabID.api },
  {
    id: TabID.sdk,
    defaultOpen: true,
    children: [
      { id: TabID.web },
      {
        id: TabID.mobile,
        children: [
          {
            id: TabID.native,
            children: [
              { id: TabID.ios },
              { id: TabID.android },
            ],
          },
          {
            id: TabID.hybrid,
            children: [
              { id: TabID.reactNative },
              { id: TabID.xamarin },
              { id: TabID.cordova },
              { id: TabID.cordovaIonic },
            ],
          },
        ],
      },
    ],
  },
  { id: TabID.directLink },
];

export function getIsSelected(tab, selectedId) {
  if (tab.id === selectedId) return true;
  if (!tab.children) return false;
  return tab.children.some((child) => getIsSelected(child, selectedId));
}
