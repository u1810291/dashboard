import React, { useMemo } from 'react';
import { Box, Collapse, Grid } from '@material-ui/core';
import { useIntl } from 'react-intl';
import { DateFormat, formatDate } from 'lib/date';
import { CopyToClipboard } from 'apps/ui';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import moment from 'moment';
import { useStyles } from './ProfileInformation.styles';

export interface ProfileInformationProps{
  identityId: string,
  name?: string,
  location?: string,
  birthDate?: string
  isShowFull: boolean,
}

export function ProfileInformation({ name, birthDate, location, identityId, isShowFull = true }: ProfileInformationProps) {
  const intl = useIntl();
  const classes = useStyles();
  const userAge = useMemo(() => moment().diff(moment(birthDate), 'years') || '', [birthDate]);

  return (
    <Box>
      <Box mb={2}>
        <Box color="common.black75" mb={0.5}>
          {intl.formatMessage({ id: 'IdentityProfile.label.name' })}
        </Box>
        <Grid container alignItems="center" wrap="nowrap">
          <Box mr={0.5} color="common.black90" fontWeight="bold" fontSize={24}>
            {name}
          </Box>
        </Grid>
      </Box>
      <Collapse in={isShowFull}>
        <Box mb={2}>
          <Box color="common.black75" mb={0.5}>
            {intl.formatMessage({ id: 'IdentityProfile.label.birth' })}
          </Box>
          <Grid container alignItems="center">
            <Box display="flex" color="common.black75" mr={0.5} fontSize={17}>
              <FiCalendar />
            </Box>
            <Box mr={0.5} color="common.black90" fontWeight="bold">
              {`${formatDate(birthDate, DateFormat.MonthShortWithSpace)} ${userAge ? `(${userAge})` : ''}`}
            </Box>
          </Grid>
        </Box>
        <Box mb={2}>
          <Box color="common.black75" mb={0.5}>
            {intl.formatMessage({ id: 'IdentityProfile.label.geolocation' })}
          </Box>
          <Grid container alignItems="center">
            <Box display="flex" color="common.black75" mr={0.5} fontSize={17}>
              <FiMapPin />
            </Box>
            <Box color="common.black90" fontWeight="bold">
              {location}
            </Box>
          </Grid>
        </Box>
        <Box>
          <Box color="common.black75" mb={0.5}>
            {intl.formatMessage({ id: 'IdentityProfile.label.identityId' })}
          </Box>
          <Box className={classes.copy} fontWeight="bold">
            <CopyToClipboard text={identityId}>{identityId}</CopyToClipboard>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
}
