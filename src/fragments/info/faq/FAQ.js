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
        <Sections>
          {questions.map(({ summary, details = '' }, index) => (
            <React.Fragment key={summary}>
              <Details summary={summary}>
                <div dangerouslySetInnerHTML={{ __html: marked(details) }} />
              </Details>
              {index < questions.length - 1 && <hr />}
            </React.Fragment>
          ))}
        </Sections>
      </Panel.Body>
    </Panel>
  )
}
