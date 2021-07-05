import { QATags } from 'models/QA.model';

export enum TabID {
  Api = 'api',
  Sdk = 'sdk',
  Web = 'web',
  Mobile = 'mobile',
  Native = 'native',
  Ios = 'ios',
  Android = 'android',
  Hybrid = 'hybrid',
  ReactNative = 'reactNative',
  Xamarin = 'xamarin',
  Cordova = 'cordova',
  CordovaIonic = 'cordovaIonic',
  DirectLink = 'directLink',
}

export enum InformationImageTypes {
  DirectLink = 'directLink',
  Mobile = 'mobile',
  Web = 'web',
  Api = 'api',
  Ios = 'ios',
  Android = 'android',
}

export interface Tab {
  id: TabID;
  qa: string;
  defaultOpen?: boolean;
  children?: Tab[];
}

export const menuStructure: Tab[] = [
  { id: TabID.Api, qa: QATags.Integration.Tabs.Api },
  {
    id: TabID.Sdk,
    qa: QATags.Integration.Tabs.Sdk,
    defaultOpen: true,
    children: [
      { id: TabID.Web, qa: QATags.Integration.Tabs.Web },
      {
        id: TabID.Mobile,
        qa: QATags.Integration.Tabs.Mobile,
        children: [
          {
            id: TabID.Native,
            qa: QATags.Integration.Tabs.Native,
            children: [
              { id: TabID.Ios, qa: QATags.Integration.Tabs.Ios },
              { id: TabID.Android, qa: QATags.Integration.Tabs.Android },
            ],
          },
          {
            id: TabID.Hybrid,
            qa: QATags.Integration.Tabs.Hybrid,
            children: [
              { id: TabID.ReactNative, qa: QATags.Integration.Tabs.ReactNative },
              { id: TabID.Xamarin, qa: QATags.Integration.Tabs.Xamarin },
              { id: TabID.Cordova, qa: QATags.Integration.Tabs.Cordova },
              { id: TabID.CordovaIonic, qa: QATags.Integration.Tabs.CordovaIonic },
            ],
          },
        ],
      },
    ],
  },
  { id: TabID.DirectLink, qa: QATags.Integration.Tabs.DirectLink },
];

export function getIsSelected(tab: Tab, selectedId: TabID): boolean {
  if (tab.id === selectedId) return true;
  if (!tab.children) return false;
  return tab.children.some((child) => getIsSelected(child, selectedId));
}
