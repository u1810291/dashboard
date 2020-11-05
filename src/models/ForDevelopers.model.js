export const TabID = {
  API: 'API',
  SDK: 'SDK',
  WEB: 'WEB',
  MOBILE: 'MOBILE',
  NATIVE: 'NATIVE',
  IOS: 'IOS',
  ANDROID: 'ANDROID',
  HYBRID: 'HYBRID',
  REACT_NATIVE: 'REACT_NATIVE',
  XAMARIN: 'XAMARIN',
  CORDOVA: 'CORDOVA',
  CORDOVA_IONIC: 'CORDOVA_IONIC',
  DIRECT_LINK: 'DIRECT_LINK',
};

export const TabType = {
  TAB: 'TAB',
  CASCADE_TAB: 'CASCADE_TAB',
  DEFAULT_OPEN_CASCADE_TAB: 'DEFAULT_OPEN_CASCADE_TAB',
};

export const MobileSDKTabs = [
  TabID.IOS,
  TabID.ANDROID,
  TabID.REACT_NATIVE,
  TabID.XAMARIN,
  TabID.CORDOVA,
  TabID.CORDOVA_IONIC];

export function getIsSelected(tab, selectedId) {
  if (tab.id === selectedId) return true;
  if (tab.type === TabType.TAB) return false;
  return tab.children.some((child) => getIsSelected(child, selectedId));
}
