import React from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './ProductCanUseContainer.styles';
import { BoxBordered, Warning } from '../../ui';
import { appPalette } from '../../theme';

export function ProductCanUseContainer({ children, isCanUseProduct }: {
    children: React.ReactNode;
    isCanUseProduct: boolean;
}) {
  const classes = useStyles();
  const intl = useIntl();
  return (
    isCanUseProduct
      ? <>{children}</>
      : (
        <>
          <BoxBordered borderColor={appPalette.yellow} mb={2}>
            <Warning label={intl.formatMessage({ id: 'Product.warnings.usageInfo' }, { emailAddress: <a href="mailto:sales@mati.io">sales@mati.io</a> })} />
          </BoxBordered>
          <div className={classes.container}>
            {children}
          </div>
        </>
      )
  );
}
