import { Box, Container, Grid, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { showWidget } from 'lib/hubspot';
import React from 'react';
import { FiMessageCircle } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { ReactComponent as BlockedBGImage } from './BlockedBg.svg';
import { useStyles } from './BlockedSplash.styles';

export function BlockedSplash() {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Grid container alignItems="center" justify="center" className={classes.blurredBG}>
      <Container maxWidth="lg">
        <Box className={classes.overlay} display="flex" m={4}>
          <Box
            p={3}
            color="secondary"
            className={classes.left}
            display="flex"
            alignItems="center"
          >
            <Typography variant="h2" color="secondary">{intl.formatMessage({ id: 'BlockedSplash.subtitle' })}</Typography>
          </Box>
          <Box
            display="flex"
            flexGrow="1"
            p={3}
            color="primary"
            flexDirection="column"
          >
            <Box
              flexGrow={1}
              p={2}
              display="flex"
              alignItems="center"
            >
              <Box p={2} flexGrow="1">
                <Typography variant="h2">{intl.formatMessage({ id: 'BlockedSplash.title' })}</Typography>
                <Box mt={0.5}>
                  <Typography variant="caption">{intl.formatMessage({ id: 'BlockedSplash.description' })}</Typography>
                </Box>
                <Box mt={3}>
                  <Link to="/settings/pricing">
                    <Button variant="contained" color="primary">
                      {intl.formatMessage({ id: 'actions.selectPlan' })}
                    </Button>
                  </Link>
                </Box>
              </Box>
              <Box maxWidth="50%">
                <BlockedBGImage className={classes.img} />
              </Box>
            </Box>
            <Box
              alignSelf="flex-end"
              display="flex"
              alignItems="center"
            >
              <Typography variant="caption">{intl.formatMessage({ id: 'BlockedSplash.contractSubtitle' })}</Typography>
              <Box ml={2}>
                <Button
                  color="primary"
                  variant="outlined"
                  startIcon={<FiMessageCircle size="1rem" />}
                  onClick={showWidget}
                >
                  {intl.formatMessage({ id: 'actions.contactSales' })}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Grid>
  );
}
