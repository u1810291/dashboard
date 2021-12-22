import React from 'react';
import { useIntl } from 'react-intl';
import { appPalette } from 'apps/theme';
import { BoxBordered, Warning } from 'apps/ui';
import { useStyles } from './HOCIsAccessAllowed.styles';

export function HOCIsAccessAllowed({ children, isAccessAllowed }: {
    children: React.ReactElement;
    isAccessAllowed: boolean;
}) {
  const classes = useStyles();
  const intl = useIntl();
  return (
    isAccessAllowed
      ? children
      : (
        <>
          <BoxBordered borderColor={appPalette.yellow} mb={4} p={1}>
            <Warning label={intl.formatMessage({ id: 'Product.warnings.usageInfo' }, { emailAddress: <a href="mailto:sales@metamap.com">sales@metamap.com</a> })} />
          </BoxBordered>
          <div className={classes.container}>
            {children}
          </div>
        </>
      )
  );
}
