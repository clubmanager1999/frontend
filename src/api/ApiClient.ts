import { CreditorDto } from '../data/creditor';
import { DonorDto } from '../data/donor';
import { MemberDto } from '../data/member';
import { MembershipDto } from '../data/membership';
import { CrudClient } from './CrudClient';
import { ProfileClient } from './ProfileClient';

export interface ApiClient {
  profile: ProfileClient;
  members: CrudClient<MemberDto>;
  memberships: CrudClient<MembershipDto>;
  creditors: CrudClient<CreditorDto>;
  donors: CrudClient<DonorDto>;
}
