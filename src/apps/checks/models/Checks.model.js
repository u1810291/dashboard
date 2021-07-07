import { FiMail, FiCheckSquare, FiCheckCircle, FiUsers } from 'react-icons/fi';

export const CheckTypes = {
  PremiumAmlWatchlistsCheck: 'premiumAmlWatchlistsCheck',
  DuplicateUserDetection: 'duplicateUserDetection',
  Nom151Check: 'nom151Check',
  EmailCheck: 'emailCheck',
};

export const ChecksList = [
  {
    id: CheckTypes.DuplicateUserDetection,
    title: 'Product.checks.duplicateUserDetection.title',
    text: 'Product.checks.duplicateUserDetection.text',
    badgeText: 'Product.checks.duplicateUserDetection.badgeText',
    startIcon: FiUsers,
  },
  {
    id: CheckTypes.Nom151Check,
    title: 'Product.checks.nom151Check.title',
    text: 'Product.checks.nom151Check.text',
    badgeText: 'Product.checks.nom151Check.badgeText',
    startIcon: FiCheckCircle,
  },
  {
    id: CheckTypes.PremiumAmlWatchlistsCheck,
    title: 'Product.checks.premiumAmlWatchlistsCheck.title',
    text: 'Product.checks.premiumAmlWatchlistsCheck.text',
    badgeText: 'Product.checks.premiumAmlWatchlistsCheck.badgeText',
    startIcon: FiCheckSquare,
  },
  {
    id: CheckTypes.EmailCheck,
    title: 'Product.checks.emailCheck.title',
    text: 'Product.checks.emailCheck.text',
    badgeText: 'Product.checks.emailCheck.badgeText',
    startIcon: FiMail,
  },
];
