'use client';
import grabUsername from '@/actions/grabUsername';
import RightIcon from '@/components/icons/RightIcon';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SubmitButton from '../buttons/SubmitButton';

const UsernameForm = ({ desiredUsername }) => {
  const [taken, setTaken] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    const formData = new FormData(event.target);

    try {
      const result = await grabUsername(formData);

      // console.log(result);

      // recall that we returned 'false' in our server action function if the username is taken
      setTaken(result === false);

      if (result && result.uri) {
        // router.push(`/account/${result.uri}`);
        router.push(`/account?created=${result.uri}`);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-4xl font-bold text-center mb-2">
        Grab your username
      </h1>

      <p className="text-center mb-6 text-gray-500">Choose your username</p>

      <div className="max-w-xs mx-auto">
        <input
          type="text"
          placeholder="username"
          className="block p-2 mx-auto border w-full mb-2 text-center"
          defaultValue={desiredUsername}
          name="username"
        />

        {taken && (
          <div className="bg-red-200 border border-red-500 p-2 text-red-700 mb-2 text-center rounded-lg">
            This username is already taken!
          </div>
        )}

        <SubmitButton isLoading={isLoading}>
          <span>Claim your username</span>
          <RightIcon />
        </SubmitButton>
      </div>
    </form>
  );
};

export default UsernameForm;
