import { checkIfArrayIncludesArrayableValue } from 'lib/array';
import { FilterI } from 'models/Filter.model';
import { useCallback } from 'react';

export function useFilterCheckbox(filterFieldName: string, items: string[] = [], onFilterChange: (filter: FilterI) => void): [({ target: { value } }: { target: { value: string[] | string } }) => void, (id: string[] | string) => boolean] {
  const handleSelect = useCallback(({ target: { value } }: { target: { value: string[] | string } }) => {
    const listValue = typeof value === 'string' ? [value] : value;
    if (listValue.every((item) => items?.includes(item))) {
      const filtered = items.filter((item) => listValue.every((valueItem) => valueItem !== item));
      onFilterChange({ [filterFieldName]: filtered });
      return;
    }

    onFilterChange({ [filterFieldName]: value === '' ? [] : [...items, ...listValue] });
  }, [filterFieldName, items, onFilterChange]);

  const checkIsSelected = useCallback((ids: string[] | string) => checkIfArrayIncludesArrayableValue<string>(items, ids), [items]);

  return [handleSelect, checkIsSelected];
}
