import { useDispatch, useSelector } from 'react-redux';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { useEffect } from 'react';
import { selectMetadataListModel } from 'apps/Templates/store/Templates.selectors';
import { getMetadata } from 'apps/Templates/store/Templates.actions';

export function useLoadMetadataList() {
  const dispatch = useDispatch();
  const metadataModel = useSelector(selectMetadataListModel);

  useEffect(() => {
    const loadData = async () => {
      if (LoadableAdapter.isPristine(metadataModel)) {
        try {
          await dispatch(getMetadata());
        } catch (error) {
          console.error(error);
        }
      }
    };
    loadData();
  }, [dispatch, metadataModel]);

  return metadataModel;
}
