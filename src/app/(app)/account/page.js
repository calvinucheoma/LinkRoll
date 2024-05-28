import UsernameForm from '@/components/forms/UsernameForm';
import { authOptions } from '@/utils/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Page } from '@/models/Page';
import mongoose from 'mongoose';
import PageSettingsForm from '@/components/forms/PageSettingsForm';
import PageButtonsForm from '@/components/forms/PageButtonsForm';
import PageLinksForm from '@/components/forms/PageLinksForm';
import cloneDeep from 'clone-deep';

const AccountPage = async ({ searchParams }) => {
  // console.log(rest);
  const session = await getServerSession(authOptions);

  const desiredUsername = searchParams?.desiredUsername;

  if (!session) {
    redirect('/');
  }

  await mongoose.connect(process.env.MONGODB_URI);

  const page = await Page.findOne({ owner: session?.user?.email });

  // const leanPage = cloneDeep(page);

  // leanPage._id = leanPage._id.toString();
  // leanPage.createdAt = leanPage.createdAt.toString();

  if (page) {
    return (
      <>
        <PageSettingsForm page={page} user={session?.user} />
        <PageButtonsForm page={page} user={session?.user} />
        <PageLinksForm page={page} user={session?.user} />
        {/* 
          When trying to pass a non-plain object (an object with methods or special properties like MongoDB's ObjectId)
          from a Server Component to a Client Component in Next.js, we get a warning in the console. 
          Only plain objects (simple JSON-compatible data) should be passed as props.
          
          So when passing mongoose data to client component, always try to convert the data to string first.
          E.g convert the ObjectId to a string before passing it to the Client Component. 
          Convert 'createdAt' and 'updatedAt' (if they are Date objects) to strings.
        */}
      </>
    );
  }

  return (
    <div>
      <UsernameForm desiredUsername={desiredUsername} />
    </div>
  );
};

export default AccountPage;
