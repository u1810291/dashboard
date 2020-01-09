import { Placeholder } from 'components/Placeholder/Placeholder';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import React from 'react';

export function Loadable({ model, render, children, width }) {
  if (LoadableAdapter.isPristine(model)) {
    return (
      <Placeholder width={width} />
    );
  }

  return render ? render(model.value) : children;
}
