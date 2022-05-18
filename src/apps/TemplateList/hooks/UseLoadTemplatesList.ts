import { useDispatch, useSelector } from 'react-redux';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { useEffect } from 'react';
import { getTemplatesList, selectTemplatesListModel } from 'apps/Templates';

export function useLoadTemplatesList() {
  const dispatch = useDispatch();
  const templatesListModel = useSelector(selectTemplatesListModel);

  useEffect(() => {
    const loadData = async () => {
      if (LoadableAdapter.isPristine(templatesListModel)) {
        try {
          await dispatch(getTemplatesList());
        } catch (error) {
          console.error(error);
        }
      }
    };
    loadData();
  }, [dispatch, templatesListModel]);

  return templatesListModel;
}
