import { Modal } from 'apps/overlay';
import { Button, Typography, Box } from '@material-ui/core';
import { SyntaxHighlighter, SyntaxHighlighterLanguages, CopyToClipboard } from 'apps/ui';
import stringify from 'lib/stringify';
import React from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './VerificationWebhookModal.styles';
import { QATags } from '../../../../models/QA.model';

export function VerificationWebhookModal({ webhook, onClose }) {
  const intl = useIntl();
  const classes = useStyles();
  const resourceUrl = `${process.env.REACT_APP_API_URL}/v2/verifications/${webhook?.id ?? ''}`;

  return (
    <Modal className={classes.modal}>
      <Typography variant="h4" gutterBottom className={classes.title}>
        { intl.formatMessage({ id: 'verificationWebhookModal.title' }) }
      </Typography>
      <Typography variant="body1" className={classes.subtitle}>
        { intl.formatMessage({ id: 'verificationWebhookModal.subtitle' }) }
      </Typography>
      <Box mb={2}>
        <SyntaxHighlighter
          isDarkTheme
          className={classes.webhookSyntax}
          code={stringify(webhook)}
          language={SyntaxHighlighterLanguages.JavaScript}
          withCopyText
          showLineNumbers
          qa={QATags.Verification.Data.Json}
        />
      </Box>
      <Typography variant="h4" gutterBottom className={classes.title}>
        { intl.formatMessage({ id: 'verificationWebhookModal.title.url' }) }
      </Typography>
      <Box mb={2} className={classes.resourceUrl}>
        <CopyToClipboard withText withCopyText text={resourceUrl} qa={QATags.Verification.Data.ResourceUrl.Copy}>
          <span data-qa={QATags.Verification.Data.ResourceUrl.Value}>
            {resourceUrl}
          </span>
        </CopyToClipboard>
      </Box>
      <Box align="right">
        <Button
          color="primary"
          variant="contained"
          disableElevation
          className={classes.button}
          onClick={onClose}
          data-qa={QATags.Verification.Data.Close}
        >
          { intl.formatMessage({ id: 'close' }) }
        </Button>
      </Box>
    </Modal>
  );
}
