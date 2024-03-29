import { Box, Typography } from '@material-ui/core';
import { CopyToClipboard, SyntaxHighlighter } from 'apps/ui';
import { getNom151FileContent } from 'models/Identity.model';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { DigitalSignature } from 'models/DigitalSignature.model';
import { useStyles } from './Nom151Check.styles';

export function Nom151Check({ data = {} as DigitalSignature }: {data: DigitalSignature}) {
  const classes = useStyles();
  const intl = useIntl();
  const [fileContent, setFileContent] = useState('...');
  useEffect(() => {
    async function fetchData() {
      setFileContent(await getNom151FileContent(data));
    }
    fetchData();
  }, [data]);

  return (
    <Box p={2} className={classes.container}>
      <Box mb={2}>
        <Typography variant="subtitle2" className={classes.title}>
          {intl.formatMessage({ id: 'Product.checks.nom151Check.title' })}
        </Typography>
      </Box>
      <SyntaxHighlighter
        code={fileContent}
        className={classes.timestampSyntax}
        withCopyText
        isCopyToClipboard={false}
        isLightBlueTheme
      />
      <Box mb={2} mt={2}>
        <Typography variant="subtitle2" className={classes.title}>
          {intl.formatMessage({ id: 'Product.checks.nom151Check.id' })}
        </Typography>
      </Box>
      <Box mb={2} className={classes.uniqueId}>
        <CopyToClipboard withCopyText text={data.hash}>
          {data.hash}
        </CopyToClipboard>
      </Box>
    </Box>
  );
}
