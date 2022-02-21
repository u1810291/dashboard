import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
/* eslint-disable import/no-unresolved */
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import { useFormatMessage } from 'apps/intl';
import { TemplateCardProps } from 'apps/SolutionCatalog';
import Tooltip from '@material-ui/core/Tooltip';
import { useStyles } from './TemplateCard.styles';

export function TemplateCard({ title, description, id, handleCardClick }: TemplateCardProps) {
  const classes = useStyles();
  const formatMessage = useFormatMessage();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleSelectButtonClick = (templateId: string) => () => {
    handleCardClick(templateId);
  };

  return (
    <Box
      p={1.5}
      className={classes.templateCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
      {
        isHovered && <Button onClick={handleSelectButtonClick(id)} className={classes.selectButton} color="primary">{formatMessage('TemplateCard.button')}</Button>
      }
    </Box>
  );
}
