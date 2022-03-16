import { Document, Page, pdf, Text, View } from '@react-pdf/renderer';
import { AppIntlProvider, useFormatMessage } from 'apps/intl';
import { StoreProvider } from 'apps/store';
import { ProductTypes } from 'models/Product.model';
import { IVerificationWorkflow } from 'models/Verification.model';
import React from 'react';
import { ProductsPdf } from '../ProductsPdf/ProductsPdf';
import { SummaryPdf } from '../SummaryPdf/SummaryPdf';
import { commonStyles } from '../../models/PdfStyles.model';

interface AdditionalData {
  legalName: string;
  legalRegNumber: number;
  legalAddress: string;
}

export function VerificationPdf({ productList, verification, additionalData }: {
  verification: IVerificationWorkflow;
  additionalData: AdditionalData;
  productList: ProductTypes[];
}) {
  const formatMessage = useFormatMessage();
  if (!verification) {
    return null;
  }

  const { legalName, legalRegNumber, legalAddress } = additionalData;

  return (
    <Document title={`Verification ${verification.id}`} author="MetaMap www.metamap.com">
      <Page size="A4" style={commonStyles.page}>
        {/* header */}
        <SummaryPdf verification={verification} />
        {/* Products */}
        <ProductsPdf productList={productList} verification={verification} />
        { /* footer */}
        <View style={commonStyles.footer} fixed>
          <Text>
            {formatMessage('Pdf.footer.merchantLegalInformation', {
              messageValues: {
                legalName: (<Text style={commonStyles.boldText}>{legalName}</Text>),
                legalRegNumber: <Text>{legalRegNumber}</Text>,
                verifiedBy: (<Text style={commonStyles.boldText}>{formatMessage('Pdf.footer.matilockInc')}</Text>),
              },
            })}
          </Text>
          <Text>
            {formatMessage('Pdf.footer.merchantLegalAddress', { messageValues: { legalAddress } })}
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export async function getVerificationPdfBlob(verification: IVerificationWorkflow, productList: ProductTypes[], additionalData: AdditionalData): Promise<Blob> {
  return pdf(
    <StoreProvider>
      <AppIntlProvider>
        <VerificationPdf verification={verification} productList={productList} additionalData={additionalData} />
      </AppIntlProvider>
    </StoreProvider>,
  ).toBlob();
}
