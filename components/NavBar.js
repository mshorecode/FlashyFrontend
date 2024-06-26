/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link,
  Image,
} from '@nextui-org/react';
import UserMenu from './UserMenu';
import ThemeSwitcher from './ThemeSwitcher';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ['Flashcards', 'Sets', 'Tags'];

  return (
    <Navbar position="sticky" onMenuOpenChange={setIsMenuOpen} isBordered>
      <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="sm:hidden" />
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Link color="foreground" href="/dashboard">
            <Image src="/brain.png" className="w-10 h-10" />
            <p className="font-bold sm:block text-inherit cursor-pointer">MEMORIA</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>
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
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <ThemeSwitcher />
        <UserMenu />
      </NavbarContent>

      {/* TODO: figure out logic around setting appropriate href to each option */}
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
