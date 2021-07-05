import React from 'react';
import { NewVerificationMetadata } from '../NewVerificationMetadata/NewVerificationMetadata';

export function MetadataVerificationProduct({ data }: {
  data: any;
}) {
  return (<NewVerificationMetadata metadata={data} />);
}
