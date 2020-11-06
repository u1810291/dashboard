import { get } from 'lodash';

export const PRODUCT_DEMO_CDN_URL = 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/demos';
export const MAX_NUMBER_OF_PRODUCTS = 30;

export function getNewFlowId(merchantFlowsModel, currentFlowId) {
  const currentIndex = merchantFlowsModel.value.findIndex((flow) => flow.id === currentFlowId);
  const newIndex = currentIndex ? currentIndex - 1 : currentIndex + 1;
  return get(merchantFlowsModel, `value[${newIndex}].id`, currentFlowId);
}
