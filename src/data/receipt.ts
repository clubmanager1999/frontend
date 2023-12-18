import { CreditorDto } from './creditor';

export interface ReceiptDto {
  id: number;
  name: string;
  validFrom: string;
  validTo: string;
  creditor?: CreditorDto;
}
