import { QATags } from './QA.model';

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
  { id: TabID.api, qa: QATags.Integration.Tabs.Api },
  {
    id: TabID.sdk,
    qa: QATags.Integration.Tabs.Sdk,
    defaultOpen: true,
    children: [
      { id: TabID.web, qa: QATags.Integration.Tabs.Web },
      {
        id: TabID.mobile,
        qa: QATags.Integration.Tabs.Mobile,
        children: [
          {
            id: TabID.native,
            qa: QATags.Integration.Tabs.Native,
            children: [
              { id: TabID.ios, qa: QATags.Integration.Tabs.Ios },
              { id: TabID.android, qa: QATags.Integration.Tabs.Android },
            ],
          },
          {
            id: TabID.hybrid,
            qa: QATags.Integration.Tabs.Hybrid,
            children: [
              { id: TabID.reactNative, qa: QATags.Integration.Tabs.ReactNative },
              { id: TabID.xamarin, qa: QATags.Integration.Tabs.Xamarin },
              { id: TabID.cordova, qa: QATags.Integration.Tabs.Cordova },
              { id: TabID.cordovaIonic, qa: QATags.Integration.Tabs.CordovaIonic },
            ],
          },
        ],
      },
    ],
  },
  { id: TabID.directLink, qa: QATags.Integration.Tabs.DirectLink },
];

export function getIsSelected(tab, selectedId) {
  if (tab.id === selectedId) return true;
  if (!tab.children) return false;
  return tab.children.some((child) => getIsSelected(child, selectedId));
}
