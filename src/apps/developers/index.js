import React from 'react'
import { connect } from 'react-redux'
import { Content } from 'src/components/application-box'
import Icons from 'src/components/icons'
import { Tabs, TabList, Tab, TabPanel } from 'src/components/tabs'
import classNames from 'classnames'
import Panel from 'src/components/panel'
import { Input } from 'src/components/inputs'
import Button from 'src/components/button'
import { withFormik, Field, Form } from 'formik'

export default
@connect(
  state => ({}),
  {}
)
@withFormik({})
class Developers extends React.Component {
  render() {
    return (
      <Content>
        <Panel caption="Webhook">
          <Panel.Header>
            <div>
              <Icons.Info />
            </div>
            <span>
              The weekhook is the way to receive the verification information on
              your backend. You will receive all user information: images of
              selfie & documents, document information (full name, document
              number, face match, and more), liveness score, global watchlist,
              etc... With this information on your backend, you will be able to
              fully automate your verifiation flow.
            </span>
          </Panel.Header>
          <Panel.Body>
            <Form>
              <Field type="url" name="webhookURL" component={Input} />

              <div>
                <Button type="submit" buttonStyle="primary">
                  Save changes
                </Button>
                <Button>Send sample Webhook</Button>
              </div>
            </Form>
          </Panel.Body>
        </Panel>
        <Panel caption="Developers integration sheet">
          <Panel.Body padded={false}>
            <Tabs className={classNames('tabs', 'stretched')}>
              <TabList>
                <Tab>
                  <Icons.Spy /> <span>Global Watchlist</span>
                </Tab>
                <Tab>
                  <Icons.FaceMatch /> <span>Face Match</span>
                </Tab>
                <Tab>
                  <Icons.TickFilled /> <span>Liveness</span>
                </Tab>
                <Tab>
                  <Icons.WarningTriangle /> <span>OCR data</span>
                </Tab>
              </TabList>
              <TabPanel />
              <TabPanel />
              <TabPanel />
              <TabPanel />
            </Tabs>
          </Panel.Body>
        </Panel>
        <Panel caption="How to fetch images">
          <Panel.Header>
            <div>
              <Icons.Info />
            </div>
            <span>
              Instruction here how to GET sample to fetch images in the webhook
              response
            </span>
          </Panel.Header>
          <Panel.Body />
        </Panel>
        <Panel caption="Mati verification link">
          <Panel.Header>
            <div>
              <Icons.Info />{' '}
            </div>
            <span>You can send this link to users to verify them.</span>
          </Panel.Header>
          <Panel.Body />
        </Panel>
      </Content>
    )
  }
}
