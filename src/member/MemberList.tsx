import { useApiClient } from '../api/ApiClientContext';
import { MemberDto } from '../data/member';
import DataTable, { DataColumn } from '../table/DataTable';

export default function MemberList() {
  const api = useApiClient();
  const columns: DataColumn<MemberDto>[] = [
    { title: 'Username', value: (m) => m.userName },
    { title: 'Name', value: (m) => `${m.firstName} ${m.lastName}` },
    { title: 'Email', value: (m) => m.email },
    {
      title: 'Address',
      value: (m) =>
        `${m.address.street} ${m.address.streetNumber} ${m.address.city}`,
    },
    { title: 'Membership', value: (m) => m.membership.name },
  ];

  return (
    <DataTable
      client={api.members}
      path={'/members'}
      columns={columns}
      summarize={(m) => `${m?.firstName} ${m?.lastName}`}
    />
  );
}
