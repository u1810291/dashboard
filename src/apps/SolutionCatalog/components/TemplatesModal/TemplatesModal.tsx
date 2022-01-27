/* eslint-disable import/no-unresolved */
import React, { useCallback } from 'react';
import { useFormatMessage } from 'apps/intl';
// import { PageLoader } from 'apps/layout';
import { useOverlay, Modal } from 'apps/overlay';
// import { appPalette } from 'apps/theme';
import { Box } from '@material-ui/core';
// import classnames from 'classnames';
// import { FiArrowRight, FiArrowDownLeft, FiArrowLeft } from 'react-icons/fi';
// import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { TemplateFilters } from 'apps/filter';
import { useStyles } from './TemplatesModal.styles';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import { TemplatesGallery } from '../TemplatesGalery';

SwiperCore.use([Pagination, Navigation]);

const mockTemplates = [
  {
    name: 'Compliance',
    data: [
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
    ],
  },
  {
    name: 'Work',
    data: [
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
    ],
  },
  {
    name: 'Finance',
    data: [
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
    ],
  },
];

const mockFiltersData = [
  {
    title: 'Filter by Industry',
    data: [
      'All', 'Compliance', 'Work', 'Finance',
    ],
  },
  {
    title: 'Filter by Region',
    data: [
      'All', 'North America', 'South and Central America', 'Asia', 'Europe', 'Africa', 'Oceania',
    ],
  },
];

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
        <Box className={classes.modalHeader}>
          <Box className={classes.modalHeaderLeft}>
            <span className={classes.modalTitle}>
              Metamap Templates
            </span>
            <span className={classes.modalSubtitle}>
              Filter by industry and country to get started with one of our template metamaps
            </span>
          </Box>
          <Box className={classes.modalHeaderRight}>
            { mockFiltersData.map((filter, idx) => (
              <TemplateFilters buttonTitle={filter.title} filterData={filter.data} />
            ))}
          </Box>
        </Box>
        <Box mt={2}>
          { mockTemplates.map((industry, idx) => (
            <TemplatesGallery onSubmit={handleSubmit} title={industry.name} mockTemplates={industry.data} />
          ))}
        </Box>
      </Box>
    </Modal>
  );
}
