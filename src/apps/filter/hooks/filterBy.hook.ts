import { FilterI } from 'models/Filter.model';
import { useCallback } from 'react';

export function useFilterCheckbox(filterFieldName: string, items: string[] = [], onFilterChange: (filter: FilterI) => void): [({ target: { value } }) => void, (id: string) => boolean] {
  const handleSelect = useCallback(({ target: { value } }) => {
    const newItems: string[] = [...items];

    if (items.includes(value)) {
      const filtered = newItems.filter((item) => item !== value);
      onFilterChange({ [filterFieldName]: filtered });
      return;
    }

    newItems.push(value);
    onFilterChange({ [filterFieldName]: value === '' ? [] : newItems });
  }, [filterFieldName, items, onFilterChange]);

  const checkIsSelected = useCallback((id: string) => items?.includes(id), [items]);

  return [handleSelect, checkIsSelected];
}
