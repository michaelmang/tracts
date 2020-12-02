import React from "react";
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
      <nav className="relative flex items-center justify-between px-2 py-1">
        <div className="container flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between">
            <Link
              className="text-lg font-bold uppercase text-red-600"
              to="/"
            >
              Tracts
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
