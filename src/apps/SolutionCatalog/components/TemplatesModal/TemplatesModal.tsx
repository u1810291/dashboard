import React, { useCallback } from 'react';
import { useFormatMessage } from 'apps/intl';
// import { PageLoader } from 'apps/layout';
import { useOverlay, Modal } from 'apps/overlay';
import { useStyles } from './TemplatesModal.styles';
import { Box } from '@material-ui/core';
import classnames from 'classnames';
import { FiArrowRight, FiArrowDownLeft, FiArrowLeft } from 'react-icons/fi';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import { appPalette } from 'apps/theme';

SwiperCore.use([Pagination, Navigation]);

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
    <Box p={1.5}>
      <span className={classes.templateCardTitle}>{title}</span>
      <Box mt={1} className={classes.descriptionContainer}>
        <span className={classes.description}>{description}</span>
      </Box>
    </Box>
  );
};

const TemplatesGallery = () => {
  const classes = useStyles();

  return (
    <Swiper
      navigation={{
        nextEl: '.navigation-right',
        prevEl: '.navigation-left',
        disabledClass: classes.navigationControlHidden,
        hiddenClass: classes.navigationControlHidden,
      }}
      slidesPerView={6}
      centeredSlides={false}
      spaceBetween={30}
      className={classes.swiper}
      grabCursor={false}
      allowTouchMove={false}
    >
      {mockTemplates.map((template) => (
        <SwiperSlide className={classes.swiperSlide}>
          <TemplateCard title={template.title} description={template.description} />
        </SwiperSlide>
      ))}
      <Box className={classes.controlsContainer}>
        <Box className={classnames(classes.navigationControl, 'navigation-left')}>
          <FiArrowLeft color={appPalette.white} size={32} />
        </Box>
        <Box className={classnames(classes.navigationControl, 'navigation-right')}>
          <FiArrowRight color={appPalette.white} size={32} />
        </Box>
      </Box>
    </Swiper>
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
