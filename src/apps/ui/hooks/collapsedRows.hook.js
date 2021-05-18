import { useCallback, useState } from 'react';

export function useCollapsedRows() {
  const [collapsedRows, setCollapsedRows] = useState([]);

  const handleOnExpand = useCallback((id) => () => {
    const newExpandedRows = [...collapsedRows];
    if (collapsedRows.includes(id)) {
      setCollapsedRows(newExpandedRows.filter((item) => id !== item));
      return;
    }
    newExpandedRows.push(id);
    setCollapsedRows(newExpandedRows);
  }, [collapsedRows]);

  const checkIsCollapsed = useCallback((id) => collapsedRows.includes(id), [collapsedRows]);

  return [handleOnExpand, checkIsCollapsed];
}
