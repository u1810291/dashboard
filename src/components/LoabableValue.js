import { Placeholder } from 'components/Placeholder/Placeholder';
import React from 'react';

export function LoadableValue({ model, width, placeholder }) {
  if (!model.isLoaded && !model.isLoading && !model.isFailed) {
    return (
      <Placeholder width={width} />
    );
  }

  return model.value || placeholder;
}
