import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { WindupChildren } from 'windups';

import LoginButton from './LoginButton.js';

export default function Navbar() {
  const { isAuthenticated, isLoading, logout, user } = useAuth0();
  const [isExpanded, setExpanded] = useState(false);

  const updateExpanded = () => {
    setExpanded(!isExpanded);
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <>
      <nav className="w-full flex items-center justify-between py-1">
        <Link
          className="text-base md:text-lg font-bold uppercase text-red-600"
          to="/"
        >
          Tracts
        </Link>
        <div className="flex items-center" onClick={updateExpanded}>
          {!isLoading && !isAuthenticated && <LoginButton />}
          {!isLoading && isAuthenticated && (
            <div className="flex flex-col text-white items-end">
              <div className="flex items-center cursor-pointer">
                <WindupChildren>
                  <div className="text-xs md:text-base">Hi, {user.name}</div>
                  <FontAwesomeIcon className="ml-2" color="white" icon={isExpanded ? faChevronUp : faChevronDown} />
                </WindupChildren>
              </div>
              {isExpanded && (
                <div className="flex flex-col mt-2">
                  <WindupChildren>
                    <div className="text-xs md:text-base pr-5 animate-pulse cursor-pointer" onClick={handleLogout}>Log Out</div>
                  </WindupChildren>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
