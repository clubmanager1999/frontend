import { useApiClient } from '../api/ApiClientContext';
import { PurposeDto } from '../data/purpose';
import DataTable, { DataColumn } from '../table/DataTable';

export default function PurposeList() {
  const api = useApiClient();
  const columns: DataColumn<PurposeDto>[] = [
    { title: 'Name', value: (m) => m.name },
  ];

  return (
    <DataTable
      client={api.purposes}
      path={'/purposes'}
      columns={columns}
      summarize={(m) => m?.name ?? ''}
    />
  );
}
