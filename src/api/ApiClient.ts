import { AreaDto } from '../data/area';
import { CreditorDto } from '../data/creditor';
import { DonorDto } from '../data/donor';
import { MappingDto } from '../data/mapping';
import { MemberDto } from '../data/member';
import { MembershipDto } from '../data/membership';
import { PurposeDto } from '../data/purpose';
import { ReceiptDto } from '../data/receipt';
import { CrudClient } from './CrudClient';
import { ProfileClient } from './ProfileClient';

export interface ApiClient {
  profile: ProfileClient;
  members: CrudClient<MemberDto>;
  memberships: CrudClient<MembershipDto>;
  creditors: CrudClient<CreditorDto>;
  donors: CrudClient<DonorDto>;
  areas: CrudClient<AreaDto>;
  purposes: CrudClient<PurposeDto>;
  mappings: CrudClient<MappingDto>;
  receipts: CrudClient<ReceiptDto>;
}
