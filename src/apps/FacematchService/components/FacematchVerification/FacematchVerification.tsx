import React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useFormatMessage } from 'apps/intl';
import { CheckBarExpandable, ZoomableImage } from 'apps/ui';
import { IStep } from 'models/Step.model';
import { FacematchCheckStepData, FacematchSourceTypes } from '../../models/Facematch.model';
import { useStyles } from './FacematchVerification.styles';

export function FacematchVerification({ data: step }: { data: IStep<FacematchCheckStepData> }) {
  const formatMessage = useFormatMessage();
  const classes = useStyles();

  const { id, error, data: { facematchScore, sources } = {} } = step;

  return (
    <Grid container>
      <Grid item xs={12} xl={4} className={classes.wrapper}>
        <CheckBarExpandable step={step} key={id}>
          <Card raised={false} className={classes.card}>
            <CardContent className={classes.cardWrapper}>
              {facematchScore && <Box>{formatMessage('SecurityCheckStep.facematch.extras', { messageValues: { score: facematchScore } })}</Box>}
              {error && (
                <Box mt={1} color="common.red">
                  {formatMessage(`SecurityCheckStep.${id}.${error.code}`, {
                    defaultMessage: formatMessage(`SecurityCheckStep.${step.checkStatus}`),
                  })}
                </Box>
              )}

              <Box mt={2}>
                {sources && sources.map(({ type, url }, index) => url && (
                  <Grid item key={index} className={classes.image}>
                    <Typography className={classes.subtitle} align="center" variant="subtitle2">
                      {formatMessage(`SecurityCheckStep.${id}.photoName`, {
                        messageValues: {
                          index: index + 1,
                          type: formatMessage(`Facematch.source.${type}.title`),
                        },
                      })}
                    </Typography>
                    <ZoomableImage src={url} alt={type} isNotLoaded={type !== FacematchSourceTypes.MerchantDatabase} />
                  </Grid>
                ))}
              </Box>
            </CardContent>
          </Card>
        </CheckBarExpandable>
      </Grid>
    </Grid>
  );
}
