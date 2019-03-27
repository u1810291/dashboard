import React from 'react'
import { FormattedMessage } from 'react-intl'
import marked from 'marked'
import Panel from 'src/components/panel'
import Details from 'src/components/details'
import Sections from 'src/components/sections'

export default function FAQ({ questions = [] }) {
  return (
    <Panel>
      <Panel.Body>
        <h2>
          <FormattedMessage id="fragments.info.faq.title" />
        </h2>
        <Sections withBorder>
          {questions.map(({ summary, details = '' }) => (
            <Details summary={summary}>
              <div dangerouslySetInnerHTML={{ __html: marked(details) }} />
            </Details>
          ))}
        </Sections>
      </Panel.Body>
    </Panel>
  )
}
