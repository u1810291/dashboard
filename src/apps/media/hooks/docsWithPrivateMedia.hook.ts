import { useCallback, useEffect, useMemo, useState } from 'react';
import { fillAllPhotosInDocument, VerificationDocument } from 'models/Document.model';
import { notification } from 'apps/ui';
import { ErrorMessages } from 'models/Error.model';
import cloneDeep from 'lodash/cloneDeep';
import { useHistory } from 'react-router-dom';
import { getMedia } from '../api/media.client';
import { MediaBlobUrl, MediaStatusTypes } from '../models/Media.model';

export function useDocsWithPrivateMedia(documents: VerificationDocument[], pageRoute: string): VerificationDocument[] {
  const [photosByDoc, setPhotosByDoc] = useState<(MediaBlobUrl | MediaStatusTypes)[][]>(null);
  const history = useHistory();

  const documentsWithMedia = useMemo(() => {
    if (!photosByDoc) {
      return null;
    }
    return documents?.map((doc, index) => ({ ...doc, photos: photosByDoc[index] ?? [] }));
  }, [documents, photosByDoc]);

  const updateImage = useCallback((photo: Blob | MediaStatusTypes, documentIndex: number, photoIndex: number) => {
    const objectUrl = typeof photo === 'string' ? photo : URL.createObjectURL(photo);
    setPhotosByDoc(((prevState) => {
      const newState = cloneDeep(prevState);
      if (newState?.[documentIndex]?.[photoIndex]) {
        newState[documentIndex][photoIndex] = objectUrl;
      }
      return newState;
    }));
  }, []);

  useEffect(() => () => {
    if (photosByDoc?.length > 0 && pageRoute && !history.location.pathname.startsWith(pageRoute)) {
      photosByDoc.flat()
        .forEach((item) => item && !Object.values(MediaStatusTypes).includes(item as MediaStatusTypes) && URL.revokeObjectURL(item));
    }
  }, [history.location.pathname, pageRoute, photosByDoc]);

  useEffect(() => {
    if (Array.isArray(documents) && documents?.length > 0) {
      setPhotosByDoc(fillAllPhotosInDocument(documents, MediaStatusTypes.MediaIsLoading));
    }
  }, [documents]);

  useEffect(() => {
    if (!Array.isArray(documents) || documents?.length < 1) {
      return;
    }

    documents.forEach((doc, documentIndex) => doc.photos.map(
      (photo, photoIndex) => getMedia(photo)
        .then((response) => response.blob())
        .then((blob) => updateImage(blob, documentIndex, photoIndex))
        .catch((error) => {
          console.error(error);
          notification.error(ErrorMessages.ERROR_COMMON);
          updateImage(MediaStatusTypes.MediaIsFailed, documentIndex, photoIndex);
        }),
    ));
  }, [documents, updateImage]);

  return documentsWithMedia;
}
