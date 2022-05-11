/* eslint-disable import/no-unresolved */
import React from 'react';
import { appPalette } from 'apps/theme';
import Box from '@material-ui/core/Box';
import classNames from 'classnames';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { TemplateGaleryProps } from 'apps/SolutionCatalog';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import { TemplateCard } from '../TemplateCard/TemplateCard';
import { useStyles } from './TemplatesGalery.styles';

export function TemplatesGallery({ templates, handleCardClick }: TemplateGaleryProps) {
  const classes = useStyles();

  return (
    <Swiper
      navigation={{
        nextEl: '.navigation-right',
        prevEl: '.navigation-left',
        disabledClass: classes.navigationControlHidden,
        hiddenClass: classes.navigationControlHidden,
      }}
      slidesPerView="auto"
      slidesPerGroup={2}
      centeredSlides={false}
      spaceBetween={30}
      className={classes.swiper}
      allowTouchMove={false}
      grabCursor={false}
    >
      {templates.map((template, idx) => (
        <SwiperSlide className={classes.swiperSlide} key={idx}>
          <TemplateCard title={template.name} description={template.description} id={template._id} handleCardClick={handleCardClick} />
        </SwiperSlide>
      ))}
      <Box className={classes.controlsContainer}>
        <Box className={classNames(classes.navigationControl, 'navigation-left')}>
          <FiArrowLeft color={appPalette.white} size={32} />
        </Box>
        <Box className={classNames(classes.navigationControl, 'navigation-right')}>
          <FiArrowRight color={appPalette.white} size={32} />
        </Box>
      </Box>
    </Swiper>
  );
}
