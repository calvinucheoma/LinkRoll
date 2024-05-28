import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen bg-blue-100">
      <FontAwesomeIcon icon={faWarning} className="w-10 h-10 text-yellow-500" />
      <h4 className="text-2xl font-extrabold text-red-600">
        Sorry, this page does not exist
      </h4>
      <h6 className="text-gray-700 font-md font-medium">
        Try again using a valid URL
      </h6>
      <Link
        href="/"
        className="rounded-lg text-white text-center px-6 py-3 bg-blue-500"
      >
        Back To Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
