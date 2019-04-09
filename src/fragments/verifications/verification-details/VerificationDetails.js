import React from 'react'
import { injectIntl } from 'react-intl'
import DocumentFields from './document-fields'
import DocumentPhotos from './document-photos'
import CSS from './verificationDetails.scss'
import VerificationFullNameLabel from 'src/fragments/verifications/verification-full-name-label'
import StatusSelect from 'src/fragments/verifications/status-select'
import ContentPreloader from 'src/components/content-preloader'
import Sections from 'src/components/sections'
import Items from 'src/components/items'
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
    <Items template="auto minmax(auto, 100%)">
      <section className={CSS.photos}>
        <DocumentPhotos selfie={selfie} photos={photos} />
      </section>
      <section>
        <Sections withBorder>
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
              <section>
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
              </section>
              {index < documents.length - 1 && <hr />}
            </React.Fragment>
          ))}
        </Sections>
      </section>
    </Items>
  )
}

export default injectIntl(VerificationDetails)
