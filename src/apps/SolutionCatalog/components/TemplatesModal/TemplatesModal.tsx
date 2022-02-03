/* eslint-disable import/no-unresolved */
import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormatMessage } from 'apps/intl';
// import { PageLoader } from 'apps/layout';
import { useOverlay, Modal } from 'apps/overlay';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { TemplateFilters } from 'apps/filter';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import { TemplateCardOptions, CardsData } from 'models/TemplatesModal.model';
import { TemplatesGallery } from '../TemplatesGalery/TemplatesGalery';
import { TemplatesChosenFilters } from '../TemplatesChosenFilters/TemplatesChosenFilters';
import { loadTemplates } from '../../store/SolutionCatalog.action';
import { selectAllTemplatesList } from '../../store/SolutionCatalog.selectors';
import { useStyles } from './TemplatesModal.styles';

SwiperCore.use([Pagination, Navigation]);

const mockTemplates = {
  Compliance: [
    {
      name: 'Lending Secured Loan Application',
      description: 'A user applies for a secured loan - the asset (used vehicle) secures the loan.',
    },
    {
      name: 'Crypto Account Opening',
      description: 'A user wants to create account with crypto exchange and look around.',
    },
    {
      name: 'Neobank Credit Card Application',
      description: 'A user (at least 18 y.o.) wants to get a credit card from a neobank. The objective of the merchant is to get as much requests as possible however this is a clear trade-off between number of requests and volume of data associated with the user.',
    },
    {
      name: 'Neobank Account Opening',
      description: 'A user (at least 18 y.o.) wants to get a credit card from a neobank. The objective of the merchant is to get as much requests as possible however this is a clear trade-off between number of requests and volume of data associated with the user.',
    },
    {
      name: 'Lending Secured Loan Application',
      description: 'A user applies for a secured loan - the asset (used vehicle) secures the loan.',
    },
    {
      name: 'Crypto Account Opening',
      description: 'A user wants to create account with crypto exchange and look around.',
    },
    {
      name: 'Neobank Credit Card Application',
      description: 'A user (at least 18 y.o.) wants to get a credit card from a neobank. The objective of the merchant is to get as much requests as possible however this is a clear trade-off between number of requests and volume of data associated with the user.',
    },
    {
      name: 'Neobank Account Opening',
      description: 'A user (at least 18 y.o.) wants to get a credit card from a neobank. The objective of the merchant is to get as much requests as possible however this is a clear trade-off between number of requests and volume of data associated with the user.',
    },
  ],
  Work: [
    {
      name: 'Lending Secured Loan Application',
      description: 'A user applies for a secured loan - the asset (used vehicle) secures the loan.',
    },
    {
      name: 'Crypto Account Opening',
      description: 'A user wants to create account with crypto exchange and look around.',
    },
    {
      name: 'Neobank Credit Card Application',
      description: 'A user (at least 18 y.o.) wants to get a credit card from a neobank. The objective of the merchant is to get as much requests as possible however this is a clear trade-off between number of requests and volume of data associated with the user.',
    },
    {
      name: 'Neobank Account Opening',
      description: 'A user (at least 18 y.o.) wants to get a credit card from a neobank. The objective of the merchant is to get as much requests as possible however this is a clear trade-off between number of requests and volume of data associated with the user.',
    },
    {
      name: 'Lending Secured Loan Application',
      description: 'A user applies for a secured loan - the asset (used vehicle) secures the loan.',
    },
    {
      name: 'Crypto Account Opening',
      description: 'A user wants to create account with crypto exchange and look around.',
    },
    {
      name: 'Neobank Credit Card Application',
      description: 'A user (at least 18 y.o.) wants to get a credit card from a neobank. The objective of the merchant is to get as much requests as possible however this is a clear trade-off between number of requests and volume of data associated with the user.',
    },
    {
      name: 'Neobank Account Opening',
      description: 'A user (at least 18 y.o.) wants to get a credit card from a neobank. The objective of the merchant is to get as much requests as possible however this is a clear trade-off between number of requests and volume of data associated with the user.',
    },
  ],
  Finance: [
    {
      name: 'Lending Secured Loan Application',
      description: 'A user applies for a secured loan - the asset (used vehicle) secures the loan.',
    },
    {
      name: 'Crypto Account Opening',
      description: 'A user wants to create account with crypto exchange and look around.',
    },
    {
      name: 'Neobank Credit Card Application',
      description: 'A user (at least 18 y.o.) wants to get a credit card from a neobank. The objective of the merchant is to get as much requests as possible however this is a clear trade-off between number of requests and volume of data associated with the user.',
    },
    {
      name: 'Neobank Account Opening',
      description: 'A user (at least 18 y.o.) wants to get a credit card from a neobank. The objective of the merchant is to get as much requests as possible however this is a clear trade-off between number of requests and volume of data associated with the user.',
    },
    {
      name: 'Lending Secured Loan Application',
      description: 'A user applies for a secured loan - the asset (used vehicle) secures the loan.',
    },
    {
      name: 'Crypto Account Opening',
      description: 'A user wants to create account with crypto exchange and look around.',
    },
    {
      name: 'Neobank Credit Card Application',
      description: 'A user (at least 18 y.o.) wants to get a credit card from a neobank. The objective of the merchant is to get as much requests as possible however this is a clear trade-off between number of requests and volume of data associated with the user.',
    },
    {
      name: 'Neobank Account Opening',
      description: 'A user (at least 18 y.o.) wants to get a credit card from a neobank. The objective of the merchant is to get as much requests as possible however this is a clear trade-off between number of requests and volume of data associated with the user.',
    },
  ],
};

