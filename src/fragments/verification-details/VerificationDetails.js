import React from 'react'
import { injectIntl } from 'react-intl'
import DocumentFields from './document-fields'
import DocumentPhotos from './document-photos'
import CSS from './verificationDetails.scss'
import VerificationFullNameLabel from 'src/fragments/verification-full-name-label'
import StatusSelect from 'src/fragments/status-select'
import ContentPreloader from 'src/components/content-preloader'
import classNames from 'classnames'

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

function VerificationDetails({ intl, photos = [], documents = [], signURL, onFieldChange, fullName, status, onStatusChange }) {
  return (
    <div className={classNames(CSS.details, 'container')}>
      <div className="row">
        <div className="X12 M4">
          {photos.length > 0 && (
            <DocumentPhotos photos={photos} signURL={signURL} />
          )}
        </div>
        <div className="X12 M8">
          <div className={CSS.details}>
            <section className="mgi-section">
              <h1>
                <VerificationFullNameLabel>
                  {fullName}
                </VerificationFullNameLabel>
                <StatusSelect
                  status={status}
                  onSelect={onStatusChange}
                />
              </h1>
            </section>
            {documents.map((doc, index) => (
              <section className="mgi-section" key={index}>
                <h4>{caption(doc, intl)}</h4>
                {doc.queued ? (
                  <ContentPreloader />
                ) : (
                  <DocumentFields fields={doc.fields} onFieldChange={onFieldChange}/>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default injectIntl(VerificationDetails)
