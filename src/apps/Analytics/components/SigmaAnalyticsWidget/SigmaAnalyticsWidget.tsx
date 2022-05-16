import { useFormatMessage } from 'apps/intl';
import { PageError } from 'apps/layout';
import { Loader } from 'apps/ui';
import { http } from 'lib/client/http';
import { SupportedLocales } from 'models/Intl.model';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { selectLanguage } from 'state/merchant/merchant.selectors';

export function SigmaAnalyticsWidget({ asMerchantId }: {
  asMerchantId: string;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [url, setUrl] = useState<string | null>(null);
  const locale = useSelector<any, SupportedLocales>(selectLanguage);
  const localeRef = useRef<SupportedLocales>(null);
  const formatMessage = useFormatMessage();

  const handleError = useCallback(() => {
    setError(true);
    toast.error(formatMessage('Error.common'));
  }, [formatMessage]);

  useEffect(() => {
    const shouldFetch = url === null || localeRef.current !== locale;
    if (shouldFetch && !loading) {
      setLoading(true);
      http.get<string>('/api/v1/dashboard/analytics/widget', { params: { locale, asMerchantId } })
        .then((response) => {
          if (typeof response.data !== 'string') {
            handleError();
          }
          setUrl(response.data);
          setLoading(false);
          localeRef.current = locale;
        })
        .catch(handleError);
    }
  }, [handleError, loading, locale, url]);

  if (typeof url !== 'string' || loading) {
    return <Loader />;
  }

  if (error) {
    return <PageError />;
  }

  return (
    <div style={{ position: 'relative' }}>
      <iframe
        title="analytics-widget"
        sandbox="allow-scripts allow-same-origin"
        style={{
          display: 'block',
          height: '100vh',
          width: '100%',
          position: 'absolute',
        }}
        frameBorder="0"
        src={url}
      />
    </div>
  );
}
