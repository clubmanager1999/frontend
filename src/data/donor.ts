import { AddressDto } from './address';

export interface DonorDto {
  id: number;
  firstName: string;
  lastName: string;
  address: AddressDto;
}
