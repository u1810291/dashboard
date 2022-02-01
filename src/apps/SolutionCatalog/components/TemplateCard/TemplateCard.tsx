/* eslint-disable import/no-unresolved */
import React from 'react';
import { Box, Button } from '@material-ui/core';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import { TemplateCardProps } from 'models/TemplatesModal.model';
import Tooltip from '@material-ui/core/Tooltip';
import { useStyles } from './TemplateCard.styles';

export function TemplateCard({ title, description }: TemplateCardProps) {
  const classes = useStyles();
  return (
    <Box p={1.5} className={classes.templateCard}>
      <span className={classes.templateCardTitle}>{title}</span>
      <Tooltip
        arrow
        classes={classes}
        title={description}
      >
        <Box mt={1} className={classes.descriptionContainer}>
          <span className={classes.description}>{description}</span>
        </Box>
      </Tooltip>
      <Button variant="contained" className={classes.selectButton} color="primary">Select</Button>
    </Box>
  );
}
