import { useDispatch, useSelector } from 'react-redux';
import { selectMerchantModel } from 'state/merchant/merchant.selectors';
import { useEffect } from 'react';
import { Routes } from 'models/Router.model';
import { useHistory } from 'react-router-dom';
import { merchantLoadWithCheck } from 'apps/auth/state/auth.actions';

export function useLoadMerchant() {
  const history = useHistory();
  const dispatch = useDispatch();
  const merchantModel = useSelector(selectMerchantModel);

  useEffect(() => {
    const loadData = async () => {
      try {
        await dispatch(merchantLoadWithCheck());
      } catch (error) {
        // @ts-ignore
        if (error.response && error.response.status === 401) {
          history.push(Routes.root);
        } else {
          throw error;
        }
      }
    };

    loadData();
  }, [dispatch, history]);

  return merchantModel;
}
