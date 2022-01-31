/* eslint-disable import/no-unresolved */
import React, { useCallback, useState } from 'react';
import { useFormatMessage } from 'apps/intl';
// import { PageLoader } from 'apps/layout';
import { useOverlay, Modal } from 'apps/overlay';
import { Box, Typography } from '@material-ui/core';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { TemplateFilters } from 'apps/filter';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import { TemplatesGallery } from '../TemplatesGalery';
import { TemplatesChosenFilters } from '../TemplatesChosenFilters';
import { useStyles } from './TemplatesModal.styles';

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
    title: 'Industry',
    data: [
      'All', 'Compliance', 'Work', 'Finance',
    ],
  },
  {
    title: 'Country',
    data: [
      'All', 'North America', 'South and Central America', 'Asia', 'Europe', 'Africa', 'Oceania',
    ],
  },
];

export function TemplatesModal({ onSubmit }) {
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  const [, closeOverlay] = useOverlay();
  const [currentValue, setCurrentValue] = useState({ Industry: [], Country: [] });
  const filtersByDefault = !Object.values(currentValue).some((el) => !!el.length);

  const handleSubmit = useCallback((data) => onSubmit(data), [onSubmit]);

  const filteredArray = (dataArray) => {
    if (!currentValue.Industry.length) return dataArray;
    return dataArray.filter((item) => currentValue.Industry.indexOf(item.name) >= 0);
  };

  const filteredResponse = filteredArray(mockTemplates);

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
              <TemplateFilters
                key={idx}
                title={filter.title}
                filterData={filter.data}
                currentValue={currentValue}
                setCurrentValue={setCurrentValue}
              />
            ))}
          </Box>
        </Box>
        {
          !filtersByDefault && <TemplatesChosenFilters currentValue={currentValue} setCurrentValue={setCurrentValue} />
        }
        <Box>
          { filteredResponse.map((industry, idx) => (
            <Box key={idx}>
              <Typography className={classes.swiperTitle}>{industry.name}</Typography>
              <TemplatesGallery onSubmit={handleSubmit} mockTemplates={industry.data} />
            </Box>
          ))}
        </Box>
      </Box>
    </Modal>
  );
}
