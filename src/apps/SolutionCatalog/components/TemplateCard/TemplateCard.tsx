import React, { useState, useCallback } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
/* eslint-disable import/no-unresolved */
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import { useFormatMessage } from 'apps/intl';
import Tooltip from '@material-ui/core/Tooltip';
import { useStyles } from './TemplateCard.styles';

export function TemplateCard({ title, description, id, handleCardClick }: {
  title: string;
  description: string;
  id: string;
  handleCardClick: (id: string) => void;
}) {
  const classes = useStyles();
  const formatMessage = useFormatMessage();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleSelectButtonClick = useCallback((templateId: string) => () => {
    handleCardClick(templateId);
  }, [handleCardClick]);

  return (
    <Box
      p={1.5}
      className={classes.templateCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={classes.templateCardTitle} data-analytics-templateId={id}>{title}</span>
      <Tooltip
        arrow
        disableHoverListener={description.length < 75}
        classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
        title={description}
      >
        <Box mt={1} className={classes.descriptionContainer}>
          <span className={classes.description}>{description}</span>
        </Box>
      </Tooltip>
      <Box className={classes.boxContainer}>
        {
          isHovered && <Button onClick={handleSelectButtonClick(id)} className={classes.selectButton} color="primary">{formatMessage('TemplateCard.button')}</Button>
        }
      </Box>
    </Box>
  );
}
