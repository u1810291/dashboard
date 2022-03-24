import React, { ReactNode } from 'react';
import { Box, Grid } from '@material-ui/core';
import classNames from 'classnames';
import { useStyles } from './ExtendedDescription.styles';

interface ExtendedDescriptionProps {
  title: ReactNode;
  text?: ReactNode;
  prefix?: ReactNode;
  postfix?: ReactNode;
  badge?: ReactNode;
  className?: string;
  children?: ReactNode;
  isDisabled?: boolean;
  textFontSize?: number;
  titleColor?: string;
  postfixColor?: string;
  postfixFontWeight?: string;
}

export function ExtendedDescription({ title, text, prefix, postfix, className, children, badge, isDisabled, textFontSize, titleColor = 'common.black90', postfixColor, postfixFontWeight }: ExtendedDescriptionProps) {
  const classes = useStyles();

  return (
    <Grid container className={classNames(classes.extendedDescription, className, { [classes.disabled]: isDisabled })}>
      <Grid item xs={12} container alignItems="baseline" wrap="nowrap">
        {prefix && <Box mr={0.7}>{prefix}</Box>}
        <Box>
          <Box mb={0.5} fontWeight="bold" color={titleColor}>{title}</Box>
        </Box>
        <Box ml="auto">
          <Grid item container alignItems="center" wrap="nowrap">
            {badge && <Box mr={1} fontSize={12} fontWeight="bold" className={classes.badge}>{badge}</Box>}
            {postfix && (
              <Box ml={0.7} color={postfixColor} fontWeight={postfixFontWeight}>
                {postfix}
              </Box>
            )}
          </Grid>
        </Box>
      </Grid>
      {text && <Box mr={postfix ? 2.5 : 0} fontSize={textFontSize} color="common.black75">{text}</Box>}
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
