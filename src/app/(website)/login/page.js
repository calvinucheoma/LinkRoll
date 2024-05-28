import LoginWithGoogle from '@/components/buttons/LoginWithGoogle';

import { authOptions } from '@/utils/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const LoginPage = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    // route the user to the home page so the user can not access the login page if he/she is already logged in
    redirect('/');
  }

  return (
    <div>
      <div className="p-4 max-w-xs mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">Sign In</h1>
        <p className="text-center mb-6 text-gray-500">
          Sign in to your account using one of the methods below
        </p>
        <LoginWithGoogle />
      </div>
    </div>
  );
};

export default LoginPage;
