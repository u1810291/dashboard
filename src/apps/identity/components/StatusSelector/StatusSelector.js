import { Box, Grid, Typography, Card } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { FiChevronDown } from 'react-icons/fi';
import { ReactComponent as IconLoad } from 'assets/icon-load.svg';
import {
  getExplanationStatuses,
  getIdentityStatusDescription, getIdentityStatusExplanation,
  getIdentityStatusLabel,
} from 'models/Status.model';
import { useStyles } from './StatusSelector.styles';
import { QATags } from '../../../../models/QA.model';

export function StatusSelector({ value, isOpen, onSelect }) {
  const intl = useIntl();
  const classes = useStyles();
  const [statuses] = useState(getExplanationStatuses());
  const [open, setOpen] = useState(isOpen);
  const [isLoading, setIsLoading] = useState(false);
  const toggleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleOuterClick = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener('click', handleOuterClick);
    } else {
      document.removeEventListener('click', handleOuterClick);
    }
    return () => document.removeEventListener('click', handleOuterClick);
  }, [open, handleOuterClick]);

  const handleSelect = useCallback(async (id) => {
    setIsLoading(true);
    if (onSelect) {
      await onSelect(id);
    }
    setIsLoading(false);
  }, [onSelect]);

  return (
    <Card className={classes.wrapper} data-qa={QATags.Verification.StatusSelector.Button}>
      <Box px={2} py={1.2} bgcolor={value?.color} color={value?.textColor} onClick={toggleOpen} className={classes.wrapper}>
        <Typography variant="body1">
          {intl.formatMessage({ id: 'statusSelect.status' })}
        </Typography>
        <Typography variant="h3" className={classes.title}>
          {intl.formatMessage({ id: getIdentityStatusLabel(value?.id) })}
        </Typography>
        <Typography variant="body1">
          {intl.formatMessage({ id: getIdentityStatusExplanation(value?.id) })}
        </Typography>
        {isLoading ? (
          <IconLoad className={classes.icon} />
        ) : (
          <FiChevronDown className={`${classes.icon} ${open ? classes.iconOpen : ''}`} color={value?.textColor} />
        )}
      </Box>
      {open && (
        <Card className={classes.openItems}>
          <Box p={2} pl={1.5}>
            <Grid container direction="column" spacing={2} data-qa={QATags.Verification.StatusSelector.Content}>
              {statuses.map((item) => (
                <Grid
                  className={item.isSelectable && value?.isChangeable ? classes.item : classes.itemNotChangeable}
                  container
                  wrap="nowrap"
                  item
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                >
                  {item.isSelectable && value?.isChangeable && (
                    <Box className={classes.itemIconWrapper}>
                      {value?.id === item.id && (
                        <Box bgcolor={item.color} item className={classes.itemIcon} />
                      )}
                    </Box>
                  )}
                  <Box>
                    <Box color={item.color}>
                      <Typography variant="subtitle2" gutterBottom>
                        {intl.formatMessage({ id: getIdentityStatusLabel(item.id) })}
                      </Typography>
                    </Box>
                    <Typography variant="body1" className={classes.text}>
                      {intl.formatMessage({ id: getIdentityStatusDescription(item.id) })}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Card>
      )}
    </Card>
  );
}
