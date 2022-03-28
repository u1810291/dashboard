import React from 'react';
import { IProductCard, Product, ProductCheck, ProductInputTypes, ProductIntegrationTypes, ProductSettings, ProductTypes } from 'models/Product.model';
import { IconType } from 'react-icons';
import { IFlow } from 'models/Flow.model';
import { VerificationResponse } from 'models/VerificationOld.model';
import { DeepPartial } from 'lib/object';

export abstract class ProductBaseFlowBuilder implements Partial<Product> {
  abstract id: ProductTypes;
  abstract order: number;
  abstract icon: IconType | (() => React.ReactNode);

  isConfigurable = true;
  isIssuesIgnored = false;
  integrationTypes: ProductIntegrationTypes[] = [];
  inputs: ProductInputTypes[] = [];
  checks: ProductCheck[] = [];
  requiredProductType: ProductTypes = null;
  dependentProductTypes: ProductTypes[] = [];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getIssuesComponent(flow: any, productsInGraph?: ProductTypes[]): any {
    return null;
  }

  isSdkOnly(): boolean {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  haveIssues(flow: any): boolean {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getRemovingAlertComponent(flow: any, productsInGraph?: ProductTypes[]): any {
    return null;
  }

  getTitle(): string {
    return `${this.id}.card.title`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  parser(flow?: any): ProductSettings {
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

  onAdd(): Partial<any> {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onRemove(flow: IFlow): DeepPartial<IFlow> {
    return null;
  }

  abstract isInFlow(flow: IFlow): boolean;

  isInVerification(verification: VerificationResponse): boolean {
    return this.isInFlow(verification?.flow);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hasFailedCheck(verification: any): boolean {
    return false;
  }
}
