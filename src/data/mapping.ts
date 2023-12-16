import { AreaDto } from './area';
import { PurposeDto } from './purpose';
import { ReferenceDto } from './reference';

export interface MappingDto {
  id: number;
  matcher: string;
  reference?: ReferenceDto;
  purpose?: PurposeDto;
  area?: AreaDto;
}