const mockFiltersData = [
  { _id: 1, type: 'industry', name: 'Compliance', description: 'Blablabla' },
  { _id: 2, type: 'industry', name: 'Work', description: 'Blablabla' },
  { _id: 3, type: 'industry', name: 'Finance', description: 'Blablabla' },
  { _id: 4, type: 'country', name: 'North America', description: 'Blablabla' },
  { _id: 5, type: 'country', name: 'South and Central America', description: 'Blablabla' },
  { _id: 6, type: 'country', name: 'Asia', description: 'Blablabla' },
  { _id: 7, type: 'country', name: 'Europe', description: 'Blablabla' },
  { _id: 8, type: 'country', name: 'Africa', description: 'Blablabla' },
  { _id: 9, type: 'country', name: 'Oceania', description: 'Blablabla' },
  { _id: 10, type: 'country', name: 'Uzbekistan', description: 'Blablabla' },
  { _id: 11, type: 'country', name: 'Moscow', description: 'Blablabla' },
  { _id: 12, type: 'country', name: 'Kyrgyzistan', description: 'Blablabla' },
];

export function TemplatesModal() {
  const filtersNames = Array.from(new Set(mockFiltersData.map((item) => item.type)));
  const initialFiltersData = filtersNames.reduce((res, key) => {
    const result = { ...res };
    result[key] = [];
    return result;
  }, {});
  const formatMessage = useFormatMessage();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [, closeOverlay] = useOverlay();
  const [currentFilters, setCurrentFilters] = useState<Record<string, TemplateCardOptions[]>>(initialFiltersData);
  const filtersByDefault = !Object.values(currentFilters).some((el) => !!el.length);
  const allTemplates = useSelector<TemplateCardOptions[]>(selectAllTemplatesList);

  // TODO: to check how new endpoint works
  // useEffect(() => {
  //   dispatch(loadTemplates([]));
  // }, [dispatch]);

  // console.log(allTemplates);

  // TODO:  this function just for example how filtering looks like , until we don't have response from backend
  const filteredArray = (dataArray) => {
    // @ts-ignore
    if (!currentFilters.industry.length) return dataArray;
    // @ts-ignore
    const chosenIndustry = currentFilters.industry.map((item) => item.name.toLowerCase());
    const filterResults = Object.entries(dataArray).filter(([industry, data]) => chosenIndustry.includes(industry.toLowerCase()));
    return Object.fromEntries(filterResults);
  };

  const filteredResponse: Record<string, CardsData[]> = filteredArray(mockTemplates);

  const getFiltersOptions = useCallback(() => {
    const titles = Array.from(new Set(mockFiltersData.map((item) => item.type)));
    return titles.map((title) => {
      const uniqueOptions = mockFiltersData.filter((item) => item.type === title);
      return { title, data: [...uniqueOptions] };
    });
  }, [mockFiltersData]);

  const filtersOptions = getFiltersOptions();

  console.log(filtersOptions);

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
              Filter by industry and country to get started with one of our
              template metamaps. If you don&apos;t see the template you&apos;re looking
              for here, request it on our
              {' '}
              <a>Feedback Board</a>
            </span>
          </Box>
          <Box className={classes.modalHeaderRight}>
            { filtersOptions.map((filter, idx) => (
              <TemplateFilters
                key={idx}
                title={filter.title}
                filterData={filter.data}
                currentFilters={currentFilters}
                setCurrentFilters={setCurrentFilters}
              />
            ))}
          </Box>
        </Box>
        {
          !filtersByDefault
          && <TemplatesChosenFilters currentValue={currentFilters} setCurrentValue={setCurrentFilters} initialData={initialFiltersData} />
        }
        <Box>
          { Object.entries(filteredResponse).map(([title, data], idx) => (
            <Box key={idx}>
              <Typography className={classes.swiperTitle}>{title}</Typography>
              <TemplatesGallery mockTemplates={data} />
            </Box>
          ))}
        </Box>
      </Box>
    </Modal>
  );
}
