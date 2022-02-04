import { useDispatch, useSelector } from 'react-redux';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { useEffect } from 'react';
import { selectCurrentTemplateModel } from 'apps/Templates/store/Templates.selectors';
import { getTemplate } from 'apps/Templates/store/Templates.actions';

export function useLoadCurrentTemplate(id: string) {
  const dispatch = useDispatch();
  const templateModel = useSelector(selectCurrentTemplateModel);

  useEffect(() => {
    const loadData = async () => {
      if (LoadableAdapter.isPristine(templateModel)) {
        try {
          await dispatch(getTemplate(id));
        } catch (error) {
          console.error(error);
        }
      }
    };
    loadData();
  }, [dispatch, templateModel, id]);

  return templateModel;
}
