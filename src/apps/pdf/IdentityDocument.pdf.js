import { Document, Image, Page, pdf, Text, View } from '@react-pdf/renderer';
import MatiLogo from 'assets/mati-logo-black.png';
import { getMediaURL } from 'lib/client/media';
import { compact } from 'lodash';
import CURP from 'assets/curp-logo.png';
import INE from 'assets/ine-logo.png';
import RFC from 'assets/rfc-logo.png';
import { getIdentityExtras } from 'models/Identity.model';
import React from 'react';
import { getLivenessStatusColor, getStatusColor } from './IdentityDocument.model';
import { styles } from './PDF.styles';
import { PDFDocumentFields } from './PDFDocumentFields';

export function IdentityDocumentPDF(intl, identity) {
  if (!identity) {
    return null;
  }

  const extras = getIdentityExtras(identity);

  return (
    <Document title={`Identity ${identity.id}`} author="Matilock, Inc. www.mati.io">
      <Page size="A4" style={styles.page}>
        {/* content */}
        <View style={styles.normal}>
          {/* header */}
          <View style={styles.row}>
            <View style={styles.fg1}>
              <Text style={styles.normal}>{intl.formatMessage({ id: 'identity.title' }, { id: extras.shortId })}</Text>
              <View style={{ color: getStatusColor(identity.status) }}>
                <Text style={styles.h2}>
                  {intl.formatMessage({ id: 'identity.status' })}
                  :
                  {intl.formatMessage({ id: `statuses.${identity.status}` })}
                </Text>
              </View>
              <Text style={[styles.h1, styles.mt1]}>{extras.fullName || intl.formatMessage({ id: 'identity.nameNotFound' })}</Text>
              <Text style={[styles.normal, styles.grey]}>{extras.dateCreated}</Text>
            </View>
            {extras.liveness && extras.liveness.selfieUrl && (
              <View style={styles.selfieBox}>
                <Image style={styles.selfieImg} src={getMediaURL(extras.liveness.selfieUrl)} />
              </View>
            )}
          </View>

          {extras.liveness && (
            <View>
              <Text style={styles.title}>{intl.formatMessage({ id: 'LivenessStep.Checks.status.title' })}</Text>
              <View style={styles.row}>
                <Text style={styles.label}>
                  {intl.formatMessage({ id: 'flow.biometricStep.selfie' })}
                  :
                </Text>
                <Text style={[styles.value, { color: getLivenessStatusColor(extras.liveness.status) }]}>
                  {intl.formatMessage({ id: `LivenessStep.Checks.${extras.liveness.status}` })}
                </Text>
              </View>
            </View>
          )}

          {extras.documents.map((document) => (
            <View key={document.type}>
              {/* title */}
              <Text style={styles.title}>
                {intl.formatMessage({ id: 'DocumentStep.title' }, {
                  document: intl.formatMessage({ id: `flow.documentTypeStep.${document.type}` }),
                  country: compact([document.country, document.region]).join(', '),
                })}
              </Text>

              {/* images */}
              <View style={styles.row}>
                {document.photos.map((image) => (
                  <Image key={image} style={styles.photo} src={getMediaURL(image)} />
                ))}
              </View>

              {document.reading.length > 0 && (
                <View key="document-reading" wrap={false}>
                  <Text style={styles.subtitle}>
                    {intl.formatMessage({ id: 'identity.field.document-reading' })}
                  </Text>
                  <PDFDocumentFields intl={intl} fields={document.reading} />
                </View>
              )}

              {document.checks.length > 0 && (
                <View key="checks">
                  <Text style={styles.subtitle}>
                    {intl.formatMessage({ id: 'DocumentStep.Checks.title' })}
                  </Text>
                  {document.checks.map((item) => {
                    const valueStyles = [styles.value];
                    if (item.error) {
                      valueStyles.push(styles.error);
                    }
                    return (
                      <View key={item.id} style={styles.row}>
                        <Text style={styles.label}>{intl.formatMessage({ id: item.titleLabel })}</Text>
                        <Text style={valueStyles}>{intl.formatMessage({ id: item.statusLabel })}</Text>
                      </View>
                    );
                  })}
                </View>
              )}

              {document.curp.length > 0 && (
                <>
                  <View key="curp-label">
                    <Image key="CURP logo" style={styles.checkLogo} src={CURP} />
                  </View>
                  <View key="curp-fields" style={styles.indent}>
                    <PDFDocumentFields intl={intl} fields={document.curp} />
                  </View>
                </>
              )}

              {document.ine.length > 0 && (
                <>
                  <View key="ine-label">
                    <Image key="INE logo" style={styles.checkLogo} src={INE} />
                  </View>
                  <View style={styles.indent}>
                    <PDFDocumentFields intl={intl} fields={document.ine} />
                  </View>
                </>
              )}

              {document.rfc.length > 0 && (
                <>
                  <View key="rfc-label">
                    <Image key="RFC logo" style={styles.checkLogo} src={RFC} />
                  </View>
                  <View style={styles.indent}>
                    <PDFDocumentFields intl={intl} fields={document.rfc} />
                  </View>
                </>
              )}

            </View>
          ))}
        </View>

        {/* footer */}
        <View fixed style={[styles.row, styles.footer]}>
          <View style={styles.fg1}>
            <Image style={styles.footerLogo} src={MatiLogo} />
          </View>
          <Text>{intl.formatMessage({ id: 'identity.title' }, { id: extras.shortId })}</Text>
        </View>
      </Page>
    </Document>
  );
}

export function getIdentityDocumentBlob(intl, identity) {
  return pdf(IdentityDocumentPDF(intl, identity)).toBlob();
}
