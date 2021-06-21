import { IProductCard, Product, ProductInputTypes, ProductIntegrationTypes, ProductTypes } from 'models/Product.model';
import { IconType } from 'react-icons';

export abstract class ProductBaseService implements Partial<Product> {
  abstract id: ProductTypes;
  abstract order: number;
  abstract integrationTypes: ProductIntegrationTypes[];
  abstract inputs: ProductInputTypes[];
  abstract checks: string[];
  abstract icon: IconType;

  getTitle(): string {
    return `${this.id}.card.title`;
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
    };
  }
}
