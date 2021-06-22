import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { Box, Paper, Switch } from '@material-ui/core';
import { useStyles, TitleBadge } from './SettingCard.styles';

export interface CardProps {
  title?: string | React.ReactNode,
  text?: string | React.ReactNode,
  badgeText?: string,
  icon?: React.ReactNode,
  disabled?: boolean,
  noRadio?: boolean,
  isActive: boolean,
  value: any,
  onChange: Function,
  children?: (CardChildrenProps) => React.ReactNode,
}

export function SettingCard({
  title,
  text,
  badgeText,
  icon,
  isActive,
  value,
  noRadio = false,
  onChange,
  children,
}: CardProps) {
  const intl = useIntl();
  const classes = useStyles() as any;

  const handleChange = useCallback(() => {
    onChange({ isActive: !isActive, value });
  }, [isActive, onChange, value]);

  return (
    <Paper className={classes.paper}>
      <Box className={classes.container}>
        {/* Header */}
        <Box className={classes.header}>
          {typeof title === 'string' ? (
            <Box className={classes.titleText}>
              {intl.formatMessage({ id: title })}
            </Box>
          ) : title}
          {typeof text === 'string' ? (
            <Box className={classes.text}>
              {intl.formatMessage({ id: text })}
            </Box>
          ) : text}
          {badgeText
          && <Box><TitleBadge label={intl.formatMessage({ id: badgeText })} /></Box>}

          {!noRadio && (
            <Switch
              name="ipCheck"
              color="primary"
              size="small"
              checked={isActive}
              onChange={handleChange}
              // disabled={disabled}
            />
          )}
        </Box>

        {/* Body */}
        <Box ml={icon ? 2.5 : 0} className={classes.body}>
          {children && children({})}
        </Box>
      </Box>
    </Paper>
  );
}
