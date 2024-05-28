'use server';

import { Page } from '@/models/Page';
import { User } from '@/models/User';
import { authOptions } from '@/utils/auth';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';

export const savePageSettings = async (formData) => {
  await mongoose.connect(process.env.MONGODB_URI);

  const session = await getServerSession(authOptions);

  if (session) {
    const dataKeys = [
      'displayName',
      'location',
      'bio',
      'bgType',
      'bgColor',
      'bgImage',
    ];

    const dataToUpdate = {};

    for (const key of dataKeys) {
      if (formData.has(key)) {
        dataToUpdate[key] = formData.get(key);
      }
    }
    // const displayName = formData.get('displayName');

    // const location = formData.get('location');

    // const bio = formData.get('bio');

    // const bgType = formData.get('bgType');

    // const bgColor = formData.get('bgColor');

    // const bgImage = formData.get('bgImage');

    const page = await Page.findOne({ owner: session.user.email });

    if (!page) {
      return;
    }

    await Page.updateOne(
      { owner: session?.user?.email },
      // { displayName, location, bio, bgType, bgColor, bgImage }
      dataToUpdate
    );

    if (formData.has('avatar')) {
      const avatarLink = formData.get('avatar');
      await User.updateOne(
        {
          email: session.user?.email,
        },
        {
          image: avatarLink,
        }
      );
    }

    return true;
  }

  return false;
};

export const savePageButtons = async (formData) => {
  mongoose.connect(process.env.MONGODB_URI);

  const session = await getServerSession(authOptions);

  if (session) {
    const buttonsValues = {};

    // Iterate over each key/value pair in the FormData object
    formData.forEach((value, key) => {
      buttonsValues[key] = value;
    });

    /*
      The 'forEach' method of the 'FormData' object is indeed different from the 'forEach' method of an array.
      For arrays, the 'forEach' method takes a callback function that is called for each element in the array.
      For FormData objects, the 'forEach' method iterates over the key/value pairs contained in the FormData object
    */

    // console.log(buttonsValues);

    const dataToUpdate = { buttons: buttonsValues };

    await Page.updateOne({ owner: session?.user?.email }, dataToUpdate);

    return true;
  }

  return false;
};

export const savePageLinks = async (links) => {
  await mongoose.connect(process.env.MONGODB_URI);

  const session = await getServerSession(authOptions);

  if (session) {
    await Page.updateOne({ owner: session?.user?.email }, { links });
    return true;
  } else {
    return false;
  }
};
