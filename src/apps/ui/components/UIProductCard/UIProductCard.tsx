import { Box, Button, Grid, useMediaQuery, useTheme } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Modal, useOverlay } from 'apps/overlay';
import classNames from 'classnames';
import { IProductCard, ProductIntegrationTypes } from 'models/Product.model';
import React, { useCallback, useState } from 'react';
import { FiTrash2, FiInfo } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { ProductCheckList } from '../ProductCheckList/ProductCheckList';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, useStyles } from './UIProductCard.styles';

export function UIProductCard({ card, issuesComponent, isExpandable = true, isControls = false, defaultExpanded = false, onOpen, onRemove }: {
  card: IProductCard;
  issuesComponent?: React.ReactNode;
  isExpandable?: boolean;
  defaultExpanded?: boolean;
  isControls?: boolean;
  onOpen?: () => void;
  onRemove?: () => void;
}) {
  const intl = useIntl();
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const [createOverlay] = useOverlay();

  const handleOpenIssuesPopup = useCallback(() => {
    createOverlay(<Modal className={classes.modal}>{issuesComponent}</Modal>);
  }, [createOverlay, issuesComponent, classes.modal]);

  const handleChange = useCallback(() => {
    if (isExpandable) {
      setIsExpanded((prev) => !prev);
    }
  }, [isExpandable]);

  return (
    <Box className={classes.root}>
      <ExpansionPanel expanded={isExpanded} onChange={handleChange} onClick={isControls && onOpen} TransitionProps={{ unmountOnExit: true }}>
        <ExpansionPanelSummary expandIcon={isExpandable && card.checks.length > 0 && <ExpandMoreIcon />}>
          <Grid container alignItems="center" wrap="nowrap">
            {card.icon && (
              <Grid container justify="center" alignItems="center" className={classes.iconWrapper}>
                <Box className={classes.icon}>{card.icon}</Box>
              </Grid>
            )}
            <Box ml={1} mr={2}>
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
              {card.integrationTypes.length === 1 && card.integrationTypes[0] === ProductIntegrationTypes.Sdk && (
                <Box mt={0.5} mr={0.5} className={classes.integrationType}>{intl.formatMessage({ id: 'FlowBuilder.integration.sdkOnly' })}</Box>
              )}
            </Box>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Box mt={1.2} ml={5.8}>
            <ProductCheckList isForceFlat cards={[card]} />
          </Box>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      {isControls && (
        <Box>
          <Button className={classNames(classes.control, classes.controlTrash)} onClick={onRemove}>
            <FiTrash2 size={17} />
          </Button>
          {issuesComponent && isSmallScreen ? (
            <Button className={classNames(classes.control, classes.controlIssues)} onClick={handleOpenIssuesPopup}>
              <FiInfo size={25} />
            </Button>
          ) : issuesComponent}
        </Box>
      )}
    </Box>
  );
}
