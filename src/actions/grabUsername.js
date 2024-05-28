'use server';

import { Page } from '@/models/Page';
import { authOptions } from '@/utils/auth';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
// import { redirect } from 'next/navigation';

const grabUsername = async (formData) => {
  const username = formData.get('username');

  await mongoose.connect(process.env.MONGODB_URI);

  // Check if username already exists in the database
  const existingUsername = await Page.findOne({ uri: username });

  if (existingUsername) {
    // If username exists, redirect to another path

    // return redirect('/account?usernameTaken=1');

    // return JSON.stringify({ error: 'Username already exists' });

    return false;
  } else {
    // If username doesn't exist, create a new document

    const session = await getServerSession(authOptions);

    const email = session?.user?.email;

    const pageDoc = await Page.create({ uri: username, owner: email });

    return JSON.parse(JSON.stringify(pageDoc));

    // return redirect(`/account/${username}`);
  }
};

export default grabUsername;
