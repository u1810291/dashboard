import { useCallback } from 'react';

export function useFilterCheckbox(filterFieldName, items = [], onFilterChange) {
  const handleSelect = useCallback(({ target: { value } }) => {
    const newItems = [...items];

    if (items.includes(value)) {
      const filtered = newItems.filter((item) => item !== value);
      onFilterChange({ [filterFieldName]: filtered });
      return;
    }

    newItems.push(value);
    onFilterChange({ [filterFieldName]: value === '' ? [] : newItems });
  }, [filterFieldName, items, onFilterChange]);

  const checkIsSelected = useCallback((id) => items?.includes(id), [items]);

  return [handleSelect, checkIsSelected];
}
