import React, { useCallback } from 'react';
import { useFormatMessage } from 'apps/intl';
// import { PageLoader } from 'apps/layout';
import { useOverlay, Modal } from 'apps/overlay';
import { useStyles } from './TemplatesModal.styles';
import { Box, Typography } from '@material-ui/core';

const mockTemplates = [
  {
    title: 'Lending Secured Loan Application',
    description: 'A user applies for a secured loan - the asset (used vehicle) secures the loan.',
  },
  {
    title: 'Crypto Account Opening',
    description: 'A user wants to create account with crypto exchange and look around.',
  },
  {
    title: 'Neobank Credit Card Application',
    description: 'A user (at least 18 y.o.) wants to get a credit card from a neobank. The objective of the merchant is to get as much requests as possible however this is a clear trade-off between number of requests and volume of data associated with the user.',
  },
  {
    title: 'Neobank Account Opening',
    description: 'A user (at least 18 y.o.) wants to get a credit card from a neobank. The objective of the merchant is to get as much requests as possible however this is a clear trade-off between number of requests and volume of data associated with the user.',
  },
  {
    title: 'Lending Secured Loan Application',
    description: 'A user applies for a secured loan - the asset (used vehicle) secures the loan.',
  },
  {
    title: 'Crypto Account Opening',
    description: 'A user wants to create account with crypto exchange and look around.',
  },
  {
    title: 'Neobank Credit Card Application',
    description: 'A user (at least 18 y.o.) wants to get a credit card from a neobank. The objective of the merchant is to get as much requests as possible however this is a clear trade-off between number of requests and volume of data associated with the user.',
  },
  {
    title: 'Neobank Account Opening',
    description: 'A user (at least 18 y.o.) wants to get a credit card from a neobank. The objective of the merchant is to get as much requests as possible however this is a clear trade-off between number of requests and volume of data associated with the user.',
  },
];

const TemplateCard = ({ title, description }) => {
  const classes = useStyles();

  return (
    <Box className={classes.templateContainer}>
      <Box p={1.5}>
        <span className={classes.templateCardTitle}>{title}</span>
        <Box mt={1} className={classes.descriptionContainer}>
          <span className={classes.description}>{description}</span>
        </Box>
      </Box>
    </Box>
  );
};

const TemplatesGallery = () => {
  const classes = useStyles();

  const handleClickRightNavigation = () => {
    console.log('click');
    document.getElementById('galleryContainer').scrollLeft += 220;
  };

  const handleClickLeftNavigation = () => {
    document.getElementById('galleryContainer').scrollLeft -= 220;
  };

  return (
    <>
      <Box className={classes.galleryContainer} id="galleryContainer">
        {mockTemplates.map((mockTemplate) => <TemplateCard title={mockTemplate.title} description={mockTemplate.description} />)}
        <Box className={classes.controlsContainer}>
          <Box className={classes.navigationControl} onClick={handleClickLeftNavigation} />
          <Box className={classes.navigationControl} onClick={handleClickRightNavigation} />
        </Box>
      </Box>
    </>
  );
};

export function TemplatesModal({ onSubmit }) {
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  const [, closeOverlay] = useOverlay();

  const handleSubmit = useCallback((data) => onSubmit(data), [onSubmit]);

  return (
    <Modal
      onClose={closeOverlay}
      className={classes.modal}
    >
      <Box ml={2} mr={2} mt={2} mb={2}>
        <span className={classes.modalTitle}>
          Metamap Templates
        </span>
        <Box mt={1}>
          <span className={classes.modalSubtitle}>
            What are you trying to achieve with MetaMap?
          </span>
        </Box>
        <Box mt={2}>
          <TemplatesGallery />
        </Box>
      </Box>
    </Modal>
  );
}
