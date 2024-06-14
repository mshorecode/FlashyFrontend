/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
// import Link from 'next/link';
import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link,
} from '@nextui-org/react';
import UserMenu from './UserMenu';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ['Flashcards', 'Sets', 'Tags'];

  return (
    <Navbar position="static" onMenuOpenChange={setIsMenuOpen}>
      {/* Left Nav */}
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="sm:hidden" />
        <NavbarBrand>
          <Link color="foreground" href="/">
            <p className="font-bold text-xl text-inherit cursor-pointer">Memoria</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Middle Nav */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/flashcards">
            <p className="font-medium text-inherit cursor-pointer">Flashcards</p>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/sets">
            <p className="font-medium text-inherit cursor-pointer">Sets</p>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/tags">
            <p className="font-medium text-inherit cursor-pointer">Tags</p>
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Right Nav */}
      <NavbarContent as="div" justify="end">
        <UserMenu />
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={index === 2 ? 'primary' : index === menuItems.length - 1 ? 'danger' : 'foreground'}
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
