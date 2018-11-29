import React from 'react'
import './style.scss'
import Panel from 'src/components/panel'

export default () => {
  return (
    <React.Fragment>
      <Panel caption="Choose a plan">
        <Panel.Body className="pricing-plans" padded={false}>
          <div className="pricing-plans__headers">
            <div className="pricing-plan__header">Plans</div>
            <div className="pricing-plan__price">Pricing</div>
            <div className="pricing-plan__features">Features</div>
          </div>
          <div className="pricing-plan">
            <div className="pricing-plan__header">
              {' '}
              <div className="pricing-plan__name">Starter</div>
              <p className="pricing-plan__description">
                Startups with up to
                <br /> 1,000 verifications / month
              </p>
            </div>
            <div className="pricing-plan__price">
              <div className="pricing-plan__price-header">
                <strong>Free</strong>
              </div>
            </div>
            <div className="pricing-plan__features">
              <ul>
                <li>Mati button installation</li>
                <li>Configure your own button style</li>
                <li>
                  Receive users' documents via webhook OCR for all documents &
                  IDs
                </li>
                <li>Face recognition \ Facematch</li>
              </ul>
            </div>
          </div>
          <div className="pricing-plan">
            <div className="pricing-plan__header">
              <div className="pricing-plan__name">Safety Pro</div>
              <p className="pricing-plan__description">
                Companies with up to
                <br /> 5,000 verifications / month
              </p>
            </div>
            <div className="pricing-plan__price">
              <div className="">
                <div className="pricing-plan__price-header">
                  <strong>$0.99</strong>{' '}
                  <span className="text-muted">/ per user</span>
                </div>
                <p className="text-success">
                  Test 100 first verifications for free!
                </p>
              </div>
            </div>
            <div className="pricing-plan__features">
              {' '}
              <h3>Same as Starter and more:</h3>
              <ul>
                <li>
                  <strong>Global Watchlists</strong>
                  <p>
                    <span>
                      Make sure you are meeting the highest security threshold.
                    </span>{' '}
                    <a href="#">Read more</a>
                  </p>
                </li>
                <li>
                  <strong>Liveness check</strong>
                  <p>
                    <span>Are your users alive or just a printed picture?</span>{' '}
                    <a href="#">Find out more</a>
                  </p>
                </li>
                <li>
                  <strong>New Features</strong>
                  <p>
                    <span>
                      Direct line of communication to the product team.
                    </span>{' '}
                    <a href="#">Read more</a>
                  </p>
                </li>
                <li>
                  <b>Test for free!</b>
                  <p>First 100 verifications are free</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="pricing-plan">
            <div className="pricing-plan__header">
              <div className="pricing-plan__name">Enterprise</div>
              <div className="pricing-plan__description">
                Large companies with more than
                <br />
                5,000 verifications / month
              </div>
            </div>
            <div className="pricing-plan__price">
              <a href="mailto:eugeny.gordeev@gmail.com">Contact Sales</a>
            </div>
            <div className="pricing-plan__features">
              <h3>Same as Safety Pro and more:</h3>
              <ul>
                <li>Personal Settings</li>
                <li>Personal Pricing</li>
              </ul>
            </div>
          </div>
        </Panel.Body>
      </Panel>
    </React.Fragment>
  )
}
