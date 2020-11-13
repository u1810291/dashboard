import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import DrivingLicenseSVG from './images/driving-license.svg';
import NationalIdSVG from './images/national-id.svg';
import PassportSVG from './images/passport.svg';
import { useStyles } from './Example.styles';
import { Routes } from '../../../../models/Router.model';

export const ExampleIconMap = {
  nationalId: NationalIdSVG,
  passport: PassportSVG,
  drivingLicense: DrivingLicenseSVG,
};

export function ExampleCard({ card }) {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Link to={{ pathname: `${Routes.list.demo}/${card.demoId}` }}>
      <Card className={classes.card}>
        <CardMedia
          component="img"
          image={ExampleIconMap[card.id]}
          className={classes.media}
        />
        <CardContent>
          <Typography variant="h5" color="primary">
            {intl.formatMessage({ id: `verificationDemo.${card.id}.label` })}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
