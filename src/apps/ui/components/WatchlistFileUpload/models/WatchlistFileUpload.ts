export enum WatchlistFileExt {
  Csv = 'csv',
  Xls = 'xls',
}

export interface WatchlistApiCall<T = any> {
  callTo: Function;
  onSuccess: (data: T) => void;
  onError: (error: any) => void;
}

export interface WatchlistFileUploadErrors {
  fileKey?: string;
  csvSeparator?: string;
}

export default {};
