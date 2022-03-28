import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productFlowbuilderInit, productWorkflowBuilderInit } from '../store/Product.actions';
import { selectProductIsInited } from '../store/Product.selectors';

export function useProduct() {
  const dispatch = useDispatch();
  const isProductInited = useSelector(selectProductIsInited);

  useEffect(() => {
    if (!isProductInited) {
      dispatch(productFlowbuilderInit());
    }
  }, [isProductInited, dispatch]);
}

export function useMerit() {
  const dispatch = useDispatch();
  const isProductInited = useSelector(selectProductIsInited);

  useEffect(() => {
    if (!isProductInited) {
      dispatch(productWorkflowBuilderInit());
    }
  }, [isProductInited, dispatch]);
}
