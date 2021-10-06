import React from 'react';
import { appPalette } from 'apps/theme';
import { stringHash } from 'lib/string';
import { QATags } from 'models/QA.model';
import { ReactComponent as ImgAdmin } from 'apps/collaborators/assets/modal-role-admin.svg';
import { ReactComponent as ImgAgent } from 'apps/collaborators/assets/modal-role-agent.svg';

export enum CollaboratorInputTypes {
  FirstName = 'firstName',
  LastName = 'lastName',
  Role = 'role',
  Email = 'email',
}

export interface User {
  dateCreated: string;
  email: string;
  firstName: string;
  fullName: string;
  id: string;
  lastName: string;
  userType: string; // "merchant"
}

export enum CollaboratorRoles {
  ADMIN = 1,
  AGENT = 2,
  AUDITOR = 3,
}

export const WithAuditor = [CollaboratorRoles.ADMIN, CollaboratorRoles.AUDITOR];
export const WithAgent = [CollaboratorRoles.ADMIN, CollaboratorRoles.AGENT];

export interface Collaborator {
  role: CollaboratorRoles;
  user: User;
}

export interface CollaboratorOption {
  qaTag: string;
  label: string;
  value: CollaboratorRoles;
  description: string;
  icon: React.ReactNode;
}

export const CollaboratorOptions: CollaboratorOption[] = [
  {
    qaTag: QATags.Collaborators.Role.Admin,
    label: 'teamTable.roles.admin',
    value: CollaboratorRoles.ADMIN,
    description: 'teamTable.invite.form.roles.description.admin',
    icon: ImgAdmin,
  },
  {
    qaTag: QATags.Collaborators.Role.Agent,
    label: 'teamTable.roles.agent',
    value: CollaboratorRoles.AGENT,
    description: 'teamTable.invite.form.roles.description.agent',
    icon: ImgAgent,
  },
  // TODO: @vladislav.snimshchikov open when backend will be ready
/*    {
  qaTag: QATags.Collaborators.Role.Agent,
  label: intl.formatMessage({
    id: 'teamTable.invite.form.roles.auditor',
  }),
  value: 3,
  description: intl.formatMessage({
    id: 'teamTable.invite.form.roles.description.auditor',
  }),
  image: <ImgAuditor style={{ marginTop: -4 }} />,
}, */
];

export enum CollaboratorRolesNames{
  Admin = 'admin',
  Agent = 'agent',
  Auditor = 'auditor'
}

export const NamesByRoles: Record<CollaboratorRoles, CollaboratorRolesNames> = {
  [CollaboratorRoles.ADMIN]: CollaboratorRolesNames.Admin,
  [CollaboratorRoles.AGENT]: CollaboratorRolesNames.Agent,
  [CollaboratorRoles.AUDITOR]: CollaboratorRolesNames.Auditor,
};

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
