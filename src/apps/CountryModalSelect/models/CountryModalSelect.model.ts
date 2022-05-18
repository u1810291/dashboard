import { Country, AllowedRegions } from 'models/Country.model';

export interface SelectedCountries {
  [country: string]: {
    [region: string]: boolean | undefined;
  };
}

interface TreeChildren {
  id: string;
  location: string;
  countryCode?: string;
}

export interface Tree {
  id: string;
  location: string;
  children: TreeChildren[];
  label: string;
}

export function* treeWalker(refresh: boolean, tree: Tree[]) {
  // render each item in the tree
  for (let k = 0; k < tree.length; k += 1) {
    const treeItem = tree[k];
    const stack = [];

    stack.push({
      nestingLevel: 0,
      node: treeItem,
    });

    while (stack.length !== 0) {
      const {
        node: { children = [], id, location, countryCode, label },
        nestingLevel,
      } = stack.pop();

      const isOpened = yield refresh
        ? {
          id,
          hasChildren: children.length !== 0,
          isOpenByDefault: false,
          location,
          countryCode: children.length === 0 ? (countryCode || children.find((region) => region.countryCode)?.countryCode) : null,
          label,
        }
        : id;

      if (children.length !== 0 && isOpened) {
        for (let i = children.length - 1; i >= 0; i -= 1) {
          stack.push({
            nestingLevel: nestingLevel + 1,
            node: children[i],
          });
        }
      }
    }
  }
}

export const regionsConverting = (value: boolean) => (regionAcc: { [key: string]: boolean }, region: string) => ({
  ...regionAcc,
  [region]: value,
});

export const markLocationChecked = (selectedCountries: SelectedCountries, allCountries: Country[], checked: boolean, location: string, countryCode?: string): SelectedCountries => {
  if (countryCode) {
    return {
      ...selectedCountries,
      [countryCode]: {
        ...allCountries.find((elm) => elm.id === countryCode).regions.reduce(regionsConverting(false), {}),
        ...selectedCountries[countryCode],
        [location]: checked,
      },
    };
  }

  const selectedCountryRegions = allCountries.find((country) => country.id === location).regions || [];
  return {
    ...selectedCountries,
    [location]: checked ? selectedCountryRegions.reduce(regionsConverting(true), {}) : null,
  };
};

export const getInitialSelectedCountries = (initialValues: AllowedRegions[] | null, countries: Country[]) => {
  if (initialValues === null) {
    return countries.reduce((memo, { id, regions }) => {
      memo[id] = regions.reduce(regionsConverting(true), {});
      return memo;
    }, {});
  }
  return initialValues.reduce((acc, { country, regions }) => ({
    ...acc,
    [country]: {
      ...countries.find((elm) => elm.id === country).regions.reduce(regionsConverting(false), {}),
      ...regions.reduce(regionsConverting(true), {}),
    },
  }), {});
};
