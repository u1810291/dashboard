import { Product, ProductTypes } from 'models/Product.model';
import { IFlow } from 'models/Flow.model';
import { VerificationResponse } from 'models/VerificationOld.model';
import { IVerificationWorkflow } from 'models/Verification.model';

// WIP: All products that depend on IWorkflow will need to conform to its final IWorkflow interface.
// "any" for now to unblock intermediary steps towards it. @pablo.saucedo
type IWorkflow = any;
export class ProductManagerService<S = IFlow | IWorkflow, T = VerificationResponse | IVerificationWorkflow> {
  private products: Product<S, T>[] = [];

  register(product: Product<S, T>): void {
    if (this.getProduct(product.id)) {
      return;
    }
    this.products.push(product);
  }

  getProduct(id: ProductTypes): Product<S, T> {
    return this.products.find((item) => item.id === id);
  }

  getProductsConfigurable(): Product<S, T>[] {
    return this.products
      .sort((a, b) => a.order - b.order)
      .filter((product) => product.isConfigurable);
  }

  sortProductTypes(productTypes: ProductTypes[]): ProductTypes[] {
    return productTypes.sort((a, b) => this.getProduct(a).order - this.getProduct(b).order);
  }
}

export const productManagerService = new ProductManagerService();
