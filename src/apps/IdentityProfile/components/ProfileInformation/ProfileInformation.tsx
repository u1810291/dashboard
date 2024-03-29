import React, { useEffect, useMemo, useState } from 'react';
import { Box, Collapse, Grid } from '@material-ui/core';
import { useIntl } from 'react-intl';
import { DateFormat, formatDate } from 'lib/date';
import { CopyToClipboard } from 'apps/ui';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import { getReasonToken, IdentityProfileReasonCodes, IdentitySummary } from 'apps/IdentityProfile/models/IdentityProfile.model';
import dayjs from 'dayjs';
import { useStyles } from './ProfileInformation.styles';

interface GoogleAddress {
  types: Array<'street_address' | 'country' | 'locality' | 'political'>;
  // eslint-disable-next-line camelcase
  formatted_address: string;
}

export function ProfileInformation({ profileSummary, identityId, isShowFull = true }: {
  identityId: string;
  profileSummary: IdentitySummary;
  isShowFull: boolean;
}) {
  const intl = useIntl();
  const classes = useStyles();
  const { fullName, location, dateOfBirth } = profileSummary || {};
  const userAge = useMemo(() => dayjs().diff(dayjs(dateOfBirth?.value), 'year') || '', [dateOfBirth?.value]);
  const [geocoder, setGeocoder] = useState(null);
  const [locationName, setLocationName] = useState('');

  useEffect(() => {
    const windowAlias = window as any;

    if (windowAlias?.google?.maps && !geocoder) {
      setGeocoder(new windowAlias.google.maps.Geocoder());
    }
  }, [geocoder]);

  useEffect(() => {
    if (geocoder && location?.value) {
      geocoder.geocode({ location: { lat: location.value?.latitude, lng: location.value?.longitude } }, (res: GoogleAddress[]) => {
        const foundAddress = res.find((address) => address?.types?.includes('locality') && address?.types?.includes('political')) || res.find((item) => item?.types?.includes('country') && item?.types?.includes('political'));
        setLocationName(foundAddress?.formatted_address);
      });
    }
  }, [geocoder, location?.value]);

  return (
    <Box>
      <Box color="common.black75" mb={0.5}>
        {intl.formatMessage({ id: 'IdentityProfile.label.name' })}
      </Box>
      <Grid container alignItems="center" wrap="nowrap">
        <Box mr={0.5} color={`common.black${fullName?.value ? 90 : 50}`} fontWeight="bold" fontSize={24} className={classes.name}>
          {fullName?.value || (
            fullName?.reasonCode !== IdentityProfileReasonCodes.ManualUpdate && (intl.formatMessage({ id: getReasonToken(fullName?.reasonCode) }))
          )}
        </Box>
      </Grid>
      <Collapse in={isShowFull}>
        <Box mt={2}>
          <Box mb={2}>
            <Box color="common.black75" mb={0.5}>
              {intl.formatMessage({ id: 'IdentityProfile.label.birth' })}
            </Box>
            <Grid container wrap="nowrap">
              <Box display="flex" color="common.black75" mr={0.5} fontSize={17} flexShrink={0}>
                <FiCalendar />
              </Box>
              <Box mr={0.5} color={`common.black${dateOfBirth?.value ? 90 : 50}`} fontWeight="bold">
                {dateOfBirth?.value
                  ? `${formatDate(dateOfBirth?.value, DateFormat.MonthShortWithSpace)} ${userAge ? `(${userAge})` : ''}`
                  : intl.formatMessage({ id: getReasonToken(dateOfBirth?.reasonCode) }) }
              </Box>
            </Grid>
          </Box>
          <Box mb={2}>
            <Box color="common.black75" mb={0.5}>
              {intl.formatMessage({ id: 'IdentityProfile.label.geolocation' })}
            </Box>
            <Grid container wrap="nowrap">
              <Box display="flex" color="common.black75" mr={0.5} fontSize={17} flexShrink={0}>
                <FiMapPin />
              </Box>
              <Box color={`common.black${location?.value ? 90 : 50}`} fontWeight="bold">
                {location?.value || location?.reasonCode === IdentityProfileReasonCodes.ManualUpdate
                  ? locationName
                  : intl.formatMessage({ id: getReasonToken(location?.reasonCode) })}
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
        </Box>
      </Collapse>
    </Box>
  );
}
