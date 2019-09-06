import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import marked from 'marked';
import Card from 'components/card';
import Details from 'components/details';
import Items from 'components/items';

export default function FAQ({ questions = [] }) {
  return (
    <Card flow="row">
      <h2>
        <FormattedMessage id="fragments.info.faq.title" />
      </h2>
      <Items flow="row">
        {questions.map(({ summary, details = '' }, index) => (
          <React.Fragment key={summary}>
            <Details summary={summary}>
              {/* eslint-disable-next-line react/no-danger */}
              <div dangerouslySetInnerHTML={{ __html: marked(details) }} />
            </Details>
            {index < questions.length - 1 && <hr />}
          </React.Fragment>
        ))}
      </Items>
    </Card>
  );
}

FAQ.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({})),
};

FAQ.defaultProps = {
  questions: [],
};
