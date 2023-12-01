export interface ProfileDto {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  address: AddressDto;
  membership: MembershipDto;
}

export interface AddressDto {
  street: string;
  streetNumber: string;
  zip: string;
  city: string;
}

export interface MembershipDto {
  id: number;
  name: string;
  fee: number;
}
