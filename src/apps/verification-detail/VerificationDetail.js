import { Content } from 'components/application-box';
import Card from 'components/card';
import Items from 'components/items';
import PageContentLayout from 'components/page-content-layout';
import DocumentStep from 'fragments/verifications/document-step';
import { LivenessStep } from 'fragments/verifications/liveness-step';
import MatiChecks from 'fragments/verifications/mati-checks';
import VerificationMetadata from 'fragments/verifications/verification-metadata';
import { formatISODate, ifDateFormat } from 'lib/string';
import { get } from 'lodash';
import { getIdentityExtras } from 'models/Identity.model';
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCountries } from 'state/countries/countries.actions';
import { selectCountriesList } from 'state/countries/countries.selectors';
import { getDemoVerification, getIdentityWithNestedData, patchDocument } from 'state/identities/identities.actions';
import { selectIdentity } from 'state/identities/identities.selectors';
import { Header } from './Header';
import { VerificationSidePanel } from './VerificationSidePanel';

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

const findDocumentId = (type, sources) => get(sources.find((doc) => doc.type === type), 'id');

export function VerificationDetail() {
  const dispatch = useDispatch();
  const intl = useIntl();
  const { id, demoId } = useParams();
  const identityId = id === 'demo' ? demoId : id;
  const identity = useSelector(selectIdentity(identityId));
  const countriesList = useSelector(selectCountriesList);
  const verification = get(identity, '_embedded.verification');

  useEffect(() => {
    dispatch(getCountries());
    if (id === 'demo' && demoId) {
      dispatch(getDemoVerification(demoId));
    } else {
      dispatch(getIdentityWithNestedData(id));
    }
  }, [dispatch, id, demoId]);

  if (!identity || !(verification)) {
    return null;
  }

  const documentsSources = get(identity, '_embedded.documents');
  const extras = getIdentityExtras(identity);

  return (
    <Content>
      <Items flow="row" gap={2.6}>
        <h1>
          <span className="text-light">
            {intl.formatMessage({ id: 'identity.title' }, { id: extras.shortId })}
          </span>
        </h1>
        <PageContentLayout navigation={false}>
          <main>
            <Items flow="row">
              <Card flow="column" templateColumns="5fr auto">
                <Header fullName={extras.fullName} dateCreated={extras.dateCreated} />
              </Card>

              {/* Liveness */}
              {extras.liveness && <LivenessStep liveness={extras.liveness} />}

              {/* Documents */}
              {verification.documents.map((doc) => (
                <DocumentStep
                  document={doc}
                  source={documentsSources}
                  countries={countriesList}
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
            <VerificationSidePanel identity={identity} />
          </aside>
        </PageContentLayout>
      </Items>
    </Content>
  );
}
