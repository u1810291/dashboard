import { Box, Button, Grid, useMediaQuery, useTheme } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { Modal, useOverlay } from 'apps/overlay';
import classNames from 'classnames';
import { IProductCard, ProductIntegrationTypes } from 'models/Product.model';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiSettings, FiTrash2, FiInfo } from 'react-icons/fi';
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
  const [issuesPopupOpen, setIssuesPopupOpen] = useState(false);
  const issuesPopupRef = useRef(null);
  const [createOverlay] = useOverlay();

  const handleOpenIssuesPopup = useCallback(() => {
    createOverlay(<Modal className={classes.modal}>{issuesComponent}</Modal>);
  }, [createOverlay, issuesComponent, classes.modal]);

  const handleOuterClick = useCallback((e) => {
    if (!e?.path?.includes(issuesPopupRef.current)) {
      setIssuesPopupOpen(false);
    }
  }, []);

  useEffect(() => {
    if (issuesPopupOpen) {
      document.addEventListener('click', handleOuterClick);
    } else {
      document.removeEventListener('click', handleOuterClick);
    }
    return () => document.removeEventListener('click', handleOuterClick);
  }, [issuesPopupOpen, handleOuterClick]);

  const handleChange = useCallback(() => {
    if (isExpandable) {
      setIsExpanded((prev) => !prev);
    }
  }, [isExpandable]);

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
              {card.integrationTypes.length === 1 && card.integrationTypes[0] === ProductIntegrationTypes.Sdk && (
                <Box mt={0.5} mr={0.5} className={classes.integrationType}>{intl.formatMessage({ id: 'FlowBuilder.integration.sdkOnly' })}</Box>
              )}
            </Box>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Box mt={2}>
            <ProductCheckList checks={card.checks} productId={card.id} />
          </Box>
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
          {issuesComponent && isSmallScreen ? (
            <>
              <Button className={classNames(classes.control, classes.controlIssues)} onClick={handleOpenIssuesPopup}>
                <FiInfo size={25} />
              </Button>
              {issuesPopupOpen && (
                <Box>
                  <div ref={issuesPopupRef}>
                    {issuesComponent}
                  </div>
                </Box>
              )}
            </>
          ) : issuesComponent}
        </Box>
      )}
    </Box>
  );
}
