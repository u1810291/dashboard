import { Product, ProductSettings, ProductTypes } from 'models/Product.model';
import { VerificationResponse } from 'models/VerificationOld.model';
import { IFlow } from 'models/Flow.model';
import { ProductBaseFlowBuilder } from 'apps/flowBuilder';
import { DeepPartial } from 'lib/object';
import { MetadataVerificationProduct } from '../components/MetadataVerificationProduct/MetadataVerificationProduct';

export class Metadata extends ProductBaseFlowBuilder implements Product {
  id = ProductTypes.Metadata;
  order = 20000;
  icon = null;

  component = null;
  componentVerification = MetadataVerificationProduct;
  isConfigurable = false;

  getVerification(verification: VerificationResponse): any {
    return verification?.metadata;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isInFlow(flow: IFlow): boolean {
    return false;
  }

  isInVerification(verification: VerificationResponse): boolean {
    return !!verification?.metadata;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  parser(flow: IFlow, productsInGraph?: ProductTypes[]): ProductSettings {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hasFailedCheck(verification: VerificationResponse): boolean {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  serialize(settings: ProductSettings<any>): DeepPartial<IFlow> {
    return undefined;
  }
}
