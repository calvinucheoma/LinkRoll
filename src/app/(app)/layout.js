import { Lato } from 'next/font/google';
import '../globals.css';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';
import { redirect } from 'next/navigation';
import Image from 'next/image';
// import { headers } from 'next/headers';
import AppSidebar from '@/components/layout/AppSidebar';
import { Toaster } from 'react-hot-toast';
import { Page } from '@/models/Page';
import mongoose from 'mongoose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faLink } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata = {
  title: 'LinkRoll',
  description:
    'Your one link for everything. Share your links, social profiles, contact info and more on one page',
};

export default async function AppLayout({ children }) {
  // const headersList = headers();

  // const url = headersList.get('next-url');

  // console.log(url);

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  await mongoose.connect(process.env.MONGODB_URI);

  const page = await Page.findOne({ owner: session?.user?.email });

  return (
    <html lang="en">
      <body className={lato.className}>
        <Toaster />
        <main className="md:flex min-h-screen">
          <label
            htmlFor="navCheckbox"
            className="p-4 rounded-md bg-white shadow inline-flex items-center gap-2 cursor-pointer md:hidden ml-8 mt-4"
          >
            <FontAwesomeIcon icon={faBars} className="w-4 h-4" />
            <span>Open Sidebar</span>
          </label>

          <input type="checkbox" id="navCheckbox" className="hidden" />

          <label
            htmlFor="navCheckbox"
            className="hidden backdrop fixed inset-0 bg-black/80 z-10"
          ></label>

          <aside className="bg-white w-48 shadow fixed md:static -left-48 top-0 bottom-0 z-20 transition-all p-4 pt-6">
            <div className="sticky top-0 pt-8">
              <div className="rounded-full overflow-hidden w-24 aspect-square mx-auto">
                <Image
                  src={session?.user?.image}
                  alt="avatar"
                  width={256}
                  height={256}
                  className="object-cover w-full h-full"
                />
              </div>

              {page && (
                <Link
                  href={`/${page.uri}`}
                  target="_blank"
                  className="text-center mt-4 flex gap-1 items-center justify-center cursor-pointer"
                >
                  <FontAwesomeIcon
                    size="lg"
                    icon={faLink}
                    className="text-sky-400 w-4 h-4"
                  />
                  <span className="text-xl text-gray-300">/</span>
                  <span className="text-sky-400">{page.uri}</span>
                </Link>
              )}

              <div className="text-center">
                <AppSidebar />
              </div>
            </div>
          </aside>

          <div className="grow">{children}</div>
        </main>
      </body>
    </html>
  );
}

/*
  The CSS class aspect-ratio: 1 / 1; sets the aspect ratio of an element. An aspect ratio is the proportional 
  relationship between the width and height of an element.

  In this specific case, aspect-ratio: 1 / 1; sets the aspect ratio of the element to be 1:1, meaning the width and 
  height of the element are equal. This creates a square element.

  This will render a square <div> element. If the width is set to, for example, 100 pixels, the height will 
  automatically adjust to also be 100 pixels, maintaining the 1:1 aspect ratio. Similarly, if the height is set, 
  the width will adjust accordingly.

  It's particularly useful when you want to maintain the aspect ratio of an element regardless of its content or 
  the device's viewport size.

*/
