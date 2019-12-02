import { MixPanelEvents } from 'lib/mixpanel/MixPanel.model';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import {
  H2,
  Text,
  Items,
  Button,
  Content,
} from 'components';
import { trackEvent } from 'lib/mixpanel/mixpanel';
import { createOverlay, closeOverlay } from 'components/overlay';
import Card from 'components/card';
import { hubspotForms } from 'lib/hubspot';
import CSS from './LegalServices.module.scss';

import LogoImages from './logo-images';
import { ReactComponent as Tail } from './tail.svg';


const makeArray = (size) => Array.from(Array(size), (_, i) => i + 1);

export default function LegalServices() {
  const intl = useIntl();
  const [isFormShowed, setIsFormShowed] = useState(false);

  window.hbspt.forms.create({
    portalId: '6251453',
    formId: hubspotForms.legalServices,
    target: '#hubspotForm',
  });

  const showHubSpotForm = () => {
    trackEvent(MixPanelEvents.LegalServicesContact);
    setIsFormShowed(true);
  };

  return (
    <Content fullwidth={false} className={CSS.content}>
      {isFormShowed
        && createOverlay(
          <Card>
            <H2>
              { intl.formatMessage({ id: 'Product.LegalService.form.title' })}
            </H2>
            <Text className={CSS.subtitle}>
              { intl.formatMessage({ id: 'Product.LegalService.form.subtitle' })}
            </Text>
            <div id="hubspotForm" />
          </Card>,
          { onClose: () => { closeOverlay(); setIsFormShowed(false); } },
        ) }
      <Items gap={2} flow="column" templateColumns="minmax(393px, 1fr) 1fr">
        <Items flow="rows" gap={1}>
          { makeArray(7).map((idx) => (
            <div key={idx} className={CSS.baloon}>
              <Tail className={CSS.tail} />
              <Text lineHeight={3} className={CSS.questions}>
                { intl.formatMessage({ id: `Product.LegalService.q${idx}` }) }
              </Text>
            </div>
          ))}
        </Items>

        <div>
          <H2 lineHeight={2}>
            { intl.formatMessage({ id: 'Product.LegalService.side.title' })}
          </H2>
          <div className={CSS.subtitle}>
            { intl.formatMessage({ id: 'Product.LegalService.side.subtitle' })}
          </div>
          <ul className={CSS.counterList}>
            { makeArray(5).map((idx) => (
              <li key={idx} className={CSS.listOfAnswers}>
                { intl.formatMessage({ id: `Product.LegalService.side.q${idx}` })}
              </li>
            ))}
          </ul>
          <div className={CSS.buttonContainer}>
            <Button
              buttonStyle="primary"
              className={CSS.button}
              onClick={() => showHubSpotForm()}
            >
              { intl.formatMessage({ id: 'Product.LegalService.side.button' })}
            </Button>
            <Text size={1.5} lineHeight={2} color="gray" className={CSS.subtitle}>
              { intl.formatMessage({ id: 'Product.LegalService.side.button.subtitle' })}
            </Text>
          </div>
        </div>
      </Items>
      <div className={CSS.logoLine}>
        { LogoImages.map(({ img, width }, i) => {
          const idx = i + 1;
          return (
            <img key={idx} src={img} width={width} alt="Logo" />
          );
        })}
      </div>
    </Content>
  );
}
