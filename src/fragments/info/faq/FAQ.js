import React from 'react'
import { FormattedMessage } from 'react-intl'
import marked from 'marked'
import Panel from 'src/components/panel'
import Details from 'src/components/details'

export default function FAQ({ questions = [] }) {
  return (
    <Panel>
      <Panel.Body>
        <h2>
          <FormattedMessage id="fragments.info.faq.title" />
        </h2>
        {questions.map(({ summary, details = '' }) => (
          <section className="mgi-section">
            <Details summary={summary}>
              <div dangerouslySetInnerHTML={{ __html: marked(details) }} />
            </Details>
          </section>
        ))}
      </Panel.Body>
    </Panel>
  )
}
