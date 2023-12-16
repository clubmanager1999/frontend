import { AddressDto } from './address';
import { MembershipDto } from './membership';

export interface ProfileDto {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  address: AddressDto;
  membership?: MembershipDto;
}
