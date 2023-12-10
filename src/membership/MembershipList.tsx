import { useApiClient } from '../api/ApiClientContext';
import { MembershipDto } from '../data/membership';
import DataTable, { DataColumn } from '../table/DataTable';

export default function MembershipList() {
  const api = useApiClient();
  const columns: DataColumn<MembershipDto>[] = [
    { title: 'Name', value: (m) => m.name },
    { title: 'Fee', value: (m) => `${m.fee}€` },
  ];

  return (
    <DataTable
      client={api.memberships}
      path={'/memberships'}
      columns={columns}
      summarize={(m) => m?.name ?? ''}
    />
  );
}
