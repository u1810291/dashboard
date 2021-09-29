import { Box, Card, Grid, Typography } from '@material-ui/core';
import { ReactComponent as IconLoad } from 'assets/icon-load.svg';
import { QATags } from 'models/QA.model';
import { getExplanationStatuses, getIdentityStatusDescription, getIdentityStatusExplanation, getIdentityStatusLabel } from 'models/Status.model';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useStyles } from './StatusSelector.styles';

export function StatusSelector({ value, isOpen, onSelect, header, isChangeable = true }:
  {
    value: any;
    isOpen: boolean;
    onSelect: (id: string) => Promise<void>;
    header?: string;
    isChangeable?: boolean;
  }) {
  const intl = useIntl();
  const classes = useStyles();
  const [statuses] = useState(getExplanationStatuses());
  const [open, setOpen] = useState(isOpen);
  const [isLoading, setIsLoading] = useState(false);
  const statusSelectorRef = useRef(null);

  const toggleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleOuterClick = useCallback((event: Event) => {
    const path = event.composedPath();
    if (!path?.includes(statusSelectorRef.current)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener('click', handleOuterClick);
    } else {
      document.removeEventListener('click', handleOuterClick);
    }
    return () => document.removeEventListener('click', handleOuterClick);
  }, [open, handleOuterClick]);

  const handleSelect = useCallback((id: string) => async () => {
    setIsLoading(true);
    if (onSelect && isChangeable) {
      await onSelect(id);
    }
    setIsLoading(false);
    setOpen(false);
  }, [isChangeable, onSelect]);

  return (
    <Card ref={statusSelectorRef} className={classes.wrapper} data-qa={QATags.Verification.StatusSelector.Button}>
      <Box px={2} py={1.2} bgcolor={value?.color} color={value?.textColor} onClick={toggleOpen} className={classes.wrapper}>
        {header && (
        <Typography variant="body1">{header}</Typography>
        )}
        <Typography variant="h3" className={classes.title}>
          {intl.formatMessage({ id: getIdentityStatusLabel(value?.id) })}
        </Typography>
        <Box pr={2}>
          <Typography variant="body1">
            {intl.formatMessage({ id: getIdentityStatusExplanation(value?.id) })}
          </Typography>
        </Box>
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
              {statuses.map((item) => {
                const isItemChangeable = isChangeable && item.isSelectable && value?.isChangeable;
                return (
                  <Grid
                    className={isItemChangeable ? classes.item : classes.itemNotChangeable}
                    container
                    wrap="nowrap"
                    item
                    key={item.id}
                    onClick={handleSelect(item.id)}
                  >
                    {isItemChangeable && (
                    <Box className={classes.itemIconWrapper}>
                      {value?.id === item.id && (
                      <Box bgcolor={item.color} className={classes.itemIcon} />
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
                );
              })}
            </Grid>
          </Box>
        </Card>
      )}
    </Card>
  );
}
