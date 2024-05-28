import HeroForm from '@/components/forms/HeroForm';
import { Page } from '@/models/Page';
import { authOptions } from '@/utils/auth';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';

export default async function Home() {
  const session = await getServerSession(authOptions);

  await mongoose.connect(process.env.MONGODB_URI);

  const page = await Page.findOne({ owner: session?.user?.email });

  return (
    <main>
      <section className="pt-32">
        <div className="max-w-md mb-8">
          <h1 className="text-6xl font-bold max-sm:text-4xl">
            Your one link
            <br /> for everything
          </h1>
          <h2 className="text-gray-500 text-xl mt-6 max-sm:text-[16px]">
            Share your links, social profiles, contact info and more on one page
          </h2>
        </div>

        <HeroForm user={session?.user} page={page} />
      </section>
    </main>
  );
}
