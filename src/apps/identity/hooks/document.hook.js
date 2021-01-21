import { compact } from 'lodash';
import { getPhotosOrientation, PhotosOrientations } from 'models/Document.model';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectCountriesList } from 'state/countries/countries.selectors';

export function useDocumentTitle(document) {
  const intl = useIntl();
  const countries = useSelector(selectCountriesList);
  const found = countries.find(({ code }) => code === document.country);
  const countryName = found ? found.name : document.country;

  return intl.formatMessage({ id: 'DocumentStep.title' }, {
    document: intl.formatMessage({ id: `flow.documentTypeStep.${document.type}` }),
    country: compact([countryName, document.region]).join(', '),
  });
}

export function usePhotosOrientation(document) {
  const [photosOrientation, setPhotosOrientation] = useState(PhotosOrientations.Horizontal);

  useEffect(() => {
    const loadPhoto = async () => {
      if (document?.photos?.length) {
        try {
          const orientation = await getPhotosOrientation(document.photos[0]);
          setPhotosOrientation(orientation);
        } catch (e) {
          console.error('error loading photo', e);
        }
      }
    };
    loadPhoto();
  }, [document]);

  return photosOrientation;
}
