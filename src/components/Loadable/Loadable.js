import { Placeholder } from 'components/Placeholder/Placeholder';
import React from 'react';

export function Loadable({ model, render, children, width }) {
  if (!model.isLoaded && !model.isLoading && !model.isFailed) {
    return (
      <Placeholder width={width} />
    );
  }

  return render ? render(model.value) : children;
}
