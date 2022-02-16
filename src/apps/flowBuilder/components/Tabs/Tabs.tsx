import { Box, Grid, Button } from '@material-ui/core';
import classNames from 'classnames';
import React, { useCallback, useState, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './Tabs.styles';

export function Tabs({ tabs, activeTab, onChange }: {
  tabs: {
    id: string;
    label: string;
    qa: string;
    body: React.ReactNode;
  }[];
  activeTab?: string;
  onChange?: (tab: string) => void;
}) {
  const intl = useIntl();
  const classes = useStyles();
  const [selectedTabId, setSelectedTabId] = useState(activeTab || tabs[0]?.id);

  const handleSelect = useCallback((id) => () => {
    setSelectedTabId(id);

    if (onChange) {
      onChange(id);
    }
  }, [onChange]);

  const selectedTab = useMemo(() => tabs.find((tab) => tab.id === selectedTabId).body, [tabs, selectedTabId]);

  return (
    <Box>
      {/* tabs */}
      <Box mb={4}>
        <Grid container wrap="nowrap">
          {tabs.map((tab) => [
            <Button
              key={tab.label}
              data-qa={tab.qa}
              className={classNames(classes.tab, {
                [classes.active]: selectedTabId === tab.id,
              })}
              onClick={handleSelect(tab.id)}
            >
              {intl.formatMessage({ id: tab.label })}
            </Button>,
          ])}
        </Grid>
      </Box>

      {/* content */}
      <Box>
        {selectedTab}
      </Box>
    </Box>
  );
}
