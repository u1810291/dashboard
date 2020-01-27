import React from 'react';
import { useIntl } from 'react-intl';
import clsx from 'clsx';
import { useHubSpotForm } from 'lib/hubspot';
import { Box, Card, Grid, CardContent, CardHeader, CardActions } from '@material-ui/core';
import { useStyles, PriceButton } from './PricingPlan.styles';

export function PricingPlans({
  name,
  key,
  current,
  extraPrice,
  isCustom,
  subscriptionPrice,
  onChoosePlan,
}) {
  const intl = useIntl();
  const classes = useStyles();
  const showHubSpotForm = useHubSpotForm();
  const priceCalc = (price) => Math.floor(price / 100);

  const adornments = {
    Yearly: [
      <Box className={classes.yearlyBadge} key="yearlyBadge">{intl.formatMessage({ id: 'PricingPlans.yearly.save' })}</Box>,
      <Box className={classes.yearlyBottomNote} key="yearlyBottomNote">{intl.formatMessage({ id: 'PricingPlans.yearly.note' })}</Box>,
    ],
  };

  const PriceBlock = ({ price }) => (
    <Box fontSize={18} className={classes.priceMain} mb={3}>
      {(price !== undefined) ? (
        <Box className={classes.blockHeight}>
          <Box component="span" fontSize={48} fontWeight="bold">
            {`$${priceCalc(price)}`}
          </Box>
          <Box component="span">/ month</Box>
          <Box>{intl.formatMessage({ id: 'PricingPlans.usual.priceNote' })}</Box>
        </Box>
      ) : <Box fontSize={48} fontWeight="bold" className={classes.blockHeight}>Custom</Box>}
    </Box>
  );

  const PriceExtra = ({ price }) => (
    <Box fontSize={18} className={classes.blockHeight} mb={1}>
      {(price !== undefined) ? (
        <>
          <Box mb={1}>
            {intl.formatMessage({ id: 'PricingPlans.plan.notation' }, { verificationCost: price / 100 })}
          </Box>
          <Box fontSize={12}>{intl.formatMessage({ id: 'PricingPlans.usual.note' })}</Box>
        </>
      ) : <Box>{intl.formatMessage({ id: 'PricingPlans.custom.note' })}</Box>}
    </Box>
  );

  return (
    <Grid item xs={4} style={{ position: 'relative' }} key={key}>
      <Card className={clsx(classes.card, isCustom && classes.enterprise)}>
        <CardHeader
          title={name}
          titleTypographyProps={{ variant: 'h4' }}
        />
        <CardContent>
          <PriceBlock price={subscriptionPrice} />
          <PriceExtra price={extraPrice} />
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
        {adornments[name] && adornments[name].map((Element) => Element)}
      </Card>
    </Grid>
  );
}
