import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';

import Button from './Button.js';

export default function Navbar() {
  const { loginWithRedirect, logout } = useAuth0();

  return (
    <>
      <nav className="relative flex items-center justify-between py-1">
        <div className="container flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between">
            <Link
              className="text-md md:text-lg font-bold uppercase text-red-600"
              to="/"
            >
              Tracts
            </Link>
            <Button onClick={() => loginWithRedirect()}>Log In</Button>
            <Button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</Button>
          </div>
        </div>
      </nav>
    </>
  );
}
