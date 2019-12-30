import { Placeholder } from 'components/Placeholder/Placeholder';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import React from 'react';

export function LoadableValue({ model, width, placeholder }) {
  if (LoadableAdapter.isPristine(model)) {
    return (
      <Placeholder width={width} />
    );
  }

  return model.value || placeholder;
}
