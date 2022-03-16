import { Image, Text, View, StyleSheet } from '@react-pdf/renderer';
import { productManagerService } from 'apps/Product';
import { ProductBaseWorkflow } from 'apps/WorkflowBuilder';
import { ProductVerificationPdfProps } from 'models/PdfAdapter.model';
import { ProductTypes } from 'models/Product.model';
import { IVerificationWorkflow } from 'models/Verification.model';
import React from 'react';
import { commonStyles } from '../../models/PdfStyles.model';

export function ProductsPdf({ productList, verification }: {
  productList: ProductTypes[];
  verification: IVerificationWorkflow;
}) {
  return (
    <View>
      {productList.map((productType) => {
        const product: ProductBaseWorkflow = productManagerService.getProduct(productType) as any;

        if (!product || !product.componentPdf) {
          return null;
        }
        return React.createElement<ProductVerificationPdfProps<IVerificationWorkflow>>(product.componentPdf, {
          verification,
          pdfRendererAdapter: {
            View: View as any,
            Text: Text as any,
            Image: Image as any,
            commonStyles,
            StyleSheet,
          },
          key: productType,
        });
      })}
    </View>
  );
}
