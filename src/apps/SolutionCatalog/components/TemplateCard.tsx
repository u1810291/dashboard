/* eslint-disable import/no-unresolved */
import React from 'react';
import { Box } from '@material-ui/core';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import { TemplateCardProps } from '../../../models/TemplatesModal.model';
import { useStyles } from './TemplatesModal/TemplatesModal.styles';

export function TemplateCard({ title, description }: TemplateCardProps) {
  const classes = useStyles();

  return (
    <Box p={1.5}>
      <span className={classes.templateCardTitle}>{title}</span>
      <Box mt={1} className={classes.descriptionContainer}>
        <span className={classes.description}>{description}</span>
      </Box>
    </Box>
  );
}
