import mapValues from 'lodash/mapValues';
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';
import { getMedia } from 'apps/media/api/media.client';
import { notification } from 'apps/ui';
import { ErrorMessages } from 'models/Error.model';

export enum MediaStatusTypes {
  MediaIsEmpty = 'MEDIA_IS_EMPTY',
  MediaIsLoading = 'MEDIA_IS_LOADING',
  MediaIsFailed = 'MEDIA_IS_FAILED'
}

export type MediaBlobUrl = string;
export const MEDIA_SERVER_URL_START_BEGINNING = 'https://media.';

async function downloadMedia(media: string, pushToBlobUrlCollection?: (blob: MediaBlobUrl) => void): Promise<string> {
  try {
    const response = await getMedia(media);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    if (pushToBlobUrlCollection) {
      pushToBlobUrlCollection(blobUrl);
    }
    return blobUrl;
  } catch (error) {
    console.error(error);
    notification.error(ErrorMessages.ERROR_COMMON);
    return MediaStatusTypes.MediaIsFailed;
  }
}

export function startDownloadMedia(objectWithMedia: any | any[], pushToBlobUrlCollection?: (blob: MediaBlobUrl) => void): any | any[] {
  const splitActionsByType = (item) => {
    if (!item) {
      return item;
    }

    if (isString(item) && item.includes(process.env.REACT_APP_MEDIA_URL || MEDIA_SERVER_URL_START_BEGINNING)) {
      return downloadMedia(item, pushToBlobUrlCollection);
    }

    return startDownloadMedia(item);
  };

  if (Array.isArray(objectWithMedia)) {
    return objectWithMedia.map(splitActionsByType);
  }

  if (isObject(objectWithMedia)) {
    return mapValues(objectWithMedia, splitActionsByType);
  }

  return objectWithMedia;
}
