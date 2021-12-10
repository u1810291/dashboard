import React from 'react';
import { appPalette } from 'apps/theme';
import { stringHash } from 'lib/string';
import { QATags } from 'models/QA.model';
import { ReactComponent as ImgAdmin } from 'apps/collaborators/assets/modal-role-admin.svg';
import { ReactComponent as ImgAgent } from 'apps/collaborators/assets/modal-role-agent.svg';
import { ReactComponent as ImgAuditor } from 'apps/collaborators/assets/modal-role-view-only.svg';

export enum CollaboratorInputTypes {
  FirstName = 'firstName',
  LastName = 'lastName',
  Role = 'role',
  Email = 'email',
}

export type UserId = string;

export interface Blocked {
  blockedAt: Date;
  blockedByEmail: string;
  blockedUntil: Date;
  blockedBy: UserId;
}

// TODO: @ggrigorev remove deprecated
/**
 * @deprecated
 * used only in legacy collaborator endpoint
 * for the new features use IUser
 */
export interface User {
  blocked: Partial<Blocked>;
  dateCreated: string;
  email: string;
  firstName: string;
  fullName: string;
  id: UserId;
  lastName: string;
  userType: string; // "merchant"
}

export interface UserEmail {
  verified?: boolean;
  address: string;
}

// taken from BE
export interface IUser {
  _id: UserId;
  _email: UserEmail;
  // admin: boolean;
  blocked?: Partial<Blocked>;
  // dateCreated: Date;
  // dateUpdated: Date;
  // deleted: boolean;
  firstName?: string;
  // intercomHash?: string;
  lastName?: string;
  // locale: string;
  // location?: string;
  // password?: string;
  // roleInCompany?: string;
  // status: string;
  // timezone?: string;
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
  permissionsLabel: string;
  icon: React.ReactNode;
}

export const CollaboratorOptions: CollaboratorOption[] = [
  {
    qaTag: QATags.Collaborators.Role.Admin,
    label: 'teamTable.roles.admin',
    value: CollaboratorRoles.ADMIN,
    description: 'teamTable.invite.form.roles.description.admin',
    permissionsLabel: 'teamTable.roles.permissions.admin',
    icon: ImgAdmin,
  },
  {
    qaTag: QATags.Collaborators.Role.Agent,
    label: 'teamTable.roles.agent',
    value: CollaboratorRoles.AGENT,
    description: 'teamTable.invite.form.roles.description.agent',
    permissionsLabel: 'teamTable.roles.permissions.agent',
    icon: ImgAgent,
  },
  {
    qaTag: QATags.Collaborators.Role.Auditor,
    label: 'teamTable.invite.form.roles.auditor',
    value: CollaboratorRoles.AUDITOR,
    description: 'teamTable.invite.form.roles.description.auditor',
    permissionsLabel: 'teamTable.roles.permissions.auditor',
    icon: ImgAuditor,
  },
];

export function getCollaboratorOption(role: CollaboratorRoles): CollaboratorOption {
  return CollaboratorOptions.find((item) => item.value === role);
}

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
