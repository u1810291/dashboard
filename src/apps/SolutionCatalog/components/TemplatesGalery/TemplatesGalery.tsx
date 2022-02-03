/* eslint-disable import/no-unresolved */
import React from 'react';
import { appPalette } from 'apps/theme';
import Box from '@material-ui/core/Box';
import classnames from 'classnames';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import { TemplateCard } from '../TemplateCard/TemplateCard';
import { useStyles } from './TemplatesGalery.styles';
import { TemplateGaleryProps } from 'models/TemplatesModal.model';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function TemplatesGallery({ mockTemplates }: TemplateGaleryProps) {
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
      {mockTemplates.map((template, idx) => (
        <SwiperSlide className={classes.swiperSlide} key={idx}>
          <TemplateCard title={template.name} description={template.description} />
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
