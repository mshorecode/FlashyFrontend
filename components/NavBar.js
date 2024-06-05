import React from 'react';
import Link from 'next/link';
import {
  Navbar,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Link passHref href="/">
        <Navbar.Brand>Flashy</Navbar.Brand>
      </Link>
      <Nav className="me-auto">
        <Link passHref href="/">
          <Nav.Link>Flashcards</Nav.Link>
        </Link>
        <Link passHref href="/">
          <Nav.Link>Sets</Nav.Link>
        </Link>
        <Button variant="danger" onClick={signOut}>
          Sign Out
        </Button>
      </Nav>
    </Navbar>
  );
}
