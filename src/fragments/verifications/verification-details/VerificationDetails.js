import React from 'react'
import { injectIntl } from 'react-intl'
import DocumentFields from './document-fields'
import DocumentPhotos from './document-photos'
import CSS from './verificationDetails.scss'
import VerificationFullNameLabel from 'src/fragments/verifications/verification-full-name-label'
import StatusSelect from 'src/fragments/verifications/status-select'
import ContentPreloader from 'src/components/content-preloader'

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
  signURL,
  onFieldChange,
  fullName,
  status,
  onStatusChange
}) {
  return (
    <div className="mgi-items">
      <section className={CSS.photos}>
        {photos.length > 0 && (
          <DocumentPhotos photos={photos} signURL={signURL} />
        )}
      </section>
      <section className="mgi-items--grow">
        <section className="mgi-section">
          <h1>
            <VerificationFullNameLabel>{fullName}</VerificationFullNameLabel>
            <StatusSelect status={status} onSelect={onStatusChange} />
          </h1>
        </section>
        {documents.map((doc, index) => (
          <section className="mgi-section" key={index}>
            <h4>{caption(doc, intl)}</h4>
            {doc.queued ? (
              <ContentPreloader />
            ) : (
              <DocumentFields
                fields={doc.fields}
                onFieldChange={onFieldChange}
              />
            )}
          </section>
        ))}
      </section>
    </div>
  )
}

export default injectIntl(VerificationDetails)
