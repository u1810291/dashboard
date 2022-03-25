import { ProductBaseFlowBuilder } from 'apps/flowBuilder';
import { Product, ProductSettings, ProductTypes } from 'models/Product.model';
import { VerificationResponse } from 'models/VerificationOld.model';
import { IFlow } from 'models/Flow.model';
import { Nom151Check } from '../components/Nom151Check/Nom151Check';

export class CertifiedTimestamp extends ProductBaseFlowBuilder implements Product {
  id = ProductTypes.CertifiedTimestamp;
  order = 21000;
  icon = null;

  component = null;
  componentVerification = Nom151Check;
  isConfigurable = false;

  getVerification(verification: VerificationResponse): any {
    return verification?.digitalSignature;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isInFlow(flow: IFlow): boolean {
    return false;
  }

  isInVerification(verification: VerificationResponse): boolean {
    return !!verification?.digitalSignature;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  serialize(settings: ProductSettings<any>): Partial<IFlow> {
    return undefined;
  }
}
