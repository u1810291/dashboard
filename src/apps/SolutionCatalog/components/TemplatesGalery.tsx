/* eslint-disable import/no-unresolved */
import React from 'react';
import { appPalette } from 'apps/theme';
import { Box } from '@material-ui/core';
import classnames from 'classnames';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useStyles } from './TemplatesModal/TemplatesModal.styles';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import { TemplateCard } from './TemplateCard';

export function TemplatesGallery({ onSubmit, mockTemplates }) {
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
}
