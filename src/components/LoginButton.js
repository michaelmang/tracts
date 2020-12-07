import { useAuth0 } from "@auth0/auth0-react";

import Button from './Button.js';

export default function LoginButton({ className }) {
  const { loginWithRedirect } = useAuth0();
  
  return (
    <Button className={`bg-red-700 text-white ${className}`} onClick={() => loginWithRedirect()}>
      Log In
    </Button>
  );
}