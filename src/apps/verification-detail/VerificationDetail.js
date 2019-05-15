import React, { useEffect, memo } from 'react'
import { FormattedMessage } from 'react-intl'
import { titleize } from 'inflection'
import { connect } from 'react-redux'
import { get, isEqual } from 'lodash'
import moment from 'moment'
import { getIdentityWithNestedData, deleteIdentity } from 'src/state/identities'
import { getCountries } from 'src/state/countries'
import { Content } from 'src/components/application-box'
import Items from 'src/components/items'
import Click from 'src/components/click'
import confirm from 'src/components/confirm'
import { createOverlay } from 'src/components/overlay'
import PageContentLayout from 'src/components/page-content-layout'
import DocumentStep from 'src/fragments/verifications/document-step'
import LivenessStep from 'src/fragments/verifications/liveness-step'
import VerificationMetadata from 'src/fragments/verifications/verification-metadata'
import VerificationWebhookModal from 'src/fragments/verifications/verification-webhook-modal'
import Spinner from 'src/components/spinner'
import { ReactComponent as DeleteIcon } from './delete-icon.svg'

function formatId(id = '') {
  return id.slice(-6)
}

async function handleDeleteIdentity(dispatch, history, token, id) {
  await confirm(<FormattedMessage id="verificationModal.delete.confirm" />)
  await dispatch(deleteIdentity(token, id))
  history.push('/verifications')
}

function openWebhookModal(identity) {
  createOverlay(<VerificationWebhookModal webhook={identity} />)
}

function loadData(dispatch, token, id) {
  dispatch(getIdentityWithNestedData(token, id))
}

function isLoaded(verification) {
  return (
    verification.steps.every(step => step.status === 200) &&
    verification.documents.every(document =>
      document.steps.every(docStep => docStep.status === 200)
    )
  )
}

const MemoizedPageContent = memo(
  ({ identity, countries }) => {
    let verification
    if (!(verification = get(identity, '_embedded.verification'))) return null

    const livenessStep = verification.steps.find(s => s.id === 'liveness')
    return (
      <>
        {livenessStep && <LivenessStep step={livenessStep} />}
        {verification.documents.map(doc => (
          <DocumentStep document={doc} countries={countries} key={doc.type} />
        ))}
      </>
    )
  },
  function(next, prev) {
    function normalize(identity) {
      const verification = get(identity, '_embedded.verification', {
        steps: [],
        documents: []
      })

      return {
        id: verification.id,
        steps: verification.steps.map(s => ({ status: s.status, id: s.id })),
        documents: verification.documents.map(d => ({
          type: d.type,
          steps: d.steps.map(ds => ({
            id: ds.id,
            status: ds.status
          }))
        }))
      }
    }
    return isEqual(normalize(prev.identity), normalize(next.identity))
  }
)

function VerificationDetail({
  token,
  countries,
  identity,
  dispatch,
  history,
  deletingIdentities,
  match: {
    params: { id }
  },
  ...props
}) {
  useEffect(() => {
    dispatch(getCountries(token))
    dispatch(getIdentityWithNestedData(token, id))
  }, [])

  useEffect(() => {
    setTimeout(function() {
      const verification = get(identity, '_embedded.verification')
      if (verification && !isLoaded(verification)) {
        loadData(dispatch, token, id)
      }
    }, 5000)
  }, [identity])

  if (!identity) return null

  const isDeleting = deletingIdentities.includes(identity.id)

  return (
    <Content>
      <Items flow="row" gap={4}>
        <h1>
          {titleize(identity.fullName || '')}{' '}
          <span className="text-secondary text-light">
            #{formatId(identity.id)}
          </span>
          <p>
            {moment(identity.dateCreated)
              .utcOffset(new Date().getTimezoneOffset())
              .format('MMM D, YYYY')}
          </p>
        </h1>
        <PageContentLayout>
          <main>
            <Items flow="row">
              <MemoizedPageContent identity={identity} countries={countries} />
              {identity.metadata && (
                <VerificationMetadata metadata={identity.metadata} />
              )}
            </Items>
          </main>
          <aside>
            <Items flow="row" justifyItems="start">
              <Click
                background="error"
                shadow={1}
                onClick={handleDeleteIdentity.bind(
                  null,
                  dispatch,
                  history,
                  token,
                  id
                )}
              >
                {isDeleting ? (
                  <Spinner />
                ) : (
                  <DeleteIcon className="svg-white" />
                )}
                <FormattedMessage id="verificationModal.delete" />
              </Click>
              <Click
                onClick={openWebhookModal.bind(
                  null,
                  get(identity, 'originalIdentity._embedded.verification', {})
                )}
              >
                <FormattedMessage id="verificationModal.webhookData" />
              </Click>
            </Items>
          </aside>
        </PageContentLayout>
      </Items>
    </Content>
  )
}

export default connect((state, props) => ({
  token: state.auth.token,
  identity: state.identities.instances[props.match.params.id],
  countries: state.countries.countries,
  deletingIdentities: state.identities.deletingIdentities
}))(VerificationDetail)
