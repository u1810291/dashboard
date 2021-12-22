import { ProductBaseService } from 'apps/Product/services/ProductBase.service';
import { IFlow } from 'models/Flow.model';
import { Product, ProductInputTypes, ProductSettings, ProductTypes } from 'models/Product.model';
import { VerificationResponse } from 'models/Verification.model';
import { FiFile } from 'react-icons/fi';
import { CustomDocumentsSettings } from '../components/CustomDocumentSettings/CustomDocumentSettings';
import { CustomDocumentVerificationProxy } from '../components/CustomDocumentVerificationProxy/CustomDocumentVerificationProxy';
import { CustomDocumentCheckTypes, CustomDocumentSettingsTypes, CUSTOM_DOCUMENT_PREFIX } from '../models/CustomDocument.model';

type ProductSettingsCustomDocument = ProductSettings<CustomDocumentSettingsTypes>;

export class CustomDocument extends ProductBaseService implements Product<ProductSettingsCustomDocument> {
    id = ProductTypes.CustomDocuments;
    order = 900;
    integrationTypes = [];
    icon = FiFile;
    inputs = [ProductInputTypes.CustomDocuments];

    checks = [{
      id: CustomDocumentCheckTypes.DocumentReading,
      isActive: true,
    }, {
      id: CustomDocumentCheckTypes.TemplateMatching,
      isActive: true,
    }];

    component = CustomDocumentsSettings;
    componentVerification = CustomDocumentVerificationProxy;

    parser(flow: IFlow): ProductSettingsCustomDocument {
      const customDocumentSteps = flow.verificationSteps.filter((stepGroup) => !!stepGroup.find((docName) => docName.startsWith(CUSTOM_DOCUMENT_PREFIX)));
      const otherSteps = flow.verificationSteps.filter((stepsGroup) => !!stepsGroup.find((docName) => !docName.startsWith(CUSTOM_DOCUMENT_PREFIX)));
      return {
        neededSteps: {
          value: customDocumentSteps,
        },
        restSteps: {
          value: otherSteps,
        },
      };
    }

    serialize(settings: ProductSettingsCustomDocument): Partial<IFlow> {
      return {
        verificationSteps: [...settings.restSteps.value, ...settings.neededSteps.value],
      };
    }

    onRemove(flow: IFlow): Partial<IFlow> {
      return {
        verificationSteps: [...flow.verificationSteps.filter((stepGroup) => !!stepGroup.find((documentName) => !documentName.startsWith(CUSTOM_DOCUMENT_PREFIX)))],
      };
    }

    isInFlow(flow: IFlow): boolean {
      return !!flow?.verificationSteps?.find((step) => !!step.find((docType) => docType.startsWith(CUSTOM_DOCUMENT_PREFIX)));
    }

    getVerification(verification: VerificationResponse): any {
      return {
        ...verification,
        documents: verification.documents?.filter((el) => el.type.startsWith(CUSTOM_DOCUMENT_PREFIX)),
      };
    }
}
