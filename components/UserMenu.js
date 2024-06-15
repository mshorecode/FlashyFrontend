import React from 'react';
import { useRouter } from 'next/router';
import {
  Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger,
} from '@nextui-org/react';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';

export default function UserMenu() {
  const { user } = useAuth();
  const router = useRouter();

  const dashboard = () => {
    router.push('/dashboard');
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          src={user.imageUrl}
          as="button"
          className="transition-transform"
          name={user.firstName}
          color="success"
          size="md"
          alt="Picture of user"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="solid" color="primary">
        <DropdownItem key="profile" className="h-14 gap-1" textValue="Logged in user">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{user.email}</p>
        </DropdownItem>
        <DropdownItem key="dashboard" onClick={dashboard} textValue="Dashboard">Dashboard</DropdownItem>
        <DropdownItem key="logout" color="danger" onClick={signOut} textValue="Log Out">Log Out</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
