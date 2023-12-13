import { useApiClient } from '../api/ApiClientContext';
import { AreaDto } from '../data/area';
import DataTable, { DataColumn } from '../table/DataTable';

export default function AreaList() {
  const api = useApiClient();
  const columns: DataColumn<AreaDto>[] = [
    { title: 'Name', value: (m) => m.name },
  ];

  return (
    <DataTable
      client={api.areas}
      path={'/areas'}
      columns={columns}
      summarize={(m) => m?.name ?? ''}
    />
  );
}
