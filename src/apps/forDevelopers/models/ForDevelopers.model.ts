import { QATags } from 'models/QA.model';
import { LinkButton } from 'models/Integration.model';
import React from 'react';
import { WebCodeSnippet } from '../components/WebCodeSnippet/WebCodeSnippet';
import { DirectLinkCopy } from '../components/DirectLinkCopy/DirectLinkCopy';

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
  link?: string;
}

export interface InformationPageData {
  id: TabID;
  imageType: InformationImageTypes;
  videoURL: string;
  videoCover: string;
  documentationURL?: string;
  childComponent?: React.ReactNode;
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
        link: LinkButton.documentationURL,
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

export const pagesData: InformationPageData[] = [
  {
    id: TabID.Api,
    imageType: InformationImageTypes.Api,
    videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+API.mp4',
    videoCover: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati%2BAPI.png',
    documentationURL: 'https://docs.getmati.com/#api-overview',
  },
  {
    id: TabID.Web,
    imageType: InformationImageTypes.Web,
    videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+Web+SDK.mp4',
    videoCover: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati%2BWeb%2BSDK.png',
    documentationURL: 'https://docs.getmati.com/#web-sdk-overview',
    childComponent: WebCodeSnippet,
  },
  {
    id: TabID.DirectLink,
    imageType: InformationImageTypes.DirectLink,
    videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+Direct+Link.mp4',
    videoCover: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati%2BDirect%2BLink.png',
    childComponent: DirectLinkCopy,
  },
];
