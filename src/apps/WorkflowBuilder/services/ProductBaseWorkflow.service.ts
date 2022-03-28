import { ProductVerificationPdfProps } from 'models/PdfAdapter.model';
import React, { FC } from 'react';
import { IconType } from 'react-icons';
import { IProductCard, Product, ProductCheck, ProductInputTypes, ProductIntegrationTypes, ProductSettings, ProductTypes } from 'models/Product.model';
import { IWorkflow } from 'models/Workflow.model';
import { IVerificationWorkflow } from 'models/Verification.model';

export abstract class ProductBaseWorkflow implements Partial<Product<IWorkflow, IVerificationWorkflow>> {
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
  abstract componentPdf: FC<ProductVerificationPdfProps<IVerificationWorkflow>>;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getIssuesComponent(flow: IWorkflow, productsInGraph?: ProductTypes[]): any {
    return null;
  }

  isSdkOnly(): boolean {
    return this.integrationTypes.every((integrationType) => integrationType !== ProductIntegrationTypes.Api);
  }

  haveIssues(flow: IWorkflow): boolean {
    const integrationType = flow.integrationType;
    return (integrationType === ProductIntegrationTypes.Api && this.isSdkOnly()) || (!this.isIssuesIgnored && this.getIssuesComponent(flow) !== null);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getRemovingAlertComponent(flow: IWorkflow, productsInGraph?: ProductTypes[]): any {
    return null;
  }

  getTitle(): string {
    return `${this.id}.card.title`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  parser(flow?: IWorkflow): ProductSettings {
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

  onAdd(): Partial<IWorkflow> {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onRemove(flow: IWorkflow): Partial<IWorkflow> {
    return null;
  }

  abstract isInFlow(flow: IWorkflow): boolean;

  abstract isInVerification(verification: IVerificationWorkflow): boolean;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hasFailedCheck(verification: IVerificationWorkflow): boolean {
    return false;
  }
}
