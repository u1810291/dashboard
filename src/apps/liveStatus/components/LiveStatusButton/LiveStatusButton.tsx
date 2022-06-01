import { TopMenuItem } from 'apps/layout';
import { QATags } from 'models/QA.model';
import React, { useCallback, useState } from 'react';
import { useFormatMessage } from 'apps/intl';
import Box from '@material-ui/core/Box';
import { InfoTooltip } from 'apps/ui';
import { useLiveStatusUpdate } from '../../hooks/liveStatusUpdate';
import { LiveStatuses, LiveStatusesData, LiveStatusPageLink } from '../../models/liveStatus.model';
import { useStyles } from './LiveStatusButton.styles';

export function LiveStatusButton() {
  const formatMessage = useFormatMessage();
  const status = useLiveStatusUpdate();
  const classes = useStyles({ color: LiveStatusesData[status].color });
  const tooltipMessageId = LiveStatusesData[status].messageId;
  const [isShowTooltip, setIsShowTooltip] = useState<boolean>(false);

  const onMouseEnter = useCallback(() => setIsShowTooltip(true), []);
  const onMouseLeave = useCallback(() => setIsShowTooltip(false), []);
  const onClick = useCallback(() => {
    window.open(LiveStatusPageLink, '_blank', 'noopener');
  }, []);

  return (
    <Box
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <TopMenuItem
        id="status-page"
        label={formatMessage('dashboard.menu.statusPage')}
        icon={(
          <InfoTooltip
            title={formatMessage(tooltipMessageId)}
            popperClassname={classes.tooltip}
            placement="top-end"
            isOpen={isShowTooltip && status !== LiveStatuses.Initialization}
          >
            <Box className={classes.marker} p={1}>
              &#8226;
            </Box>
          </InfoTooltip>
        )}
        color="common.black7"
        qa={QATags.Menu.StatusPage}
        handler={onClick}
      />
    </Box>
  );
}
