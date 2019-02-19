import React from 'react'
import { injectIntl } from 'react-intl'
import DocumentFields from './document-fields'
import DocumentPhotos from './document-photos'
import CSS from './verificationDetails.scss'
import VerificationFullNameLabel from 'src/fragments/verifications/verification-full-name-label'
import StatusSelect from 'src/fragments/verifications/status-select'
import ContentPreloader from 'src/components/content-preloader'
import { isFeatureEnabled } from 'src/lib/isFeatureEnabled'

function caption(document, intl) {
  const cap = [document.caption]
  if (document.origin) {
    cap.push(
      <span className="text-secondary">
        {' '}
        {intl.formatMessage({ id: 'verificationModal.origin' })} {document.origin}
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
  signURL,
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
    <div className="mgi-items">
      <section className={CSS.photos}>
        {photos.length > 0 && <DocumentPhotos selfie={selfie} photos={photos} signURL={signURL} />}
      </section>
      <section className="mgi-items--grow">
        <section className="mgi-section">
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
        </section>
        {documents.map((doc, index) => (
          <section className="mgi-section" key={index}>
            <h4>{caption(doc, intl)}</h4>
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
        ))}
      </section>
    </div>
  )
}

export default injectIntl(VerificationDetails)
