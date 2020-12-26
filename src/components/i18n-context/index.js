import React from 'react';

export const I18nContext = React.createContext('i18nkey');

export function setI18nContext(context) {
  return function provider(Component) {
    return function WrappedComponent(props) {
      return (
        <I18nContext.Provider value={context}>
          <Component {...props} />
        </I18nContext.Provider>
      );
    };
  };
}
