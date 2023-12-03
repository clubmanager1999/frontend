import { useAuth } from 'react-oidc-context';
import { useEffect, useState } from 'react';
import { MemberDto } from '../data/member';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

export default function MemberList() {
  const auth = useAuth();
  const [members, setMembers] = useState(null as MemberDto[] | null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:8080/api/members', {
        headers: {
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });

      if (response.status == 200) {
        setMembers(await response.json());
      } else {
        if (response.status >= 400) {
          console.log(await response.text());
        }
      }
    }

    fetchData();
  }, [auth.user?.access_token]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Username</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Membership</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {members?.map((member) => (
            <TableRow
              key={member.firstName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{member.userName}</TableCell>
              <TableCell>
                {member.firstName} {member.lastName}
              </TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>
                {member.address.street} {member.address.streetNumber}{' '}
                {member.address.city}
              </TableCell>
              <TableCell>{member.membership.name}</TableCell>
              <TableCell>
                <NavLink to={`/members/${member.id}`}>
                  <Button variant="contained">Edit</Button>
                </NavLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
