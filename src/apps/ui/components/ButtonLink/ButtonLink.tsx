import { Button } from '@material-ui/core';
import { FiExternalLink } from 'react-icons/fi';
import React, { useCallback } from 'react';
import { QATags } from 'models/QA.model';
import { useStyles } from './ButtonLink.styles';

export function ButtonLink({ url, children }: {
  url: string;
  children: React.ReactNode;
}) {
  const classes = useStyles();

  const handleRedirect = useCallback(() => {
    window.open(url, '_blank');
  }, [url]);

  return (
    <Button
      onClick={handleRedirect}
      className={classes.buttonLink}
      variant="outlined"
      fullWidth
      data-qa={QATags.Integration.Doc.Banner}
    >
      {children}
      <FiExternalLink />
    </Button>
  );
}
