import { Box, Paper } from '@material-ui/core';
import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './Tab.styles';

export function Tab({ tabs }) {
  const intl = useIntl();
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleSelect = useCallback((index) => {
    setSelectedTab(index);
  }, []);

  return (
    <Box>
      {/* tabs */}
      <Box className={classes.tabs}>
        <Box className={classes.header}>
          {tabs.map((tab, index, all) => {
            const isLineShowed = index < all.length - 1 && (selectedTab - index > 1 || index - selectedTab > 0);
            return [
              <Box
                key={tab.label}
                data-qa={tab.qa}
                className={classNames(classes.tab, {
                  [classes.active]: selectedTab === index,
                })}
                onClick={() => handleSelect(index)}
              >
                {intl.formatMessage({ id: tab.label })}
              </Box>,
              <Box
                key={`line-${index}`}
                className={classNames(classes.line, {
                  [classes.lineShow]: isLineShowed,
                })}
              />,
            ];
          })}
        </Box>
      </Box>

      {/* content */}
      <Paper className={classes.body}>
        {tabs[selectedTab].body}
      </Paper>
    </Box>
  );
}
