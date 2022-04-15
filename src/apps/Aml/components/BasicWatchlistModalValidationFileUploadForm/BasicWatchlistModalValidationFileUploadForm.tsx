import React, { useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormContext } from 'react-hook-form';
import { useFormatMessage } from 'apps/intl';
import { ErrorStatuses } from 'models/Error.model';
import { selectMerchantId } from 'state/merchant/merchant.selectors';
import { WatchlistFileUpload, WatchlistApiCall, WatchlistFileUploadErrors } from 'apps/ui';
import { IWatchlist, IWatchlistUpload } from 'models/Watchlist.model';
import { selectCurrentBasicWatchlistIsFileAvailable, selectCurrentBasicWatchlistFileInfo, selectCurrentBasicWatchlistFileError } from '../../state/Aml.selectors';
import { BasicWatchlistModalValidationInputTypes } from '../../models/Aml.model';
import * as api from '../../client/Aml.client';
import { updateCurrentWatchlist } from '../../state/Aml.actions';

export function BasicWatchlistModalValidationFileUploadForm({ watchlist, onFileUploaded }: {
  watchlist?: IWatchlist;
  onFileUploaded?: (data: IWatchlistUpload) => void;
}) {
  const formatMessage = useFormatMessage();
  const dispatch = useDispatch();
  const merchantId = useSelector<any, string>(selectMerchantId);
  const isFileAvailable = useSelector<any, boolean>(selectCurrentBasicWatchlistIsFileAvailable);
  const currentBasicWatchlistFileInfo = useSelector<any, Partial<{ fileKey: string; fileName: string }>>(selectCurrentBasicWatchlistFileInfo);
  const fileErrorType = useSelector<any, string>(selectCurrentBasicWatchlistFileError);
  const { setValue, setError, clearErrors, formState: { errors } } = useFormContext();

  const isEdit = !!watchlist;

  useEffect(() => {
    if (currentBasicWatchlistFileInfo?.fileKey && currentBasicWatchlistFileInfo?.fileName) {
      setValue(BasicWatchlistModalValidationInputTypes.FileKey, currentBasicWatchlistFileInfo.fileKey);
      setValue(BasicWatchlistModalValidationInputTypes.FileName, currentBasicWatchlistFileInfo.fileName);
    }
  }, [currentBasicWatchlistFileInfo, setValue]);

  useEffect(() => {
    if (fileErrorType) {
      setError(BasicWatchlistModalValidationInputTypes.FileKey, {
        message: formatMessage(`Watchlist.settings.${fileErrorType}`),
      });
    }
  }, [fileErrorType, setError, formatMessage]);

  const onFileSelect = useCallback((valueFileName: string) => setValue(BasicWatchlistModalValidationInputTypes.FileName, valueFileName), [setValue]);
  const apiCall = useMemo<WatchlistApiCall<IWatchlistUpload>>(() => ({
    callTo: api.uploadMerchantWatchlist,
    onSuccess: (data) => {
      setValue(BasicWatchlistModalValidationInputTypes.FileKey, data.key);
      clearErrors(BasicWatchlistModalValidationInputTypes.FileKey);
      onFileUploaded(data);

      if (!isFileAvailable && isEdit) {
        dispatch(updateCurrentWatchlist({ isFileAvailable: true }));
      }
    },
    onError: (error: any) => {
      if (error?.response?.status === ErrorStatuses.PayloadTooLarge) {
        setError(BasicWatchlistModalValidationInputTypes.FileKey, {
          message: formatMessage('Watchlist.settings.watchlist.fileSizeExceed'),
        });

        return;
      }
      setError(BasicWatchlistModalValidationInputTypes.FileKey, {
        message: formatMessage('Watchlist.settings.watchlist.fileErrorUpload'),
      });
    },
  }), [isFileAvailable, isEdit, setValue, clearErrors, setError, onFileUploaded, formatMessage, dispatch]);

  const watchlistFileUploadErrors = useMemo<WatchlistFileUploadErrors>(() => ({
    fileKey: errors[BasicWatchlistModalValidationInputTypes.FileKey]?.message,
    csvSeparator: errors[BasicWatchlistModalValidationInputTypes.CsvSeparator]?.message,
  }), [errors]);

  return (
    <WatchlistFileUpload
      initialFileName={watchlist?.process?.inputSourceFileName}
      csvSeparatorFieldName={BasicWatchlistModalValidationInputTypes.CsvSeparator}
      api={apiCall}
      merchantId={merchantId}
      errors={watchlistFileUploadErrors}
      isFileAvailable={isFileAvailable}
      onFileSelect={onFileSelect}
    />
  );
}
