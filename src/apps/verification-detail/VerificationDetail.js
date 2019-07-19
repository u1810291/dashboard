/** @jsx jsx */

import { css, jsx } from '@emotion/core';

import { FormattedMessage } from 'react-intl'
import { titleize } from 'inflection'
import { connect } from 'react-redux'
import { get, isEqual, isEmpty } from 'lodash'
import Card from 'components/card'
// eslint-disable-next-line
import React, { useEffect, memo } from 'react'
import moment from 'moment'
import {
  getIdentityWithNestedData,
  deleteIdentity,
  patchIdentity,
  getDemoVerification,
} from 'state/identities'
import { getCountries } from 'state/countries'
import { Content } from 'components/application-box'
import Items from 'components/items'
import Click from 'components/click'
import confirm from 'components/confirm'
import { default as Text } from 'components/text';
import classNames from 'classnames';
import { createOverlay, closeOverlay } from 'components/overlay'
import PageContentLayout from 'components/page-content-layout'
import DocumentStep from 'fragments/verifications/document-step'
import LivenessStep from 'fragments/verifications/liveness-step'
import VerificationMetadata from 'fragments/verifications/verification-metadata'
import VerificationWebhookModal from 'fragments/verifications/verification-webhook-modal'
import MatiChecks from 'fragments/verifications/mati-checks'
import Spinner from 'components/spinner'
import { ReactComponent as DeleteIcon } from './delete-icon.svg'
import StatusSelect from '../../fragments/verifications/status-select/StatusSelect';

function formatId(id = '') {
  return id.slice(-6)
}

async function handleDeleteIdentity(dispatch, history, token, id) {
  await confirm(<FormattedMessage id="verificationModal.delete.confirm" />)
  await dispatch(deleteIdentity(token, id))
  history.push('/verifications')
}

function openWebhookModal(identity) {
  createOverlay(<VerificationWebhookModal webhook={identity} onClose={closeOverlay} />)
}

const Header = ({ 
  info: {
    fullName,
    dateCreated
  }
}) => (
  <div css={css`padding-left:15px;`}>
    <p css={css`padding-bottom:15px;`}>
      <Text size={4.5} weight={4} color={classNames({'gray': isEmpty(fullName)})}>
        { fullName ? fullName :
          <FormattedMessage id="identities.nameNotFound" />
        }
      </Text>
    </p>
    { dateCreated &&
      <p>
        <Text color="gray">{dateCreated}</Text>
      </p>
    }
  </div>
)

const MemoizedPageContent = memo(
  ({ identity, countries }) => {
    let verification
    if (!(verification = get(identity, '_embedded.verification'))) {
      return null
    }
    const livenessStep = verification.steps.find(s => s.id === 'liveness');
    const userInfo = {
      fullName: titleize(identity.fullName || ''),
      dateCreated: moment.utc(identity.dateCreated).format('MMM, Do, YYYY HH:mm')
    };

    return (
      <>
        <Card flow="column" templateColumns="5fr auto">
          <Header info={userInfo} />
        </Card>
        {livenessStep && <LivenessStep step={livenessStep} info={userInfo} />}
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

const VerificationDetail = ({
  token,
  countries,
  identities: {
    instances,
  },
  dispatch,
  history,
  deletingIdentities,
  match: {
    params: { id, demo }
  },
  ...props
}) => {
  useEffect(() => {
    dispatch(getCountries(token))
    demo ?
      dispatch(getDemoVerification(token, id)) :
      dispatch(getIdentityWithNestedData(token, id));
  }, [dispatch, token, id, demo]);
  const identity = instances[id];
  if (!identity) return null
  const isDeleting = deletingIdentities.includes(identity.id)

  return (
    <Content>
      <Items flow="row" gap={2.6}>
        <h1>
          <span className="text-light">
            Verification #{formatId(identity.id)}
          </span>
        </h1>
        <PageContentLayout navigation={false}>
          <main>
            <Items flow="row">
              <MemoizedPageContent identity={identity} countries={countries} />
              {identity.metadata && (
                <VerificationMetadata metadata={identity.metadata} />
              )}
              <MatiChecks />
            </Items>
          </main>
          <aside>
            <Items flow="row" justifyItems="start">
              { identity.status !== 'pending' &&
                <StatusSelect
                  status={identity.status}
                  onSelect={async (status) => {
                    identity.status = status;
                    await dispatch(patchIdentity(token, identity.id, {
                      status: identity.status,
                    }));
                  }}
                />
              }
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
};

export default connect((state, props) => ({
  token: state.auth.token,
  identities: state.identities,
  countries: state.countries.countries,
  deletingIdentities: state.identities.deletingIdentities
}))(VerificationDetail)
