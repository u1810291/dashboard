import { Product, ProductTypes } from 'models/Product.model';

export class ProductManagerService {
  private products: Product[] = [];

  register(product: Product) {
    if (this.getProduct(product.id)) {
      return;
    }
    this.products.push(product);
  }

  getProduct(id: ProductTypes) {
    return this.products.find((item) => item.id === id);
  }

  getProducts() {
    return this.products;
  }

  getProductsAllOrdered() {
    return this.products.sort((a, b) => a.order - b.order);
  }

  sortProductTypes(productTypes: ProductTypes[]) {
    return productTypes.sort((a, b) => this.getProduct(a).order - this.getProduct(b).order);
  }
}

export const productManagerService = new ProductManagerService();
