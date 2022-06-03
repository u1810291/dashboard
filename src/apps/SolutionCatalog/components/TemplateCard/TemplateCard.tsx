import React, { useState, useCallback, useMemo } from 'react';
import { productManagerService } from 'apps/Product';
import classNames from 'classnames';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { ProductTypes } from 'models/Product.model';
import { useFormatMessage } from 'apps/intl';
import Tooltip from '@material-ui/core/Tooltip';
import { MAX_NUMBER_OF_MERITS } from '../../model/SolutionCatalog.model';
import { useStyles } from './TemplateCard.styles';

export function TemplateCard({ title, description, id, handleCardClick, meritsList }: {
  title: string;
  description: string;
  id: string;
  handleCardClick: (id: string) => void;
  meritsList?: ProductTypes[];
}) {
  const classes = useStyles();
  const formatMessage = useFormatMessage();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const handleSelectButtonClick = useCallback((templateId: string) => () => {
    handleCardClick(templateId);
  }, [handleCardClick]);
  const slicedMeritsArray = useMemo(() => meritsList.slice(0, MAX_NUMBER_OF_MERITS), [meritsList]);

  return (
    <Box
      className={classes.cardContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box
        p={1.6}
        className={classNames(classes.templateCard, { [classes.cardHovered]: isHovered })}
      >
        <span className={classes.templateCardTitle}>{title}</span>
        <Box className={classes.iconsContainer}>
          {meritsList.length
            && slicedMeritsArray.map((merit) => (
              <div key={merit} className={classes.iconBorder}>
                <Box className={classes.icon}>
                  {productManagerService.getProduct(merit).icon}
                </Box>
              </div>
            ))}
          {meritsList.length >= MAX_NUMBER_OF_MERITS
            && <Box className={classes.helperText}>{formatMessage('TemplateCard.and.more')}</Box>}
        </Box>
        <Tooltip
          arrow
          disableHoverListener={description.length < 110}
          classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
          title={description}
        >
          <Box mt={1} className={classes.descriptionContainer}>
            <span className={classes.description}>{description}</span>
          </Box>
        </Tooltip>
      </Box>
      <Box>
        {
          isHovered && <Button onClick={handleSelectButtonClick(id)} className={classes.selectButton} data-analytics-templateId={id} color="primary">{formatMessage('TemplateCard.button')}</Button>
        }
      </Box>
    </Box>
  );
}
