import { Paper, Typography, Box } from '@material-ui/core';
import { InfoTooltip, Items } from 'components';
import { get, times } from 'lodash';
import React from 'react';
import { useIntl } from 'react-intl';

export function PlanFeatures() {
  const intl = useIntl();

  return (
    <Paper>
      <Box p={4}>
        <Typography variant="h4" gutterBottom>
          {intl.formatMessage({ id: 'fragments.account.plans-features.title' })}
        </Typography>

        <Items autoRows="1fr">
          {['identity-features', 'other-features'].map((key) => (
            <Items flow="row" key={key}>
              <Typography variant="h5" color="textSecondary">
                {intl.formatMessage({ id: `fragments.account.plans-features.${key}.title` })}
              </Typography>

              <ul className="mgi-list mgi-list--check">
                {times(7).map((i) => (
                  <li key={i}>
                    {intl.formatMessage({
                      id: `fragments.account.plans-features.${key}.${i}`,
                    })}
                    {get(intl.messages, `fragments.account.plans-features.${key}.${i}.tip`)
                      && (
                        <InfoTooltip
                          title={intl.formatMessage({ id: `fragments.account.plans-features.${key}.${i}.tip` })}
                        />
                      )}
                  </li>
                ))}
              </ul>
            </Items>
          ))}
        </Items>
      </Box>
    </Paper>
  );
}
