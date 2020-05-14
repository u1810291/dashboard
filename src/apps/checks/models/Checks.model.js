import { FiMapPin, FiMail, FiCheckSquare } from 'react-icons/fi';
import { IpCheckControl } from '../components/IpCheckControl/IpCheckControl';
import { CheckControlButton } from '../components/CheckControlButton/CheckControlButton';

const DOCS_BASE_URL = 'https://docs.getmati.com/';

export const ChecksModel = [
  {
    id: 'ipCheck',
    title: 'Product.checks.ipCheck.title',
    text: 'Product.checks.ipCheck.text',
    badgeText: 'Product.checks.ipCheck.badgeText',
    startIcon: FiMapPin,
    endControlComponent: IpCheckControl,
  },
  {
    id: 'emailCheck',
    title: 'Product.checks.emailCheck.title',
    text: 'Product.checks.emailCheck.text',
    badgeText: 'Product.checks.emailCheck.badgeText',
    startIcon: FiMail,
    endControlComponent: CheckControlButton,
    endControlProps: {
      link: `${DOCS_BASE_URL}#post-optional-email-validation`,
      buttonText: 'Product.checks.emailCheck.buttonText',
    },
  },
  {
    id: 'complyAdvantage',
    title: 'Product.checks.complyAdvantage.title',
    text: 'Product.checks.complyAdvantage.text',
    badgeText: 'Product.checks.complyAdvantage.badgeText',
    startIcon: FiCheckSquare,
    endControlComponent: CheckControlButton,
    endControlProps: {
      link: `${DOCS_BASE_URL}#post-optional-comply-advantage-validation`,
      buttonText: 'Product.checks.complyAdvantage.buttonText',
    },
  },
];
