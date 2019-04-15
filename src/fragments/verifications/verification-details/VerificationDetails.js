import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import DocumentFields from './document-fields'
import DocumentPhotos from './document-photos'
import CSS from './verificationDetails.scss'
import VerificationFullNameLabel from 'src/fragments/verifications/verification-full-name-label'
import StatusSelect from 'src/fragments/verifications/status-select'
import ContentPreloader from 'src/components/content-preloader'
import SyntaxHighlighter from 'src/components/syntax-highlighter'
import Items from 'src/components/items'
import Card from 'src/components/card'
import stringify from 'src/lib/stringify'
import { isFeatureEnabled } from 'src/lib/isFeatureEnabled'

function caption(document, intl) {
  const cap = [document.caption]
  if (document.origin) {
    cap.push(
      <span className="text-secondary">
        {' '}
        {intl.formatMessage({ id: 'verificationModal.origin' })}{' '}
        {document.origin}
      </span>
    )
  }

  if (document.via) {
    cap.push(
      <span className="text-secondary">
        {', '}
        {intl.formatMessage({ id: 'verificationModal.via' })} {document.via}
      </span>
    )
  }
  return cap
}

function VerificationDetails({
  intl,
  photos = [],
  documents = [],
  metadata,
  selfie,
  onFieldChange,
  fullName,
  status,
  patchIsLoading,
  patchError,
  patchingFields,
  erroredFields,
  onStatusChange
}) {
  return (
    <Card>
      <Items templateColumns="auto minmax(auto, 100%)">
        <section className={CSS.photos}>
          <DocumentPhotos selfie={selfie} photos={photos} />
        </section>
        <section>
          <Items flow="row">
            <h1>
              <VerificationFullNameLabel>{fullName}</VerificationFullNameLabel>
              {isFeatureEnabled('STATUSES') && (
                <StatusSelect
                  status={status}
                  onSelect={onStatusChange}
                  isLoading={patchIsLoading}
                  error={patchError}
                />
              )}
            </h1>
            <hr />
            {documents.map((doc, index) => (
              <React.Fragment key={index}>
                <Items flow="row" gap={1}>
                  <h3>{caption(doc, intl)}</h3>
                  {doc.inProgress ? (
                    <ContentPreloader />
                  ) : (
                    <DocumentFields
                      fields={doc.fields}
                      onFieldChange={onFieldChange}
                      patchingFields={patchingFields}
                      erroredFields={erroredFields}
                    />
                  )}
                </Items>
                {index < documents.length - 1 && <hr />}
              </React.Fragment>
            ))}
            {metadata && (
              <>
                <hr />
                <Items flow="row" gap={1}>
                  <h3>
                    <FormattedMessage id="verificationModal.fields.metadata" />
                  </h3>
                  <SyntaxHighlighter
                    code={stringify(metadata)}
                    language="javascript"
                    showCopyToClipboard={false}
                    border="transparent"
                    background="lightergray"
                  />
                </Items>
              </>
            )}
          </Items>
        </section>
      </Items>
    </Card>
  )
}

export default injectIntl(VerificationDetails)
