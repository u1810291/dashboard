import { Box, Link } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { ReactComponent as MoneyIcon } from '../../assets/money.svg';
import { SalesTooltip, useStyles } from './GovCheckSalesToolTip.style';

export function GovCheckSalesToolTip({ isGovCheckOption = false }: {isGovCheckOption?: boolean}) {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <SalesTooltip
      interactive
      title={(
        <Box display="flex" flexDirection="column">
          <span className={classes.tooltipTitle}>{intl.formatMessage({ id: 'GovCheck.tooltip.title' })}</span>
          <span>{intl.formatMessage({ id: 'GovCheck.tooltip.body' })}</span>
          <Link className={classes.emailLink} color="primary" href="mailto:sales@mati.io" rel="noopener">
            sales@mati.io
          </Link>
        </Box>
    )}
      arrow
      placement="right"
    >
      <MoneyIcon className={classNames(classes.moneyIcon, { [classes.optionMoneyIcon]: isGovCheckOption })} />
    </SalesTooltip>
  );
}
