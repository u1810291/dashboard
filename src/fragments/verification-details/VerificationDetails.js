import React from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import Panel from 'src/components/panel'
import DocumentFields from './document-fields'
import DocumentPhotos from './document-photos'
import Spinner from 'src/components/spinner'
import CSS from './verification-details.module.scss'

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

function DocumentInProgress() {
  return (
    <span className="text-secondary mgi-items mgi-items--centered mgi-items--narrow">
      <Spinner size="small" />
      <FormattedMessage id="verifications.inProgress" />
    </span>
  )
}

function VerificationDetails({ intl, photos = [], documents = [], signURL, onFieldChange }) {
  return (
    <div className={CSS.details}>
      {photos.length > 0 && (
        <Panel
          caption={intl.formatMessage({
            id: 'verificationModal.photos.caption'
          })}
        >
          <Panel.Body>
            <DocumentPhotos photos={photos} signURL={signURL} />
          </Panel.Body>
        </Panel>
      )}
      {documents.map(doc => (
        <Panel caption={caption(doc, intl)} className={CSS.documentPanel}>
          <Panel.Body className={CSS.documentPanelBody}>
            {doc.queued ? (
              <DocumentInProgress />
            ) : (
              <DocumentFields fields={doc.fields} onFieldChange={onFieldChange}/>
            )}
          </Panel.Body>
        </Panel>
      ))}
    </div>
  )
}

export default injectIntl(VerificationDetails)
