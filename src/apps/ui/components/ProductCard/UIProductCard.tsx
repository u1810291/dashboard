import { Box, Grid, Button } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { IProductCard } from 'models/Product.model';
import React, { useCallback, useState } from 'react';
import { FiCheckCircle, FiSettings, FiTrash2 } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, useStyles } from './UIProductCard.styles';

export function UIProductCard({ card, isExpandable = true, isControls = false, onOpen, onRemove }: {
  card: IProductCard;
  isExpandable?: boolean;
  isControls?: boolean;
  onOpen?: () => void;
  onRemove?: () => void;
}) {
  const intl = useIntl();
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleChange = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <Box className={classes.root}>
      <ExpansionPanel expanded={isExpanded} onChange={handleChange}>
        <ExpansionPanelSummary expandIcon={isExpandable && card.checks.length > 0 && <ExpandMore />}>
          <Grid container alignItems="center" wrap="nowrap">
            {card.icon && (
              <Grid container justify="center" alignItems="center" className={classes.iconWrapper}>
                <Box className={classes.icon}>{card.icon}</Box>
              </Grid>
            )}
            <Box ml={1}>
              {card.title && (
                <Box mb={0.5} fontSize={16} color="common.black90">
                  {intl.formatMessage({ id: card.title })}
                </Box>
              )}
              <Box color="common.black75">
                {card.inputs.length > 0 && (
                  intl.formatMessage({ id: 'Product.card.usersInput' }, {
                    inputs: card.inputs.map((item) => intl.formatMessage({ id: `Product.userInput.${item}` })).join(', '),
                  }))}
              </Box>
              {card.integrationTypes.length > 0 && (
                card.integrationTypes.map((item) => (
                  <Box mt={0.5} mr={0.5} className={classes.integrationType} key={item}>{item}</Box>
                ))
              )}
            </Box>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {card.checks.map((item) => (
            <Box key={item} mt={1} ml={6} color="common.green">
              <Grid container alignItems="center" wrap="nowrap">
                <FiCheckCircle className={classes.mark} />
                <Box ml={0.5} fontSize={12}>
                  {intl.formatMessage({ id: item })}
                </Box>
              </Grid>
            </Box>
          ))}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      {isControls && (
        <Box>
          <Button className={classNames(classes.control, classes.controlSettings)} onClick={onOpen}>
            <FiSettings size={17} />
          </Button>
          <Button className={classNames(classes.control, classes.controlTrash)} onClick={onRemove}>
            <FiTrash2 size={17} />
          </Button>
        </Box>
      )}
    </Box>
  );
}
