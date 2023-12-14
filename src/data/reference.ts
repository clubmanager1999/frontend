import { CreditorDto } from './creditor';
import { DonorDto } from './donor';
import { MemberDto } from './member';

export type ReferenceDto =
  | CreditorReferenceDto
  | DonorReferenceDto
  | MemberReferenceDto;

export interface CreditorReferenceDto {
  type: 'creditor';
  creditor: CreditorDto;
}

export interface DonorReferenceDto {
  type: 'donor';
  donor: DonorDto;
}

export interface MemberReferenceDto {
  type: 'member';
  member: MemberDto;
}
