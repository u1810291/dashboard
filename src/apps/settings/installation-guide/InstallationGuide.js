import React from 'react'
import { NavLink } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import Panel from 'src/components/panel'
import Support from 'src/fragments/account/support'
import Button from 'src/components/button'
import { showVideo } from 'src/fragments/account/installation-video'
import SettingsLayout from '../SettingsLayout'
import CSS from './InstallationGuide.scss'
import InstallationVideoImage from '../installation-video.svg'

export default class InstallationGuide extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>
          <FormattedMessage id="settings.installationGuide" />
        </h1>
        <SettingsLayout>
          <main>
            <Panel>
              <Panel.Body>
                <div className={CSS.panelContainer}>
                  <div className={CSS.leftBlock}>
                    <h2>
                      <FormattedMessage id="settings.installationGuide.video.title" />
                    </h2>
                    <p>
                      <FormattedMessage id="settings.installationGuide.video.description" />
                    </p>
                  </div>
                  <div className={CSS.rightBlock}>
                    <InstallationVideoImage
                      onClick={showVideo}
                      className={CSS.installationVideoImage}
                    />
                  </div>
                </div>
              </Panel.Body>
            </Panel>

            <Panel>
              <Panel.Body>
                <div className={CSS.panelContainer}>
                  <div className={CSS.leftBlock}>
                    <h2>
                      <FormattedMessage id="settings.installationGuide.configure.title" />
                    </h2>
                    <p>
                      <FormattedMessage id="settings.installationGuide.configure.description" />
                    </p>
                  </div>
                  <div className={CSS.rightBlock}>
                    <NavLink to="/">
                      <Button buttonStyle="primary">
                        <FormattedMessage id="settings.installationGuide.configure.button" />
                      </Button>
                    </NavLink>
                  </div>
                </div>
              </Panel.Body>
            </Panel>
            <Panel>
              <Panel.Body>
                <div className={CSS.panelContainer}>
                  <div className={CSS.leftBlock}>
                    <h2>
                      <FormattedMessage id="settings.installationGuide.install.title" />
                    </h2>
                    <p>
                      <FormattedMessage id="settings.installationGuide.install.description" />
                    </p>
                  </div>
                  <div className={CSS.rightBlock}>
                    <NavLink to="/settings/integration-code">
                      <Button buttonStyle="primary">
                        <FormattedMessage id="settings.installationGuide.install.button" />
                      </Button>
                    </NavLink>
                  </div>
                </div>
              </Panel.Body>
            </Panel>
            <Panel>
              <Panel.Body>
                <div className={CSS.panelContainer}>
                  <div className={CSS.leftBlock}>
                    <h2>
                      <FormattedMessage id="settings.installationGuide.receive.title" />
                    </h2>
                    <p>
                      <FormattedMessage id="settings.installationGuide.receive.description" />
                    </p>
                    <p className="documentation">
                      <FormattedMessage id="settings.installationGuide.receive.documentation" />
                    </p>
                    <p>
                      <a href="https://docs.getmati.com" target="_blank" rel="noopener noreferrer">
                        <FormattedMessage id="settings.installationGuide.receive.link" />
                      </a>
                    </p>
                  </div>
                  <div className={CSS.rightBlock}>
                    <NavLink to="/settings/applications">
                      <Button buttonStyle="primary" to="/settings">
                        <FormattedMessage id="settings.installationGuide.receive.button" />
                      </Button>
                    </NavLink>
                  </div>
                </div>
              </Panel.Body>
            </Panel>
          </main>
          <aside>
            <Support />
          </aside>
        </SettingsLayout>
      </React.Fragment>
    )
  }
}
