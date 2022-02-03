/* eslint-disable import/no-unresolved */
import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import { useFormatMessage } from 'apps/intl';
import { TemplateCardProps } from 'models/TemplatesModal.model';
import Tooltip from '@material-ui/core/Tooltip';
import { useStyles } from './TemplateCard.styles';

export function TemplateCard({ title, description }: TemplateCardProps) {
  const classes = useStyles();
  const formatMessage = useFormatMessage();

  return (
    <Box p={1.5} className={classes.templateCard}>
      <span className={classes.templateCardTitle}>{title}</span>
      <Tooltip
        arrow
        classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
        title={description}
      >
        <Box mt={1} className={classes.descriptionContainer}>
          <span className={classes.description}>{description}</span>
        </Box>
      </Tooltip>
      <Button className={classes.selectButton} color="primary">{formatMessage('TemplateCard.button')}</Button>
    </Box>
  );
}
