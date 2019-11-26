import { Box } from '@material-ui/core';
import classNames from 'classnames';
import { Content } from 'components/application-box';
import Card from 'components/card';
import Click from 'components/click';
import confirm from 'components/confirm';
import confirmStyled from 'components/confirm/ConfirmStyled';
import Items from 'components/items';
import { closeOverlay, createOverlay } from 'components/overlay';
import PageContentLayout from 'components/page-content-layout';
import Spinner from 'components/spinner';
import Text, { HR } from 'components/text';
import DocumentStep from 'fragments/verifications/document-step';
import LivenessStep from 'fragments/verifications/liveness-step';
import MatiChecks from 'fragments/verifications/mati-checks';
import StatesExplanation from 'fragments/verifications/states-explanation';
import VerificationMetadata from 'fragments/verifications/verification-metadata';
import VerificationWebhookModal from 'fragments/verifications/verification-webhook-modal';
import { titleize } from 'inflection';
import { formatISODate, ifDateFormat } from 'lib/string';
import { get, isEmpty } from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { FiCode, FiUpload } from 'react-icons/fi';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCountries } from 'state/countries/countries.actions';
import { deleteIdentity, getDemoVerification, getIdentityWithNestedData, patchDocument, patchIdentity } from 'state/identities/identities.actions';
import { sendWebhook } from 'state/webhooks/webhooks.actions';
import StatusSelect from '../../fragments/verifications/status-select/StatusSelect';

import { ReactComponent as DeleteIcon } from './delete-icon.svg';
import CSS from './VerificationDetail.module.scss';

function formatId(id = '') {
  return id.slice(-6);
}

async function handleDeleteIdentity(dispatch, history, id) {
  await confirm(<FormattedMessage id="verificationModal.delete.confirm" />);
  await dispatch(deleteIdentity(id));
  history.push('/identities');
}

function openWebhookModal(identity) {
  createOverlay(<VerificationWebhookModal webhook={identity} onClose={closeOverlay} />);
}

async function handleSendWebhook(dispatch, id) {
  await confirmStyled({
    header: <FormattedMessage id="verificationWebhookModal.header" />,
    message: <FormattedMessage id="verificationWebhookModal.body" />,
    confirmText: <FormattedMessage id="verificationWebhookModal.confirm" />,
    cancelText: <FormattedMessage id="verificationWebhookModal.cancel" />,
  });
  await dispatch(sendWebhook(id));
}

function formatDateBeforeSend(text) {
  return ifDateFormat(text) ? formatISODate(text) : text;
}

function onSubmit(...args) {
  const [dispatch, identityId, documentId, key, value] = args;
  const valueToSend = {
    [key]: { value: formatDateBeforeSend(value) },
  };
  dispatch(patchDocument(identityId, documentId, valueToSend));
}

const Header = ({
  info: {
    fullName,
    dateCreated,
  },
}) => (
  <Box pl={1.5}>
    <Box pb={1.5}>
      <Text size={4.5} weight={4} color={classNames({ gray: isEmpty(fullName) })}>
        { fullName || <FormattedMessage id="identities.nameNotFound" />}
      </Text>
    </Box>
    { dateCreated
      && (
      <p>
        <Text color="gray">{dateCreated}</Text>
      </p>
      )}
  </Box>
);

Header.propTypes = {
  info: PropTypes.shape({
    fullName: PropTypes.string,
    dateCreated: PropTypes.string,
  }).isRequired,
};

const findDocumentId = (type, sources) => get(sources.find((doc) => doc.type === type), 'id');

const VerificationDetail = ({
  countries,
  identities: {
    instances,
  },
  dispatch,
  history,
  deletingIdentities,
}) => {
  const { id, demoId } = useParams();
  const identityId = id === 'demo' ? demoId : id;

  useEffect(() => {
    dispatch(getCountries());
    if (demoId) {
      dispatch(getDemoVerification(demoId));
    } else {
      dispatch(getIdentityWithNestedData(id));
    }
  }, [dispatch, id, demoId]);

  const identity = instances[identityId];
  const verification = get(identity, '_embedded.verification');
  if (!identity || !(verification)) {
    return null;
  }

  const isDeleting = deletingIdentities.includes(identity.id);
  const documentsSources = get(identity, '_embedded.documents');
  const livenessStep = verification.steps.find((steps) => ['liveness', 'selfie'].includes(steps.id));
  const userInfo = {
    fullName: titleize(identity.fullName || ''),
    dateCreated: moment(identity.dateCreated).local().format('DD MMM, YYYY HH:mm'),
  };

  return (
    <Content>
      <Items flow="row" gap={2.6}>
        <h1>
          <span className="text-light">
            Verification #
            {formatId(identity.id)}
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
              { verification.documents.map((doc) => (
                <DocumentStep
                  document={doc}
                  source={documentsSources}
                  countries={countries}
                  key={doc.type}
                  // eslint-disable-next-line react/jsx-no-bind
                  onSubmit={onSubmit.bind(
                    null,
                    dispatch,
                    identity.id,
                    findDocumentId(doc.type, documentsSources),
                  )}
                />
              ))}

              {/* Metadata */}
              {identity.metadata && (
                <VerificationMetadata metadata={identity.metadata} />
              )}
              <MatiChecks />
            </Items>
          </main>

          <aside>
            <Items flow="row" justifyContent="inherit" gap={1} className={CSS.aside}>
              { !['pending', 'running'].includes(identity.status)
                && (
                <StatusSelect
                  status={identity.status}
                  onSelect={async (status) => {
                    identity.status = status;
                    await dispatch(patchIdentity(identity.id, {
                      status: identity.status,
                    }));
                  }}
                />
                )}

              {/* Send Webhook */}
              <Click onClick={() => handleSendWebhook(dispatch, id)}>
                <FiUpload />
                <FormattedMessage id="verificationDetails.tools.sendWebhook" />
              </Click>

              {/* Show verification data */}
              <Click
                className="button"
                onClick={() => openWebhookModal(
                  get(identity, 'originalIdentity._embedded.verification', {}),
                )}
              >
                <FiCode />
                <FormattedMessage id="verificationModal.webhookData" />
              </Click>

              {/* Delete Verification */}
              {!demoId && (
                <Click
                  className="button"
                  shadow={1}
                  onClick={() => handleDeleteIdentity(dispatch, history, id)}
                >
                  {isDeleting ? (
                    <Spinner />
                  ) : (
                    <DeleteIcon className="svg-black" />
                  )}
                  <FormattedMessage id="verificationModal.delete" />
                </Click>
              )}
              <HR width="0" />
              <StatesExplanation />
            </Items>
          </aside>
        </PageContentLayout>
      </Items>
    </Content>
  );
};

VerificationDetail.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  deletingIdentities: PropTypes.arrayOf(PropTypes.string).isRequired,
  identities: PropTypes.shape({
    instances: PropTypes.shape({}),
  }).isRequired,
};

export default connect((state) => ({
  identities: state.identities,
  countries: state.countries.countries,
  deletingIdentities: state.identities.deletingIdentities,
}))(VerificationDetail);
