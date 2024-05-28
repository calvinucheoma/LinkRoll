import Link from 'next/link';
import { authOptions } from '@/utils/auth';
import { getServerSession } from 'next-auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import LogoutButton from './buttons/LogoutButton';

const Header = async () => {
  const session = await getServerSession(authOptions);
  // console.log(session);

  // FUNCTION FOR TRUNCATING A STRING
  function truncateString(str, maxLength) {
    if (str.length > maxLength) {
      return str.slice(0, maxLength - 3) + '...';
    }
    return str;
  }

  return (
    <header className="bg-white border-b py-4">
      <div className="max-w-4xl flex justify-between mx-auto px-6 max-sm:px-2 max-sm:justify-evenly">
        <div className="flex gap-6 items-center">
          <Link href="/" className="flex items-center gap-2 max-sm:gap-1">
            <FontAwesomeIcon
              icon={faLink}
              className="text-blue-500 w-5 h-5 max-sm:w-3 max-sm:h-3"
            />
            <span className="text-blue-500 font-bold max-sm:text-xs">
              LinkRoll
            </span>
          </Link>

          <nav className="flex gap-4 text-slate-500 text-sm items-center max-md:hidden">
            <Link href="#">About</Link>
            <Link href="#">Pricing</Link>
            <Link href="#">Contact</Link>
          </nav>
        </div>

        <nav className="flex gap-4 text-sm text-slate-500 items-center max-sm:gap-2">
          {!session && (
            <>
              <Link href="/login">Sign In</Link>
              <Link href="/login">Create Account</Link>
            </>
          )}
          {!!session && (
            <>
              <Link href="/account">
                Hello,{' '}
                <span className="text-blue-500 font-semibold max-sm:text-xs">
                  {truncateString(session?.user?.name, 11)}
                </span>
              </Link>
              <LogoutButton />
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
