import React, { useState } from 'react';
import { useFormatMessage } from 'apps/intl';
import { PageLoader } from 'apps/layout';
import { useOverlay, Modal } from 'apps/overlay';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { TemplateFilters } from 'apps/filter';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import { TemplatesGallery } from '../TemplatesGalery/TemplatesGalery';
import { TemplatesChosenFilters } from '../TemplatesChosenFilters/TemplatesChosenFilters';
import { useMetadataLoad, CardsData } from 'apps/SolutionCatalog';
import { MOCK_TEMPLATES } from '../../model/SolutionCatalog.model';
// import { loadTemplates } from '../../store/SolutionCatalog.action';
// import { selectAllTemplatesList } from '../../store/SolutionCatalog.selectors';
import { ITemplateMetadata, MetadataType } from 'apps/Templates';
import { useStyles } from './TemplatesModal.styles';

SwiperCore.use([Pagination, Navigation]);

export function TemplatesModal() {
  const filtersData = useMetadataLoad();
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  const [, closeOverlay] = useOverlay();
  const initialFiltersData:Record<MetadataType, []> = { industry: [], country: [] };
  const [currentFilters, setCurrentFilters] = useState<Record<MetadataType, ITemplateMetadata[]>>(initialFiltersData);
  const filtersByDefault = !Object.values(currentFilters).some((el) => !!el.length);

  // TODO:  this function just for example how filtering looks like , until we don't have response from backend
  const filteredArray = (dataArray) => {
    // @ts-ignore
    if (!currentFilters.industry.length) return dataArray;
    // @ts-ignore
    const chosenIndustry = currentFilters.industry.map((item) => item.name.toLowerCase());
    const filterResults = Object.entries(dataArray).filter(([industry]) => chosenIndustry.includes(industry.toLowerCase()));
    return Object.fromEntries(filterResults);
  };

  const filteredResponse: Record<string, CardsData[]> = filteredArray(MOCK_TEMPLATES);

  const getFiltersOptions = () => {
    const titles = Array.from(new Set(filtersData.value.map((item) => item.type)));
    return titles.map((title) => {
      const uniqueOptions = filtersData.value.filter((item) => item.type === title);
      return { title, data: [...uniqueOptions] };
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
              {formatMessage('TemplatesModal.title')}
            </span>
            <span className={classes.modalSubtitle}>
              {formatMessage('TemplatesModal.text')}
              {' '}
              <a>{formatMessage('TemplatesModal.link')}</a>
            </span>
          </Box>
          { !filtersData.isLoaded ? (
            <PageLoader />
          ) : (
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
          )}
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
