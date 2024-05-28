'use client';

import { signIn } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const HeroForm = ({ user, page }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (
      'localStorage' in window &&
      window.localStorage.getItem('desiredUsername')
    ) {
      const username = window.localStorage.getItem('desiredUsername');
      window.localStorage.removeItem('desiredUsername');
      redirect(`/account?desiredUsername=${username}`);
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    const form = e.target;

    const input = form.querySelector('input');

    const username = input.value;

    try {
      if (username.length > 0) {
        if (user) {
          if (page && page.uri) {
            router.push(`/account?created=${page.uri}`);
          } else {
            router.push(`/account?desiredUsername=${username}`);
          }
        } else {
          window.localStorage.setItem('desiredUsername', username);
          await signIn('google');
        }
        // await signIn('google', {
        //   redirect: true,
        //   callbackUrl: `/account?username=${username}`,
        // });
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      className="inline-flex items-center shadow-lg shadow-gray-700"
      onSubmit={handleSubmit}
    >
      <span className="bg-white py-4 pl-4 max-sm:py-2 max-sm:pl-2 max-sm:text-sm">
        linkroll.to/
      </span>
      <input
        type="text"
        className="py-4 outline-none max-sm:py-2 max-sm:text-sm max-sm:w-[50%]"
        placeholder="username"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-4 px-6 max-sm:py-2 max-sm:px-4 max-sm:text-sm whitespace-nowrap disabled:bg-blue-300 disabled:text-gray-200 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        Join for Free
      </button>
    </form>
  );
};

export default HeroForm;
