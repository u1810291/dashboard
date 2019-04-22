import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { titleize } from 'inflection'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { getIdentityWithNestedData, deleteIdentity } from 'src/state/identities'
import { getCountries } from 'src/state/countries'
import { Content } from 'src/components/application-box'
import Items from 'src/components/items'
import Click from 'src/components/click'
import confirm from 'src/components/confirm'
import PageContentLayout from 'src/components/page-content-layout'
import DocumentStep from 'src/fragments/verifications/document-step'
import LivenessStep from 'src/fragments/verifications/liveness-step'
import VerificationMetadata from 'src/fragments/verifications/verification-metadata'
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

  useEffect(
    () => {
      if (
        !get(identity, '_embedded.verification') ||
        !isLoaded(identity._embedded.verification)
      ) {
        setTimeout(() => loadData(dispatch, token, id), 5000)
      }
    },
    [identity]
  )

  if (!identity) return null

  const livenessStep =
    get(identity, '_embedded.verification') &&
    identity._embedded.verification.steps.find(step => step.id === 'liveness')

  const isDeleting = deletingIdentities.includes(identity.id)

  return (
    <Content>
      <Items flow="row" gap={4}>
        <h1>
          {titleize(identity.fullName || '')}{' '}
          <span className="text-secondary text-light">
            #{formatId(identity.id)}
          </span>
          <p>{new Date(identity.dateCreated).toLocaleDateString()}</p>
        </h1>
        <PageContentLayout>
          <main>
            <Items flow="row">
              {get(identity, '_embedded.verification') && (
                <>
                  {livenessStep && <LivenessStep step={livenessStep} />}
                  {identity._embedded.verification.documents.map(step => (
                    <DocumentStep
                      document={step}
                      countries={countries}
                      key={step.type}
                    />
                  ))}
                </>
              )}
              {identity.metadata && (
                <VerificationMetadata metadata={identity.metadata} />
              )}
              <section>
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
              </section>
            </Items>
          </main>
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
