import { useFormStatus } from 'react-dom';

const SubmitButton = ({ children, isLoading, usingFormAction }) => {
  //   const { pending } = useFormStatus();
  // works when you're using 'action' in the form and does not work when called before a form is rendered,
  // but rather called inside a form through another component in the form

  const { pending } = useFormStatus();

  return usingFormAction ? (
    <button
      className="bg-blue-500 text-white py-2 px-4 mx-auto w-full flex gap-2 items-center justify-center rounded-lg disabled:bg-blue-300 disabled:text-gray-200 disabled:cursor-not-allowed"
      type="submit"
      disabled={pending}
    >
      {pending ? 'Loading' : children}
    </button>
  ) : (
    <button
      className="bg-blue-500 text-white py-2 px-4 mx-auto w-full flex gap-2 items-center justify-center rounded-lg disabled:bg-blue-300 disabled:text-gray-200 disabled:cursor-not-allowed"
      type="submit"
      disabled={isLoading}
    >
      {isLoading ? 'Loading' : children}
    </button>
  );
};

export default SubmitButton;
