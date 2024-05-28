'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LogoutButton from '../buttons/LogoutButton';
import Link from 'next/link';
import { faArrowLeft, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { usePathname } from 'next/navigation';
import { faFileLines } from '@fortawesome/free-regular-svg-icons';

const AppSidebar = () => {
  const path = usePathname();

  return (
    <nav className="inline-flex flex-col mt-8 gap-8">
      <Link
        href="/account"
        className={
          'flex gap-4 items-center ' +
          (path === '/account'
            ? 'text-blue-500'
            : 'text-gray-500  hover:text-gray-900 hover:scale-110')
        }
      >
        <FontAwesomeIcon
          fixedWidth={true}
          icon={faFileLines}
          className="w-6 h-6"
        />
        <span>My Page</span>
      </Link>

      <Link
        href="/analytics"
        className={
          'flex gap-4 items-center ' +
          (path === '/analytics'
            ? 'text-blue-500'
            : 'text-gray-500  hover:text-gray-900 hover:scale-110')
        }
      >
        <FontAwesomeIcon
          fixedWidth={true}
          icon={faChartLine}
          className="w-6 h-6"
        />
        <span>Analytics</span>
      </Link>

      <LogoutButton
        iconLeft
        className="flex gap-4 items-center text-gray-500 hover:text-gray-900 hover:scale-110"
        iconClasses="w-6 h-6"
      />

      <Link
        href="/"
        className="flex gap-2 items-center text-xs text-gray-500 border-t pt-4"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="w-3 h-3" />
        <span>Back to website</span>
      </Link>
    </nav>
  );
};

export default AppSidebar;
