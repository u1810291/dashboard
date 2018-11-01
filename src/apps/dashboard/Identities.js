import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { startCase, flatten, uniq } from 'lodash'
import { getIdentities } from 'src/state/identities'
import { AVAILABLE_DOCUMENT_TYPES } from 'src/state/merchant'
import { Content } from 'src/components/application-box'
import Label from 'src/components/label'
import { CardExpandable } from 'src/components/card-expandable'
import { SyntaxHighlighter } from 'src/components/syntax-highlighter'
import stringify from 'src/lib/stringify'
import client from 'src/lib/client'
import { authorizedUrl } from 'src/lib/client/http'
import CSS from './Identities.css'

export const DOCUMENT_TYPE_COLORS = {
  liveness: 'blue',
  passport: 'orange',
  'national-id': 'green',
  'driving-license': 'red',
  'proof-of-residency': 'yellow'
}

const Percents = ({ children }) => (parseInt(children, 10) || 0 * 100).toFixed(0) + '%'

const PicturePreview = ({ type, href }) => (
  <div>
    <h4 className="text-caption text-secondary">
      <FormattedMessage id={`flow.documentTypeStep.${type}`} />
    </h4>
    <img src={href} alt="" />
  </div>
)

export const DocumentTypesLabel = ({ types }) => {
  const TypeLabel = ({ type }) => (
    <Label labelStyle={`${DOCUMENT_TYPE_COLORS[type]}`}>
      <FormattedMessage id={`flow.documentTypeStep.${type}`} />
    </Label>
  )
  return types
    .filter(t => typeof t === 'string')
    .map(type => <TypeLabel type={type} key={type} />)
    .reduce((prev, curr, i) => [prev, <Label key={i}>+</Label>, curr], [
      <TypeLabel type="liveness" key="liveness" />
    ])
}

@connect(
  state => ({ identities: state.identities.identities, token: state.auth.token }),
  { getIdentities }
)
@injectIntl
export default class Identities extends React.Component {
  componentDidMount() {
    this.props.getIdentities(this.props.token)
  }

  render() {
    const getDoumentTypes = facematchScore =>
      uniq(flatten(facematchScore).filter(t => AVAILABLE_DOCUMENT_TYPES.includes(t)))
    return (
      <Content>
        <h2>
          <FormattedMessage id="dashboard.title" />
        </h2>
        {this.props.identities.map(identity => {
          console.log(identity)
          const info = (
            <React.Fragment>
              <div className={CSS.infoFullName}>
                <strong>
                  {startCase(
                    (
                      identity.fullName ||
                      this.props.intl.formatMessage({ id: 'dashboard.unknown-name' })
                    ).toLowerCase()
                  )}
                </strong>
              </div>
              <div className={CSS.infoDocumentTypes}>
                <DocumentTypesLabel types={getDoumentTypes(identity.facematchScore)} />
              </div>
              <div>{new Date(identity.dateCreated).toLocaleDateString()}</div>
            </React.Fragment>
          )

          const details = async () =>
            await client.identities
              .getDocumentsFullData(this.props.token, identity.id)
              .then(documents => (
                <React.Fragment>
                  <CardExpandable.Detail className={CSS.cardImages}>
                    <PicturePreview
                      type="face"
                      href={authorizedUrl(identity._links.photo.href + '.jpg', this.props.token)}
                    />
                    {documents.map(doc => (
                      <PicturePreview
                        type={doc.type}
                        href={authorizedUrl(doc.pictures[0]._links.file.href, this.props.token)}
                      />
                    ))}
                  </CardExpandable.Detail>
                  {documents.map(doc => (
                    <CardExpandable.Detail
                      secondarySection
                      legend={[
                        this.props.intl.formatMessage({ id: `flow.documentTypeStep.${doc.type}` }),
                        this.props.intl.formatMessage({ id: 'identities.details.check' })
                      ].join(' ')}
                    >
                      <ul className={CSS.documentFields}>
                        <li>
                          <h4 className="text-caption text-secondary">
                            <FormattedMessage id="identities.fields.faceMatch" />
                          </h4>
                          <strong><small>{
                            <Percents>
                              {(identity.facematchScore.find(s => s[0] === doc.type) || [])[1]}
                            </Percents>
                          }</small></strong>
                        </li>
                        {doc.fields.map(field => (
                          <li>
                            <h4 className="text-caption text-secondary">
                              <FormattedMessage id={`identities.fields.${field.id}`} />
                            </h4>
                            <strong><small>{field.value}</small></strong>
                          </li>
                        ))}
                      </ul>
                    </CardExpandable.Detail>
                  ))}
                  <CardExpandable.Detail
                    secondarySection
                    legend={this.props.intl.formatMessage({ id: 'identities.details.webhook' })}
                  >
                    <SyntaxHighlighter>{stringify(identity)}</SyntaxHighlighter>
                  </CardExpandable.Detail>
                </React.Fragment>
              ))

          return <CardExpandable info={info} details={details} key={identity.id} />
        })}
      </Content>
    )
  }
}
