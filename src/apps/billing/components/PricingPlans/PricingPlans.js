import React from 'react';
import { useIntl } from 'react-intl';
import clsx from 'clsx';
import { useHubSpotForm } from 'lib/hubspot';
import { Box, Card, CardContent, CardHeader, CardActions } from '@material-ui/core';
import { useStyles, PriceButton } from './PricingPlan.styles';

export function PricingPlans({
  name,
  current,
  extraPrice,
  isCustom,
  subscriptionPrice,
  onChoosePlan,
  planBadge,
  bottomText,
}) {
  const intl = useIntl();
  const classes = useStyles();
  const showHubSpotForm = useHubSpotForm();

  return (
    <Card className={clsx(classes.card, isCustom && classes.enterprise)}>
      <CardHeader
        title={name}
        titleTypographyProps={{ variant: 'h4' }}
        action={planBadge}
      />

      <CardContent>
        <Box fontSize={18} className={classes.priceMain} mb={3}>
          {(subscriptionPrice !== null) ? (
            <Box className={classes.blockHeight}>
              <Box component="span" fontSize={48} fontWeight="bold">
                {`$${subscriptionPrice}`}
              </Box>
              <Box component="span" whiteSpace="nowrap">
                {`/ ${intl.formatMessage({ id: 'PricingPlans.pricePerMonth' })}${bottomText ? '*' : ''}`}
              </Box>
              <Box>{intl.formatMessage({ id: 'PricingPlans.usual.priceNote' })}</Box>
            </Box>
          ) : <Box fontSize={48} fontWeight="bold" className={classes.blockHeight}>Custom</Box>}
        </Box>
        <Box fontSize={18} className={classes.blockHeight} mb={1}>
          {(extraPrice !== undefined) ? (
            <>
              <Box mb={1}>
                {intl.formatMessage({ id: 'PricingPlans.plan.notation' }, { verificationCost: extraPrice / 100 })}
              </Box>
              <Box fontSize={12}>{intl.formatMessage({ id: 'PricingPlans.usual.note' })}</Box>
            </>
          ) : <Box>{intl.formatMessage({ id: 'PricingPlans.custom.note' })}</Box>}
        </Box>
      </CardContent>

      <CardActions>
        {current ? (
          <PriceButton disabled fullWidth>
            {intl.formatMessage({ id: 'PricingPlans.currentPlan' })}
          </PriceButton>
        ) : (
          <PriceButton
            fullWidth
            variant="outlined"
            className={classes.selectButton}
            onClick={isCustom ? showHubSpotForm : onChoosePlan}
          >
            {isCustom
              ? intl.formatMessage({ id: 'PricingPlans.custom' })
              : intl.formatMessage({ id: 'PricingPlans.start' })}
          </PriceButton>
        )}
      </CardActions>
    </Card>
  );
}
