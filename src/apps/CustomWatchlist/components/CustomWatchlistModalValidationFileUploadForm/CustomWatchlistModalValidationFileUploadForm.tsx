import React, { useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormContext } from 'react-hook-form';
import { useFormatMessage } from 'apps/intl';
import { ErrorStatuses } from 'models/Error.model';
import { selectMerchantId } from 'state/merchant/merchant.selectors';
import { WatchlistFileUpload, WatchlistApiCall, WatchlistFileUploadErrors } from 'apps/ui';
import { IWatchlist, IWatchlistUpload } from 'models/Watchlist.model';
import { selectCurrentCustomWatchlistIsFileAvailable, selectCurrentCustomWatchlistFileInfo, selectCurrentCustomWatchlistFileError } from '../../state/CustomWatchlist.selectors';
import { CustomWatchlistModalValidationInputs } from '../../models/CustomWatchlist.model';
import * as api from '../../client/CustomWatchlist.client';
import { updateCurrentWatchlist } from '../../state/CustomWatchlist.actions';

export function CustomWatchlistModalValidationFileUploadForm({ watchlist, onFileUploaded }: {
  watchlist?: IWatchlist;
  onFileUploaded?: (data: IWatchlistUpload) => void;
}) {
  const formatMessage = useFormatMessage();
  const dispatch = useDispatch();
  const merchantId = useSelector(selectMerchantId);
  const isFileAvailable = useSelector(selectCurrentCustomWatchlistIsFileAvailable);
  const currentCustomWatchlistFileInfo = useSelector(selectCurrentCustomWatchlistFileInfo);
  const fileErrorType = useSelector<any, string>(selectCurrentCustomWatchlistFileError);
  const { setValue, setError, clearErrors, formState: { errors } } = useFormContext();

  const isEdit = !!watchlist;

  useEffect(() => {
    if (currentCustomWatchlistFileInfo?.fileKey && currentCustomWatchlistFileInfo?.fileName) {
      setValue(CustomWatchlistModalValidationInputs.FileKey, currentCustomWatchlistFileInfo.fileKey);
      setValue(CustomWatchlistModalValidationInputs.FileName, currentCustomWatchlistFileInfo.fileName);
    }
  }, [currentCustomWatchlistFileInfo, setValue]);

  useEffect(() => {
    if (fileErrorType) {
      setError(CustomWatchlistModalValidationInputs.FileKey, {
        message: formatMessage(`Watchlist.settings.${fileErrorType}`),
      });
    }
  }, [fileErrorType, setError, formatMessage]);

  const onFileSelect = useCallback((valueFileName: string) => setValue(CustomWatchlistModalValidationInputs.FileName, valueFileName), [setValue]);
  const apiCall = useMemo<WatchlistApiCall<IWatchlistUpload>>(() => ({
    callTo: api.uploadMerchantWatchlist,
    onSuccess: (data) => {
      setValue(CustomWatchlistModalValidationInputs.FileKey, data.key);
      clearErrors(CustomWatchlistModalValidationInputs.FileKey);
      onFileUploaded(data);

      if (!isFileAvailable && isEdit) {
        dispatch(updateCurrentWatchlist({ isFileAvailable: true }));
      }
    },
    onError: (error: any) => {
      if (error?.response?.status === ErrorStatuses.PayloadTooLarge) {
        setError(CustomWatchlistModalValidationInputs.FileKey, {
          message: formatMessage('Watchlist.settings.watchlist.fileSizeExceed'),
        });

        return;
      }
      setError(CustomWatchlistModalValidationInputs.FileKey, {
        message: formatMessage('Watchlist.settings.watchlist.fileErrorUpload'),
      });
    },
  }), [isFileAvailable, isEdit, setValue, clearErrors, setError, onFileUploaded, formatMessage, dispatch]);

  const watchlistFileUploadErrors = useMemo<WatchlistFileUploadErrors>(() => ({
    fileKey: errors[CustomWatchlistModalValidationInputs.FileKey]?.message,
    csvSeparator: errors[CustomWatchlistModalValidationInputs.CsvSeparator]?.message,
  }), [errors]);

  return (
    <WatchlistFileUpload
      initialFileName={watchlist?.process?.inputSourceFileName}
      csvSeparatorFieldName={CustomWatchlistModalValidationInputs.CsvSeparator}
      api={apiCall}
      merchantId={merchantId}
      errors={watchlistFileUploadErrors}
      isFileAvailable={isFileAvailable}
      onFileSelect={onFileSelect}
    />
  );
}
