import { RouteObject } from 'react-router-dom';
import Home from './home/Home';
import CreditorDetail from './creditor/CreditorDetail';
import CreditorList from './creditor/CreditorList';
import DonorDetail from './donor/DonorDetail';
import DonorList from './donor/DonorList';
import MemberDetail from './member/MemberDetail';
import MemberList from './member/MemberList';
import MembershipDetail from './membership/MemberShipDetail';
import MembershipList from './membership/MembershipList';
import Profile from './profile/Profile';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import DomainIcon from '@mui/icons-material/Domain';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AreaList from './area/AreaList';
import AreaDetail from './area/AreaDetail';
import PurposeList from './purpose/PurposeList';
import PurposeDetail from './purpose/PurposeDetail';
import FlagIcon from '@mui/icons-material/Flag';
import MappingList from './mapping/MappingList';
import MappingDetail from './mapping/MappingDetail';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import ReceiptList from './receipt/ReceiptList';
import ReceiptDetail from './receipt/ReceiptDetail';

export const routes: Route[] = [
  {
    path: '/',
    element: <Home />,
    navEntry: { title: 'Home', icon: <HomeIcon /> },
  },
  {
    path: '/profile',
    element: <Profile />,
    navEntry: { title: 'Profile', icon: <SettingsIcon /> },
  },
  {
    path: '/memberships',
    element: <MembershipList />,
    navEntry: { title: 'Memberships', icon: <CardMembershipIcon /> },
  },
  {
    path: '/memberships/:id',
    element: <MembershipDetail />,
  },
  {
    path: '/members',
    element: <MemberList />,
    navEntry: { title: 'Members', icon: <PeopleIcon /> },
  },
  {
    path: '/members/:id',
    element: <MemberDetail />,
  },
  {
    path: '/creditors',
    element: <CreditorList />,
    navEntry: { title: 'Creditors', icon: <RequestQuoteIcon /> },
  },
  {
    path: '/creditors/:id',
    element: <CreditorDetail />,
  },
  {
    path: '/donors',
    element: <DonorList />,
    navEntry: { title: 'Donors', icon: <VolunteerActivismIcon /> },
  },
  {
    path: '/donors/:id',
    element: <DonorDetail />,
  },
  {
    path: '/areas',
    element: <AreaList />,
    navEntry: { title: 'Areas', icon: <DomainIcon /> },
  },
  {
    path: '/areas/:id',
    element: <AreaDetail />,
  },
  {
    path: '/purposes',
    element: <PurposeList />,
    navEntry: { title: 'Purposes', icon: <FlagIcon /> },
  },
  {
    path: '/purposes/:id',
    element: <PurposeDetail />,
  },
  {
    path: '/mappings',
    element: <MappingList />,
    navEntry: { title: 'Mappings', icon: <MoveDownIcon /> },
  },
  {
    path: '/mappings/:id',
    element: <MappingDetail />,
  },
  {
    path: '/receipts',
    element: <ReceiptList />,
    navEntry: { title: 'Receipts', icon: <ReceiptLongIcon /> },
  },
  {
    path: '/receipts/:id',
    element: <ReceiptDetail />,
  },
];

type Route = RouteObject & {
  navEntry?: NavEntry;
};

interface NavEntry {
  title: string;
  icon: JSX.Element;
}
