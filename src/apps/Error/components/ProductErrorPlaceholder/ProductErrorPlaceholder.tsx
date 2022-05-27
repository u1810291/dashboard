import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Placeholder } from 'apps/ui';
import { ImWarning } from 'react-icons/im';
import { useFormatMessage } from 'apps/intl';
import Link from '@material-ui/core/Link';
import { SupportEmail } from 'models/Merchant.model';
import { useStyles } from './ProductErrorPlaceholder.styles';

export function ProductErrorPlaceholder() {
  const classes = useStyles();
  const formatMessage = useFormatMessage();

  return (
    <Paper className={classes.placeholder}>
      <Placeholder
        icon={<ImWarning className={classes.icon} />}
        subtitle={formatMessage('Product.error.internal')}
        text={formatMessage('Product.error.contactSupport', { messageValues: { supportEmail: <Link href={`mailto:${SupportEmail}`}>{SupportEmail}</Link> } })}
      />
    </Paper>
  );
}
