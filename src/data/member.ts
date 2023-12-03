import { AddressDto } from './address';
import { MembershipDto } from './membership';

export interface MemberDto {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  address: AddressDto;
  membership: MembershipDto;
}
