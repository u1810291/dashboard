import { Country } from 'models/Country.model';
import { AllowedRegions } from 'apps/IpCheck/models/IpCheck.model';

export interface SelectedCountries {
  [country: string]: {
      [region: string]: boolean;
  };
}

interface TreeChildren {
  id: string;
  name: string;
  countryCode?: string;
}

export interface Tree {
  id: string;
  name: string;
  children: TreeChildren[];
}

export function* treeWalker(refresh: boolean, tree: Tree[]) {
  // render each item in the tree
  for (let k = 0; k < tree.length; k += 1) {
    const treeItem = tree[k];
    const stack = [];

    // ignore nodes without children
    if (treeItem.children.length !== 0) {
      stack.push({
        nestingLevel: 0,
        node: treeItem,
      });
    }

    while (stack.length !== 0) {
      const {
        node: { children = [], id, name, countryCode },
        nestingLevel,
      } = stack.pop();

      const isOpened = yield refresh
        ? {
          id,
          isLeaf: children.length === 0,
          isOpenByDefault: false,
          name,
          nestingLevel,
          countryCode: children.length === 0 ? (countryCode || children.find((region) => region.countryCode)?.countryCode) : null,
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

export const getInitialSelectedCountries = (initialValues: AllowedRegions[], countries: Country[]) => initialValues.reduce((acc, { country, regions }) => ({
  ...acc,
  [country]: { ...countries.find((elm) => elm.id === country).regions.reduce(regionsConverting(false), {}), ...regions.reduce(regionsConverting(true), {}) },
}), {});
