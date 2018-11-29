import React from 'react'
import { injectIntl } from 'react-intl'
import Panel from 'src/components/panel'
import DocumentFields from './document-fields'
import DocumentPhotos from './document-photos'
import CSS from './verification-details.module.scss'

function caption(document, intl) {
  const cap = [document.caption]
  if (document.origin) {
    cap.push(
      <span className="text-secondary">
        {' '}
        ({intl.formatMessage({ id: 'verifirationModal.origin' })}{' '}
        {document.origin})
      </span>
    )
  }
  return cap
}

function VerificationDetails({ intl, photos = [], documents = [], signURL }) {
  return (
    <div className={CSS.details}>
      {photos.length > 0 && (
        <Panel
          caption={intl.formatMessage({
            id: 'verifirationModal.photos.caption'
          })}
        >
          <Panel.Body>
            <DocumentPhotos photos={photos} signURL={signURL} />
          </Panel.Body>
        </Panel>
      )}
      {documents
        .filter(doc => doc.fields && doc.fields.length)
        .map(doc => (
          <Panel caption={caption(doc, intl)} className={CSS.documentPanel}>
            <Panel.Body className={CSS.documentPanelBody}>
              <DocumentFields fields={doc.fields} />
            </Panel.Body>
          </Panel>
        ))}
    </div>
  )
}

export default injectIntl(VerificationDetails)
