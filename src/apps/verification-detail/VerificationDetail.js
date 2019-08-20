/** @jsx jsx */

import { css, jsx } from '@emotion/core';

import { FormattedMessage } from 'react-intl'
import { titleize } from 'inflection'
import { connect } from 'react-redux'
import { get, isEmpty } from 'lodash'
import Card from 'components/card'
// eslint-disable-next-line
import React, { useEffect, memo } from 'react'
import moment from 'moment'
import {
  getIdentityWithNestedData,
  deleteIdentity,
  patchIdentity,
  patchDocument,
  getDemoVerification,
} from 'state/identities'
import { getCountries } from 'state/countries'
import { sendWebhook } from 'state/webhooks';
import { Content } from 'components/application-box'
import Items from 'components/items'
import Click from 'components/click'
import confirm from 'components/confirm';
import confirmStyled from 'components/confirm/ConfirmStyled';
import { default as Text, HR } from 'components/text';
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
import { FiUpload, FiCode } from 'react-icons/fi';
import CSS from './VerificationDetail.module.scss';
import StatesExplanation from 'fragments/verifications/states-explanation';
import { ifDateFormat, formatISODate } from 'lib/string';

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

async function handleSendWebhook(dispatch, token, id) {
  await confirmStyled({
    header: <FormattedMessage id="verificationWebhookModal.header" />,
    message: <FormattedMessage id="verificationWebhookModal.body" />,
    confirmText: <FormattedMessage id="verificationWebhookModal.confirm" />,
    cancelText: <FormattedMessage id="verificationWebhookModal.cancel" />
  });
  await dispatch(sendWebhook(token, id));
}

function formatDateBeforeSend(text) {
  return ifDateFormat(text) ? formatISODate(text) : text;
}

function onSubmit(...args) {
  const [dispatch, token, identityId, documentId, key, value] = args;
  const valueToSend = {
    [key]: {value: formatDateBeforeSend(value)}
  }
  dispatch(patchDocument(token, identityId, documentId, valueToSend ));
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

const findDocumentId = (type, sources) => {
  return get(sources.find(doc => doc.type === type), 'id');
}

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
  let verification;
  const identity = instances[id];

  if (!identity || !(verification = get(identity, '_embedded.verification'))) {
    return null;
  }
  const isDeleting = deletingIdentities.includes(identity.id);
  const documentsSources = get(identity, '_embedded.documents');
  const livenessStep = verification.steps.find(s => s.id === 'liveness');
  const userInfo = {
    fullName: titleize(identity.fullName || ''),
    dateCreated: moment(identity.dateCreated).local().format('DD MMM, YYYY HH:mm'),
  };

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
              <Card flow="column" templateColumns="5fr auto">
                <Header info={userInfo} />
              </Card>

              {/* Liveness */}
              { livenessStep && <LivenessStep step={livenessStep} info={userInfo} /> }

              {/* Documents */}
              { verification.documents.map(doc =>
                  <DocumentStep
                    document={doc}
                    source={documentsSources}
                    countries={countries}
                    key={doc.type}
                    onSubmit={onSubmit.bind(
                      null,
                      dispatch,
                      token,
                      identity.id,
                      findDocumentId(doc.type, documentsSources)
                    )}
                  />
                )
              }

              {/* Metadata */}
              {identity.metadata && (
                <VerificationMetadata metadata={identity.metadata} />
              )}
              <MatiChecks />
            </Items>
          </main>

          <aside>
            <Items flow="row" justifyContent="inherit" gap={1} className={CSS.aside}>
              { !['pending', 'running'].includes(identity.status) &&
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

              {/* Send Webhook */}
              <Click onClick={ handleSendWebhook.bind(null, dispatch, token, id) }>
                <FiUpload />
                <FormattedMessage id="verificationDetails.tools.sendWebhook" />
              </Click>

              {/* Show verification data */}
              <Click
                className="button"
                onClick={ openWebhookModal.bind(
                  null,
                  get(identity, 'originalIdentity._embedded.verification', {})
                )}
              >
                <FiCode />
                <FormattedMessage id="verificationModal.webhookData" />
              </Click>

              {/* Delete Verification */}
              <Click
                className="button"
                shadow={1}
                onClick={ handleDeleteIdentity.bind(
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
                  <DeleteIcon className="svg-black" />
                )}
                <FormattedMessage id="verificationModal.delete" />
              </Click>
              <HR width="0" />
              <StatesExplanation />
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
