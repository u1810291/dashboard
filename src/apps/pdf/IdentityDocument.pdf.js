import { Document, Image, Page, pdf, Text, View } from '@react-pdf/renderer';
import CURP from 'assets/curp-logo.png';
import INE from 'assets/ine-logo.png';
import MatiLogo from 'assets/mati-logo-black.png';
import RFC from 'assets/rfc-logo.png';
import Registraduria from 'assets/registraduria-logo.png';
import { getMediaURL } from 'lib/client/media';
import { compact } from 'lodash';
import React from 'react';
import { getLivenessStatusColor, getStatusColor } from './IdentityDocument.model';
import { styles } from './PDF.styles';
import { PDFChip } from './PDFChip';
import { PDFDocumentFields } from './PDFDocumentFields';

export function IdentityDocumentPDF(intl, identity) {
  if (!identity) {
    return null;
  }

  return (
    <Document title={`Identity ${identity.id}`} author="Matilock, Inc. www.mati.io">
      <Page size="A4" style={styles.page}>
        {/* content */}
        <View style={styles.normal}>
          {/* header */}
          <View style={styles.row}>
            <View style={styles.fg1}>
              <Text style={styles.normal}>{intl.formatMessage({ id: 'identity.title' }, { id: identity.shortId })}</Text>
              <View style={{ color: getStatusColor(identity.status) }}>
                <Text style={styles.h2}>
                  {intl.formatMessage({ id: 'identity.status' })}
                  :
                  {intl.formatMessage({ id: `statuses.${identity.status}` })}
                </Text>
              </View>
              <Text style={[styles.h1, styles.mt1]}>{identity.fullName || intl.formatMessage({ id: 'identity.nameNotFound' })}</Text>
              <Text style={[styles.normal, styles.grey]}>{identity.dateCreated}</Text>
            </View>
            {identity.liveness && identity.liveness.selfieUrl && (
              <View style={styles.selfieBox}>
                <Image style={styles.selfieImg} src={getMediaURL(identity.liveness.selfieUrl)} />
              </View>
            )}
          </View>

          {identity.ipCheck && !identity.ipCheck.error && (
            <View>
              <Text style={styles.title}>{intl.formatMessage({ id: 'IpCheckStep.title' })}</Text>

              {/* map */}
              <View style={styles.mapBox}>
                <Image style={styles.mapBox} src={identity.ipCheck.data.mapUrl} />
              </View>

              {/* chip */}
              <View style={[styles.mt1, styles.vpnChipBox]}>
                <PDFChip
                  isSuccess={identity.ipCheck.data.safe}
                  label={intl.formatMessage({ id: identity.ipCheck.data.safe ? 'IpCheckStep.vpnDetected' : 'IpCheckStep.noVpnDetected' })}
                />
              </View>

              {/* data table */}
              <View style={styles.mt1}>
                <View style={styles.row}>
                  <Text style={[styles.label, styles.w20]}>{intl.formatMessage({ id: 'IpCheckStep.country' })}</Text>
                  <Text style={[styles.value, styles.w80]}>{identity.ipCheck.data.country}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={[styles.label, styles.w20]}>{intl.formatMessage({ id: 'IpCheckStep.province' })}</Text>
                  <Text style={[styles.value, styles.w80]}>{identity.ipCheck.data.region}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={[styles.label, styles.w20]}>{intl.formatMessage({ id: 'IpCheckStep.city' })}</Text>
                  <Text style={[styles.value, styles.w80]}>{identity.ipCheck.data.city}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={[styles.label, styles.w20]}>{intl.formatMessage({ id: 'IpCheckStep.zipCode' })}</Text>
                  <Text style={[styles.value, styles.w80]}>{identity.ipCheck.data.zip}</Text>
                </View>
              </View>
            </View>
          )}

          {identity.liveness && (
            <View>
              <Text style={styles.title}>{intl.formatMessage({ id: 'LivenessStep.Checks.status.title' })}</Text>
              <View style={styles.row}>
                <Text style={styles.label}>
                  {intl.formatMessage({ id: 'flow.biometricStep.selfie' })}
                  :
                </Text>
                <Text style={[styles.value, { color: getLivenessStatusColor(identity.liveness.status) }]}>
                  {intl.formatMessage({ id: `LivenessStep.Checks.${identity.liveness.status}` })}
                </Text>
              </View>
            </View>
          )}

          {identity.documents.map((document) => (
            <View key={document.type}>
              {/* title */}
              <Text style={styles.title}>
                {intl.formatMessage({ id: 'DocumentStep.title' }, {
                  document: intl.formatMessage({ id: `flow.documentTypeStep.${document.type}` }),
                  country: compact([document.country, document.region]).join(', '),
                })}
              </Text>

              {/* sanction list */}
              {document.isSanctioned && (
                <PDFChip
                  isSuccess={false}
                  label={intl.formatMessage({ id: 'SanctionCheck.title' })}
                />
              )}

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
                        <View style={styles.label}>
                          <Text>{intl.formatMessage({ id: `SecurityCheckStep.${item.id}.title` })}</Text>
                        </View>
                        <View style={valueStyles}>
                          <Text>{intl.formatMessage({ id: `SecurityCheckStep.${item.id}.${item.checkStatus}` })}</Text>
                          {item.labelExtra && <Text>{intl.formatMessage({ id: item.labelExtra, defaultMessage: ' ' }, item.labelExtraData)}</Text>}
                        </View>
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

              {document.colombianRegistraduria.length > 0 && (
                <>
                  <View key="registraduria-label">
                    <Image key="Registraduria logo" style={styles.checkLogo} src={Registraduria} />
                  </View>
                  <View style={styles.indent}>
                    <PDFDocumentFields intl={intl} fields={document.colombianRegistraduria} />
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
          <Text>{intl.formatMessage({ id: 'identity.title' }, { id: identity.shortId })}</Text>
        </View>
      </Page>
    </Document>
  );
}

export function getIdentityDocumentBlob(intl, identity) {
  return pdf(IdentityDocumentPDF(intl, identity)).toBlob();
}
