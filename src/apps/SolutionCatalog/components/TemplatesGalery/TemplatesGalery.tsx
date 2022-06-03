import React from 'react';
import Box from '@material-ui/core/Box';
import classNames from 'classnames';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ICardsData } from 'apps/SolutionCatalog';
import { useTheme } from '@material-ui/core';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { TemplateCard } from '../TemplateCard/TemplateCard';
import { useStyles } from './TemplatesGalery.styles';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

SwiperCore.use([Pagination, Navigation]);

export function TemplatesGallery({ templates, handleCardClick }: {
  templates: ICardsData[];
  handleCardClick: (id: string) => void;
}) {
  const classes = useStyles();
  const theme = useTheme();
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
          <TemplateCard title={template.name} description={template.description} id={template._id} handleCardClick={handleCardClick} meritsList={template.meritsList} />
        </SwiperSlide>
      ))}
      <Box className={classes.controlsContainer}>
        <Box className={classNames(classes.navigationControl, 'navigation-left')}>
          <FiArrowLeft color={theme.palette.background.default} size={32} />
        </Box>
        <Box className={classNames(classes.navigationControl, 'navigation-right')}>
          <FiArrowRight color={theme.palette.background.default} size={32} />
        </Box>
      </Box>
    </Swiper>
  );
}
