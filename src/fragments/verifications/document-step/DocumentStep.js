/** @jsx jsx */

import PropTypes from 'prop-types';
import { css, jsx } from '@emotion/core';
import { FormattedMessage } from 'react-intl';
import { compact } from 'lodash';

import Card from 'components/card';
import Items from 'components/items';
import classNames from 'classnames';
import Text, { HR } from 'components/text';

import SecurityCheckCollection from './security-check-collection';
import DocumentReadingStep from './document-reading-step';
import ZoomableImage from './zoomable-image';
import MexicanCurpValidationStep from './mexican-curp-validation-step';

export default function DocumentStep({
  document: { steps = [], country, type, region, photos = [], isEditable = true },
  source,
  countries,
  onSubmit,
}) {
  const documentReadingStep = steps.find((step) => step.id === 'document-reading');
  const documentReadingSource = source.find((item) => item.type === type);
  const curpValidationStep = steps.find((step) => step.id === 'mexican-curp-validation');
  const securityCheckSteps = steps.filter((step) => [
    'template-matching',
    'alteration-detection',
    'watchlists',
    'facematch',
  ].includes(step.id),
  );
  const onReading = documentReadingStep.status < 200;
  const countryName = (countries.find(({ code }) => code === country) || {}).name || country;

  const DocumentStepTitle = () => (
    <Text size={4.5} weight={4}>
      <FormattedMessage
        id="DocumentStep.title"
        values={{
          document: (
            <FormattedMessage id={`flow.documentTypeStep.${type}`} />
          ),
          country: compact([countryName, region]).join(', '),
        }}
      />
    </Text>
  );

  if (documentReadingSource.demo === true) {
    isEditable = false;
  }

  return (
    <Card padding={4}>
      <DocumentStepTitle />
      <HR />

      <Card padding={0} shadow={0} borderRadius={0} templateColumns="5fr 3fr" justify-content="right">
        <span>
          <Items flow="row">
            <h2 className={classNames({ loading: onReading })}>
              <FormattedMessage id={onReading ? 'DocumentStep.Data.titleReading'
                : 'DocumentStep.Data.title'}
              />
            </h2>
            { !onReading
              && (
              <div>
                {documentReadingStep && (
                <DocumentReadingStep
                  step={documentReadingStep}
                  source={documentReadingSource}
                  isEditable={isEditable}
                  onSubmit={onSubmit}
                />
                )}
                <br />
                {curpValidationStep && (
                <MexicanCurpValidationStep step={curpValidationStep} />
                )}
              </div>
              )}
          </Items>
        </span>

        {/* Document Images */}
        <Items gap={1} flow="row" justifyContent="right">
          {photos.map((photo) => (
            <div key={photo} css={css`max-width: 300px;`}>
              <ZoomableImage src={photo} alt={type} />
            </div>
          ))}
        </Items>
      </Card>

      { securityCheckSteps && (
        <div>
          <HR />
          <h2>
            <Text lineHeight="3">
              <FormattedMessage id="DocumentStep.Checks.title" />
            </Text>
          </h2>
          <SecurityCheckCollection steps={securityCheckSteps} />
        </div>
      )}
    </Card>
  );
}

DocumentStep.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  document: PropTypes.shape().isRequired,
  onSubmit: PropTypes.func.isRequired,
  source: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
