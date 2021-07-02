import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productInit } from '../store/Product.actions';
import { selectProductIsInited } from '../store/Product.selectors';

export function useProduct() {
  const dispatch = useDispatch();
  const isProductInited = useSelector(selectProductIsInited);

  useEffect(() => {
    if (!isProductInited) {
      dispatch(productInit());
    }
  }, [isProductInited, dispatch]);
}
