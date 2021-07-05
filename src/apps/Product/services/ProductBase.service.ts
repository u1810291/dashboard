import { IFlow } from 'models/Flow.model';
import { IProductCard, Product, ProductCheck, ProductInputTypes, ProductIntegrationTypes, ProductSettings, ProductTypes } from 'models/Product.model';
import { IconType } from 'react-icons';
import { VerificationResponse } from 'models/Verification.model';

export abstract class ProductBaseService implements Partial<Product> {
  abstract id: ProductTypes;
  abstract order: number;
  abstract icon: IconType;

  isConfigurable = true;
  isIssuesIgnored = false;
  integrationTypes: ProductIntegrationTypes[] = [];
  inputs: ProductInputTypes[] = [];
  checks: ProductCheck[] = [];
  requiredProductType: ProductTypes = null;
  dependentProductTypes: ProductTypes[] = [];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getIssuesComponent(flow: IFlow): any {
    return null;
  }

  isSdkOnly(): boolean {
    return this.integrationTypes.every((integrationType) => integrationType !== ProductIntegrationTypes.Api);
  }

  haveIssues(flow: IFlow): boolean {
    const integrationType = flow.integrationType;
    return (integrationType === ProductIntegrationTypes.Api && this.isSdkOnly()) || (!this.isIssuesIgnored && this.getIssuesComponent(flow) !== null);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getRemovingAlertComponent(flow: IFlow): any {
    return null;
  }

  getTitle(): string {
    return `${this.id}.card.title`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  parser(flow?: IFlow): ProductSettings {
    return null;
  }

  getCard(): IProductCard {
    return {
      id: this.id,
      icon: this.icon,
      order: this.order,
      title: this.getTitle(),
      inputs: this.inputs,
      checks: this.checks,
      integrationTypes: this.integrationTypes,
      requiredProductType: this.requiredProductType,
      dependentProductTypes: this.dependentProductTypes,
    };
  }

  onAdd(): Partial<IFlow> {
    return null;
  }

  onRemove(): Partial<IFlow> {
    return null;
  }

  abstract isInFlow(flow: IFlow): boolean;

  isInVerification(verification: VerificationResponse): boolean {
    return this.isInFlow(verification?.flow);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hasFailedCheck(verification: VerificationResponse): boolean {
    return false;
  }
}
