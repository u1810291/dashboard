import React, { ReactNode } from 'react';
import { Box, Grid } from '@material-ui/core';
import classNames from 'classnames';
import { useStyles } from './ExtendedDescription.styles';

interface ExtendedDescriptionProps {
  title: string;
  text: ReactNode;
  prefix?: ReactNode;
  postfix?: ReactNode;
  badge?: ReactNode;
  className?: string;
  children?: ReactNode;
  isDisabled?: boolean;
}

export function ExtendedDescription({ title, text, prefix, postfix, className, children, badge, isDisabled }: ExtendedDescriptionProps) {
  const classes = useStyles();

  return (
    <Grid container className={classNames(classes.extendedDescription, className, { [classes.disabled]: isDisabled })}>
      <Grid item xs={12} container alignItems="baseline" wrap="nowrap">
        {prefix && <Box mr={0.7}>{prefix}</Box>}
        <Box mr={0.7}>
          <Box mb={0.5} fontWeight="bold" color="common.black90">{title}</Box>
        </Box>
        <Box ml="auto">
          <Grid item container alignItems="center" wrap="nowrap">
            {badge && <Box mr={1} fontSize={12} fontWeight="bold" className={classes.badge}>{badge}</Box>}
            {postfix && (
              <Box ml={0.7}>
                {postfix}
              </Box>
            )}
          </Grid>
        </Box>
      </Grid>
      <Box mr={postfix ? 2.5 : 0} color="common.black75">{text}</Box>
      {children && (
        <Grid item xs={12}>
          <Box mt={2}>
            {children}
          </Box>
        </Grid>
      )}
    </Grid>
  );
}
