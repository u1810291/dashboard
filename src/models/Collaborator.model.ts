import { appPalette } from 'apps/theme';
import { stringHash } from 'lib/string';

export const CollaboratorRoles = {
  ADMIN: 1,
  AGENT: 2,
};

export const CollaboratorOptions = [
  {
    id: CollaboratorRoles.ADMIN,
    label: 'teamTable.roles.admin',
  },
  {
    id: CollaboratorRoles.AGENT,
    label: 'teamTable.roles.agent',
  },
];

export const CollaboratorsColors = {
  LightBlue: appPalette.lightblue,
  Red: appPalette.red,
  Orange: appPalette.orange,
  Yellow: appPalette.yellow,
  Green: appPalette.green,
};

export function getCollaboratorColorById(id) {
  if (!id) {
    return CollaboratorsColors.LightBlue;
  }

  const colorsList = Object.values(CollaboratorsColors);
  return colorsList[Math.abs(stringHash(id)) % colorsList.length];
}

export function findCollaboratorById(collaboratorList, id) {
  if (!collaboratorList || !id || !Array.isArray(collaboratorList)) {
    return null;
  }

  return collaboratorList.find((collaborator) => collaborator?.user?.id === id);
}
