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
];

type Route = RouteObject & {
  navEntry?: NavEntry;
};

interface NavEntry {
  title: string;
  icon: JSX.Element;
}
