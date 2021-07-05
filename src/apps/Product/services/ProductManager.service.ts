import { Product, ProductTypes } from 'models/Product.model';

export class ProductManagerService {
  private products: Product[] = [];

  register(product: Product): void {
    if (this.getProduct(product.id)) {
      return;
    }
    this.products.push(product);
  }

  getProduct(id: ProductTypes): Product {
    return this.products.find((item) => item.id === id);
  }

  getProductsConfigurable(): Product[] {
    return this.products
      .sort((a, b) => a.order - b.order)
      .filter((product) => product.isConfigurable);
  }

  sortProductTypes(productTypes: ProductTypes[]): ProductTypes[] {
    return productTypes.sort((a, b) => this.getProduct(a).order - this.getProduct(b).order);
  }
}

export const productManagerService = new ProductManagerService();
