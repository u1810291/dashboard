import React from 'react'
import { FormattedMessage } from 'react-intl'
import marked from 'marked'
import Panel from 'src/components/panel'
import Details from 'src/components/details'
import Items from 'src/components/items'

export default function FAQ({ questions = [] }) {
  return (
    <Panel>
      <Panel.Body>
        <Items flow="row">
          <h2>
            <FormattedMessage id="fragments.info.faq.title" />
          </h2>
          <Items flow="row">
            {questions.map(({ summary, details = '' }, index) => (
              <React.Fragment key={summary}>
                <Details summary={summary}>
                  <div dangerouslySetInnerHTML={{ __html: marked(details) }} />
                </Details>
                {index < questions.length - 1 && <hr />}
              </React.Fragment>
            ))}
          </Items>
        </Items>
      </Panel.Body>
    </Panel>
  )
}
