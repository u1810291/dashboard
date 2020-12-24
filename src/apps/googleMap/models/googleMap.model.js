import React from 'react';
import { FiFileText } from 'react-icons/fi';
import { localeNumber } from '../../../lib/number';

export const GOOGLE_MAP_REQUIRED_CONTAINER_ID = 'map';

export const InformationSourceTypes = {
  Documents: 'byDocuments',
  IpCheck: 'byIpCheck',
};

export const InformationSources = [
  {
    id: InformationSourceTypes.Documents,
    icon: <FiFileText />,
  },
  // TODO @grigorev add IpCheck
  // {
  //   id: InformationSourceTypes.IpCheck,
  //   icon: <FiMapPin />,
  // },
];

export function getGeoStatisticsLabel(percentage, count) {
  return `${percentage}%(${localeNumber(count)})`;
}

export function changeCountriesStructureForCountriesControl(countries) {
  const totalCount = countries.reduce((sum, country) => sum + country.count, 0);
  return countries
    .map((item) => ({
      code: item.documentCountry,
      percentage: Math.floor((item.count / totalCount) * 100),
      count: item.count,
    }));
}
