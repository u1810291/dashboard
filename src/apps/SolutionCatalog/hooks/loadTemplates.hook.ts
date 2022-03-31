import { useDispatch, useSelector } from 'react-redux';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { useEffect } from 'react';
import { loadTemplates, selectAllTemplatesList } from 'apps/SolutionCatalog';

export function useTemplatesLoad() {
  const dispatch = useDispatch();
  const templatesList = useSelector(selectAllTemplatesList);

  useEffect(() => {
    const loadData = async () => {
      if (LoadableAdapter.isPristine(templatesList)) {
        try {
          await dispatch(loadTemplates([]));
        } catch (error) {
          console.error(error);
        }
      }
    };
    loadData();
  }, [dispatch, templatesList]);

  return templatesList;
}
