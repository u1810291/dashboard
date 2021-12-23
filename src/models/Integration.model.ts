export const matiButtonUrl = process.env.REACT_APP_MATI_BUTTON_URL || 'https://web-button.getmati.com/button.js';

export function integrationCode({ clientId, flowId = '' }) {
  return `<script src="${matiButtonUrl}">
  </script>
  <mati-button
    clientid="${clientId}"
    flowId="${flowId}"
    metadata=""
  />`;
}

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

const mobileSDKVideo = 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati%2BMobile%2BSDKs.png';
export const urls = {
  [TabID.Api]: {
    id: TabID.Api,
    name: 'API',
    imageType: InformationImageTypes.Api,
    videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+API.mp4',
    videoCover: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati%2BAPI.png',
    documentationURL: 'https://docs.metamap.com/docs/api-guide',
  },
  [TabID.Web]: {
    id: TabID.Web,
    name: 'Web',
    videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+Web+SDK.mp4',
    imageType: InformationImageTypes.Web,
    videoCover: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati%2BWeb%2BSDK.png',
    documentationURL: 'https://docs.metamap.com/docs/sdk',
  },
  [TabID.DirectLink]: {
    id: TabID.DirectLink,
    name: 'Direct link',
    imageType: InformationImageTypes.DirectLink,
    videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+Direct+Link.mp4',
    videoCover: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati%2BDirect%2BLink.png',
  },
  [TabID.Android]: {
    id: TabID.Android,
    name: 'Android',
    imageType: InformationImageTypes.Android,
    videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+Mobile+SDKs.mp4',
    videoCover: mobileSDKVideo,
    documentationURL: 'https://github.com/MatiFace/mati-global-id-sdk-integration-android',
  },
  [TabID.Ios]: {
    id: TabID.Ios,
    name: 'IOS',
    imageType: InformationImageTypes.Ios,
    videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+Mobile+SDKs.mp4',
    videoCover: mobileSDKVideo,
    documentationURL: 'https://github.com/MatiFace/mati-global-id-sdk/blob/master/Integration_iOS.md',
  },
  [TabID.ReactNative]: {
    id: TabID.ReactNative,
    name: 'React Native',
    videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+Mobile+SDKs.mp4',
    videoCover: mobileSDKVideo,
    documentationURL: 'https://github.com/MatiFace/react-native-mati-global-id-sdk',
  },
  [TabID.Xamarin]: {
    id: TabID.Xamarin,
    name: 'Xamarin',
    videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+Mobile+SDKs.mp4',
    videoCover: mobileSDKVideo,
    documentationURL: 'https://github.com/MatiFace/MatiXamarinIntegration',
  },
  [TabID.Cordova]: {
    id: TabID.Cordova,
    name: 'Cordova',
    videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+Mobile+SDKs.mp4',
    videoCover: mobileSDKVideo,
    documentationURL: 'https://github.com/MatiFace/MatiGlobalIDSDKCordovaPlugin',
  },
  [TabID.CordovaIonic]: {
    id: TabID.CordovaIonic,
    name: 'Cordova Ionic',
    videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+Mobile+SDKs.mp4',
    videoCover: mobileSDKVideo,
    documentationURL: 'https://github.com/MatiFace/MatiGlobalIDSDKCordovaPlugin',
  },
};

export const LinkButtons = [TabID.Ios, TabID.Android, TabID.ReactNative, TabID.Xamarin, TabID.Cordova, TabID.CordovaIonic];
export const LinkButton = {
  name: 'MobileSDK',
  documentationURL: 'https://github.com/GetMati/mati-mobile-examples',
};
