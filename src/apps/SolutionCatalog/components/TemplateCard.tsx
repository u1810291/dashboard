/* eslint-disable import/no-unresolved */
import React from 'react';
import { Box } from '@material-ui/core';
import { useStyles } from './TemplatesModal/TemplatesModal.styles';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

export function TemplateCard({ title, description }) {
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
