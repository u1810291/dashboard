import { useDispatch, useSelector } from 'react-redux';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { useEffect } from 'react';
import { selectTemplatesListModel } from '../store/Templates.selectors';
import { getTemplates } from '../store/Templates.actions';

export function useLoadTemplatesList() {
  const dispatch = useDispatch();
  const templatesModel = useSelector(selectTemplatesListModel);

  useEffect(() => {
    const loadData = async () => {
      if (LoadableAdapter.isPristine(templatesModel)) {
        try {
          await dispatch(getTemplates());
        } catch (error) {
          console.error(error);
        }
      }
    };
    loadData();
  }, [dispatch, templatesModel]);

  return templatesModel;
}
