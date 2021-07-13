import React from 'react';
import { useIntl } from 'react-intl';
import { appPalette } from 'apps/theme';
import { useStyles } from './HOCIsAccessAllowed.styles';
import { BoxBordered, Warning } from '../../ui';

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
            <Warning label={intl.formatMessage({ id: 'Product.warnings.usageInfo' }, { emailAddress: <a href="mailto:sales@mati.io">sales@mati.io</a> })} />
          </BoxBordered>
          <div className={classes.container}>
            {children}
          </div>
        </>
      )
  );
}
