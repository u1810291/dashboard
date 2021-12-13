import { merchantUpdateFlow } from 'state/merchant/merchant.actions';
import { productManagerService } from 'apps/Product';
import { ESignatureDocumentModel, getESignatureDocument } from 'models/ESignature.model';
import { ProductTypes } from 'models/Product.model';
import { selectESignatureDocuments } from './eSignature.selectors';
import { uploadESignatureDocument } from '../api/ESignature.client';
import { ESignatureService } from '../services/ESignature.service';

export const eSignatureDocumentUpload = (form: FormData) => async (dispatch, getState) => {
  const result = await uploadESignatureDocument(form);
  const data = result.data as ESignatureDocumentModel;
  const state = getState();
  const documents = selectESignatureDocuments(state);
  const order = documents ? documents.order : [];
  const list = documents ? documents.list.map((document: ESignatureDocumentModel | any) => ({
    id: document.id,
    originalDocument: {
      url: document.originalDocument.url,
      fileName: document.originalDocument.fileName,
      folder: document.originalDocument.folder,
      originalFileName: document.originalDocument.originalFileName,
    },
  })) : [];
  const templates = {
    order: [...order, data.id],
    list: [...list, getESignatureDocument(data)],
  };
  await dispatch(merchantUpdateFlow({
    electronicSignature: {
      templates,
    },
  }));
  return templates;
};

export const eSignatureInit = () => (): ProductTypes => {
  const eSignature = new ESignatureService();
  productManagerService.register(eSignature);
  return eSignature.id;
};
