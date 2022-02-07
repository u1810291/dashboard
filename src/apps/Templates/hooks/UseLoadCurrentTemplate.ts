import { useDispatch, useSelector } from 'react-redux';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { useEffect } from 'react';
import { Loadable } from 'models/Loadable.model';
import { selectCurrentTemplateModel } from 'apps/Templates/store/Templates.selectors';
import { getTemplate } from 'apps/Templates/store/Templates.actions';
import { ICreateTemplateResponse } from '../model/Templates.model';

export function useLoadCurrentTemplate(id: string) {
  const dispatch = useDispatch();
  const templateModel = useSelector<any, Loadable<ICreateTemplateResponse>>(selectCurrentTemplateModel);

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
