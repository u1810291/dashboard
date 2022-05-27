import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFormatMessage } from 'apps/intl';
import { PageLoader } from 'apps/layout';
import { useOverlay, Modal } from 'apps/overlay';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { TemplateFilters } from 'apps/filter';
import { loadTemplates, useTemplatesLoad } from 'apps/SolutionCatalog';
import { Routes } from 'models/Router.model';
import { ITemplateMetadata, MetadataType, useLoadMetadataList } from 'apps/Templates';
import { TemplatesGallery } from '../TemplatesGalery/TemplatesGalery';
import { TemplatesChosenFilters } from '../TemplatesChosenFilters/TemplatesChosenFilters';
import { getFiltersOptions } from '../../model/SolutionCatalog.model';
import { useStyles } from './TemplatesModal.styles';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

SwiperCore.use([Pagination, Navigation]);

export function TemplatesModal({ handleCardClick }: { handleCardClick: (id: string) => void }) {
  const dispatch = useDispatch();
  const filtersData = useLoadMetadataList();
  const templatesList = useTemplatesLoad();
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  const [, closeOverlay] = useOverlay();
  const initialFiltersData: Record<MetadataType, []> = { industry: [], country: [] };
  const [currentFilters, setCurrentFilters] = useState<Record<MetadataType, ITemplateMetadata[]>>(initialFiltersData);
  const filtersByDefault = !Object.values(currentFilters).some((el) => !!el.length);
  const filtersOptions = getFiltersOptions(filtersData.value);

  useEffect(() => {
    const filtersArray = Object.values(currentFilters).reduce((result, current) => result.concat(current), []);
    dispatch(loadTemplates(filtersArray));
  }, [currentFilters, dispatch]);

  return (
    <Modal
      onClose={closeOverlay}
      className={classes.modal}
    >
      <Box ml={2} mt={2} mb={2}>
        <Box className={classes.modalHeader}>
          <Box className={classes.modalHeaderLeft}>
            <span className={classes.modalTitle}>
              {formatMessage('TemplatesModal.title')}
            </span>
            <span className={classes.modalSubtitle}>
              {formatMessage('TemplatesModal.text')}
              {' '}
              <Link
                to={Routes.productBoard.root}
                onClick={closeOverlay}
              >
                {formatMessage('TemplatesModal.link')}
              </Link>
            </span>
          </Box>
          <Box className={classes.modalHeaderRight}>
            {filtersOptions.map((filter, idx) => (
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
        { templatesList.isLoading ? (
          <PageLoader />
        ) : (
          <Box>
            { Object.entries(templatesList.value).map(([title, data], idx) => (
              <Box key={idx}>
                <Typography className={classes.swiperTitle}>{title}</Typography>
                <TemplatesGallery handleCardClick={handleCardClick} templates={data} />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Modal>
  );
}
