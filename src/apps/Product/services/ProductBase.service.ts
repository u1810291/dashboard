import { IFlow } from 'models/Flow.model';
import { IProductCard, Product, ProductCheck, ProductConfig, ProductInputTypes, ProductIntegrationTypes, ProductTypes } from 'models/Product.model';
import { IconType } from 'react-icons';
import { VerificationResponse } from 'models/Verification.model';

export abstract class ProductBaseService implements Partial<Product> {
  abstract id: ProductTypes;
  abstract order: number;
  abstract icon: IconType;

  isConfigurable = true;
  integrationTypes: ProductIntegrationTypes[] = [];
  inputs: ProductInputTypes[] = [];
  checks: ProductCheck[] = [];
  checksDefault: ProductCheck[] = [];
  requiredProductType: ProductTypes = null;
  dependentProductTypes: ProductTypes[] = [];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getIssuesComponent(flow, integrationType): any {
    return null;
  }

  isSdkOnly(): boolean {
    return this.integrationTypes.every((integrationType) => integrationType !== ProductIntegrationTypes.Api);
  }

  haveIssues(flow, integrationType): boolean {
    return (integrationType === ProductIntegrationTypes.Api && this.isSdkOnly()) || this.getIssuesComponent(flow, integrationType) !== null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getRemovingAlertComponent(flow): any {
    return null;
  }

  getTitle(): string {
    return `${this.id}.card.title`;
  }

  abstract getChecks(flow?: IFlow): ProductCheck[];

  parser(flow: IFlow): ProductConfig {
    this.checks = this.getChecks(flow);
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

  onInit() {
    this.checks = this.checksDefault;
  }

  onAdd(): Partial<IFlow> {
    return null;
  }

  onRemove(): Partial<IFlow> {
    this.checks = this.checksDefault;
    return null;
  }

  abstract isInFlow(flow: IFlow): boolean

  isInVerification(verification: VerificationResponse): boolean {
    return this.isInFlow(verification?.flow);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hasFailedCheck(verification: VerificationResponse): boolean {
    return false;
  }
}
