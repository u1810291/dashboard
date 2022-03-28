import { IdentityId } from 'models/Identity.model';
import { IdentityStatuses } from 'models/Status.model';
import { IWorkflowInVerification } from 'models/Workflow.model';

export type VerificationId = string;

export interface IVerificationMeritBlock<S = any, T = any> {
  settings: S;
  output: T;
}

export type MeritId = string;

type IVerificationBlocks<E extends MeritId, T extends IVerificationMeritBlock> = Record<E, T>;

export interface IVerificationWorkflow<E extends MeritId = MeritId, Block extends IVerificationMeritBlock = IVerificationMeritBlock> {
  id: VerificationId;
  identityId: IdentityId;
  verificationStatus: IdentityStatuses;
  createdAt: string;
  workflow: IWorkflowInVerification;
  blocks: IVerificationBlocks<E, Block>;
}

export const verificationWorkflowMock: IVerificationWorkflow = {
  id: '1',
  identityId: '2',
  verificationStatus: IdentityStatuses.verified,
  createdAt: '2022-02-17T08:38:51.014Z',
  workflow: {
    id: '22',
    name: 'WorkflowMock',
    version: 11,
  },
  blocks: {
    ip: {
      settings: {
        vpnDetection: true,
        geoRestriction: {
          restriction: 'INVISIBLE/VISIBLE,BLOCK',
          allowedCountries: [
            {
              country: 'en',
              regions: [
                'en',
              ],
            },
          ],
        },
      },
      output: {
        country: 'Mexico',
        countryCode: 'MX',
        region: 'Mexico City',
        regionCode: 'CMX',
        city: 'Mexico City',
        zip: '03020',
        latitude: 19.4326,
        longitude: -99.1332,
        safe: true,
      },
    },
  },
};

export type VerificationResponse = any;
