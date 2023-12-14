import { useApiClient } from '../api/ApiClientContext';
import { MappingDto } from '../data/mapping';
import { ReferenceDto } from '../data/reference';
import DataTable, { DataColumn } from '../table/DataTable';

export default function MappingList() {
  const api = useApiClient();
  const columns: DataColumn<MappingDto>[] = [
    { title: 'Matcher', value: (m) => m.matcher },
    { title: 'Reference', value: (m) => referenceSummary(m.reference) },
    { title: 'Area', value: (m) => m.area?.name ?? '' },
    { title: 'Purpose', value: (m) => m.purpose?.name ?? '' },
  ];

  function referenceSummary(reference: ReferenceDto) {
    switch (reference.type) {
      case 'creditor': {
        return reference.creditor.name;
      }
      case 'donor': {
        return `${reference.donor.firstName} ${reference.donor.lastName}`;
      }
      case 'member': {
        return `${reference.member.firstName} ${reference.member.lastName}`;
      }
    }
  }

  return (
    <DataTable
      client={api.mappings}
      path={'/mappings'}
      columns={columns}
      summarize={(m) => m?.matcher ?? ''}
    />
  );
}
