'use client';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut } from 'next-auth/react';

const LogoutButton = ({
  className = 'flex gap-2 items-center border p-2 px-4 shadow text-white bg-red-500 rounded-md max-sm:text-xs',
  iconLeft = false,
  iconClasses = '',
}) => {
  return (
    <button onClick={() => signOut()} className={className}>
      {iconLeft && (
        <FontAwesomeIcon icon={faRightFromBracket} className={iconClasses} />
      )}
      <span>Logout</span>
      {!iconLeft && (
        <FontAwesomeIcon icon={faRightFromBracket} className={iconClasses} />
      )}
    </button>
  );
};

export default LogoutButton;
