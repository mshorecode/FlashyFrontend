/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from '@nextui-org/react';
import { signOut } from '../utils/auth';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    'Flashcards',
    'Sets',
    'Tags',
  ];

  return (
    <Navbar position="static" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link color="foreground" href="/" passHref>
            <p className="font-bold text-xl text-inherit cursor-pointer">Memoria</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/flashcards" passHref>
            <p className="font-medium text-inherit cursor-pointer">Flashcards</p>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/sets" aria-current="page" passHref>
            <p className="font-medium text-inherit cursor-pointer">Sets</p>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/tags" passHref>
            <p className="font-medium text-inherit cursor-pointer">Tags</p>
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button onClick={signOut} variant="shadow" color="danger" className="">
            <p className="font-bold text-whte">Sign Out</p>
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? 'primary' : index === menuItems.length - 1 ? 'danger' : 'foreground'
              }
              className="w-full"
              href="/"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
