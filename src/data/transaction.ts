import { AreaDto } from './area';
import { PurposeDto } from './purpose';
import { ReceiptDto } from './receipt';
import { ReferenceDto } from './reference';

export interface TransactionDto {
  id: number;
  bookingDay: string;
  valueDay: string;
  name: string;
  description: string;
  amount: number;
  reference?: ReferenceDto;
  receipt?: ReceiptDto;
  purpose?: PurposeDto;
  area?: AreaDto;
}
