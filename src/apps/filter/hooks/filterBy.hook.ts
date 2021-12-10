import { isArrayIncludesArrayableValue } from 'lib/array';
import { FilterI } from 'models/Filter.model';
import * as React from 'react';
import { useCallback } from 'react';

export function useFilterCheckbox(filterFieldName: string, items: string[] = [], onFilterChange: (filter: FilterI) => void): [({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => void, (id: string[] | string) => boolean] {
  const handleSelect = useCallback(({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    const listValue = value.split(','); // event.target.value is always a string, even if you try to put there an array
    if (listValue.every((item) => items?.includes(item))) {
      const filtered = items.filter((item) => listValue.every((valueItem) => valueItem !== item));
      onFilterChange({ [filterFieldName]: filtered });
      return;
    }

    onFilterChange({ [filterFieldName]: value === '' ? [] : [...items, ...listValue] });
  }, [filterFieldName, items, onFilterChange]);

  const checkIsSelected = useCallback((ids: string[] | string) => isArrayIncludesArrayableValue<string>(items, ids), [items]);

  return [handleSelect, checkIsSelected];
}
