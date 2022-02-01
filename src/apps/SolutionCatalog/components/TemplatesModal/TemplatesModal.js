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

const mockTemplates = {
  Compliance: [
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
  Work: [
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
  Finance: [
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
};

const mockFiltersData = [
  { id: 1, type: 'industry', name: 'Compliance', description: 'Blablabla' },
  { id: 2, type: 'industry', name: 'Work', description: 'Blablabla' },
  { id: 3, type: 'industry', name: 'Finance', description: 'Blablabla' },
  { id: 4, type: 'country', name: 'North America', description: 'Blablabla' },
  { id: 5, type: 'country', name: 'South and Central America', description: 'Blablabla' },
  { id: 6, type: 'country', name: 'Asia', description: 'Blablabla' },
  { id: 7, type: 'country', name: 'Europe', description: 'Blablabla' },
  { id: 8, type: 'country', name: 'Africa', description: 'Blablabla' },
  { id: 9, type: 'country', name: 'Oceania', description: 'Blablabla' },
];

export function TemplatesModal({ onSubmit }) {
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  const [, closeOverlay] = useOverlay();
  const [currentValue, setCurrentValue] = useState({ industry: [], country: [] });
  const filtersByDefault = !Object.values(currentValue).some((el) => !!el.length);

  const handleSubmit = useCallback((data) => onSubmit(data), [onSubmit]);

  // TODO:  this function just for example how filtering looks like , until we don't have response from backend
  const filteredArray = (dataArray) => {
    if (!currentValue.industry.length) return dataArray;
    const filterResult = dataArray;
    return Object.keys(filterResult).forEach((industry) => currentValue.industry.indexOf(industry) <= 0 && delete filterResult[industry]);
  };

  const filteredResponse = filteredArray(mockTemplates);

  console.log(filteredResponse);

  const getFiltersOptions = () => {
    const titles = [...new Set(mockFiltersData.map((item) => item.type))];
    return titles.map((title) => {
      const uniqueOptions = mockFiltersData.filter((item) => item.type === title);
      return { title, data: ['All', ...new Set(uniqueOptions.map((item) => item.name))] };
    });
  };

  const filtersOptions = getFiltersOptions();

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
            { filtersOptions.map((filter, idx) => (
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
          { Object.entries(filteredResponse).map(([title, data], idx) => (
            <Box key={idx}>
              <Typography className={classes.swiperTitle}>{title}</Typography>
              <TemplatesGallery onSubmit={handleSubmit} mockTemplates={data} />
            </Box>
          ))}
        </Box>
      </Box>
    </Modal>
  );
}
