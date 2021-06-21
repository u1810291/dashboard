import { Grid, Box } from '@material-ui/core';
import { selectFlowBuilderChangeableFlow } from 'apps/flowBuilder/store/FlowBuilder.selectors';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FiUser } from 'react-icons/fi';
import { DateFormat, formatDate } from 'lib/date';
import { useIntl } from 'react-intl';
import { usersCountStub } from '../../models/FlowBuilder.model';

export function FlowInfo() {
  const intl = useIntl();
  const { name: flowName, createdAt: flowCreationDate } = useSelector(selectFlowBuilderChangeableFlow);
  const [usersCount] = useState(usersCountStub);

  return (
    <Box>
      <Box color="common.black90" fontSize={24} mb={0.5}>
        {flowName}
      </Box>
      <Grid container alignItems="center">
        <Box color="common.black75">
          {`${intl.formatMessage({ id: 'FlowBuilder.info.createdIn' })} ${formatDate(flowCreationDate, DateFormat.MonthShortSpaced)}`}
        </Box>
        <Box mx={2} color="common.black75">
          <Grid container alignItems="center">
            <FiUser fontSize={17} />
            <Box component="span" ml={0.5}>
              {usersCount}
            </Box>
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
}
