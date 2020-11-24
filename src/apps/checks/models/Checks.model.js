import { FiMapPin, FiMail, FiCheckSquare, FiCheckCircle, FiUsers } from 'react-icons/fi';
import { MerchantTags } from '../../../models/Merchant.model';

export const DOCS_BASE_URL = 'https://docs.getmati.com/';

export const CheckTypes = {
  IpCheck: 'ipCheck',
  DuplicateUserDetection: 'duplicateUserDetection',
  Nom151Check: 'nom151Check',
  EmailCheck: 'emailCheck',
  ComplyAdvantage: 'complyAdvantage',
};

export const ChecksList = [
  {
    id: CheckTypes.IpCheck,
    title: 'Product.checks.ipCheck.title',
    text: 'Product.checks.ipCheck.text',
    badgeText: 'Product.checks.ipCheck.badgeText',
    startIcon: FiMapPin,
  },
  {
    id: CheckTypes.DuplicateUserDetection,
    title: 'Product.checks.duplicateUserDetection.title',
    text: 'Product.checks.duplicateUserDetection.text',
    badgeText: 'Product.checks.duplicateUserDetection.badgeText',
    startIcon: FiUsers,
    availableOnlyForMerchantTag: MerchantTags.CanUseDuplicateUserDetection,
  },
  {
    id: CheckTypes.Nom151Check,
    title: 'Product.checks.nom151Check.title',
    text: 'Product.checks.nom151Check.text',
    badgeText: 'Product.checks.nom151Check.badgeText',
    startIcon: FiCheckCircle,
  },
  {
    id: CheckTypes.EmailCheck,
    title: 'Product.checks.emailCheck.title',
    text: 'Product.checks.emailCheck.text',
    badgeText: 'Product.checks.emailCheck.badgeText',
    startIcon: FiMail,
  },
  {
    id: CheckTypes.ComplyAdvantage,
    title: 'Product.checks.complyAdvantage.title',
    text: 'Product.checks.complyAdvantage.text',
    badgeText: 'Product.checks.complyAdvantage.badgeText',
    startIcon: FiCheckSquare,
  },
];
