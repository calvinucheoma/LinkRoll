import Chart from '@/components/Chart';
import SectionBox from '@/components/layout/SectionBox';
import { Event } from '@/models/Event';
import { Page } from '@/models/Page';
import { authOptions } from '@/utils/auth';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isToday } from 'date-fns';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const AnalyticsPage = async () => {
  await mongoose.connect(process.env.MONGODB_URI);

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  const page = await Page.findOne({ owner: session?.user?.email });

  if (!page) {
    redirect('/account');
  }

  // const viewsCount = await Event.countDocuments({
  //   type: 'view',
  //   uri: page?.uri,
  // });

  // const clicksCount = await Event.countDocuments({
  //   type: 'click',
  //   uri: page?.links?.map((link) => link.url),
  // });

  const views = await Event.find({
    page: page.uri,
    type: 'view',
  });

  if (!views) {
    redirect('/account');
  }

  const groupedViews = views
    ? await Event.aggregate([
        {
          $match: {
            type: 'view',
            uri: page?.uri,
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                date: '$createdAt',
                format: '%Y-%m-%d',
              },
            },
            count: {
              $count: {},
            },
          },
        },
        { $sort: { _id: 1 } },
      ])
    : []; // we use minus '-' sign to indicate descending order

  const clicks = await Event.find({
    page: page.uri,
    type: 'click',
  });

  return (
    <div>
      <SectionBox>
        <h2 className="text-xl mb-6 text-center">Views</h2>
        {/* Views: {viewsCount} <br />
        Clicks: {clicksCount} */}
        {/* {groupedViews.map(({ _id: date, count }, index) => (
          <div key={index}>
            {date}: {count}
          </div>
        ))} */}
        {views ? (
          <Chart
            data={groupedViews?.map((object) => ({
              date: object._id,
              views: object.count,
            }))}
          />
        ) : (
          <h3 className="text-2xl text-center h-full flex items-center justify-center">
            You do not have any views yet...
          </h3>
        )}
      </SectionBox>

      <SectionBox>
        <h2 className="text-xl mb-6 text-center">Clicks</h2>

        {page?.links?.map((link) => (
          <div
            key={link.key}
            className="md:flex gap-4 items-center border-t border-gray-200 py-4"
          >
            <div className="text-blue-500 pl-0 md:pl-4">
              <FontAwesomeIcon icon={faLink} className="w-5 h-5" />
            </div>

            <div className="grow w-full md:w-[60%]">
              <h3>{link.title || 'No title'}</h3>
              <p className="text-gray-700 text-sm">
                {link.subtitle || 'No description'}
              </p>
              <Link
                href={link.url}
                target="_blank"
                className="text-xs text-blue-400"
              >
                {link.url}
              </Link>
            </div>

            <div className="text-center">
              <div className="border-2 border-rounded-md p-2 mt-1 md:mt-0">
                <div className="text-3xl">
                  {
                    clicks?.filter(
                      (click) =>
                        click.uri === link.url && isToday(click.createdAt)
                    ).length
                  }
                </div>

                <div className="text-gray-400 text-xs uppercase font-bold ">
                  Clicks Today
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="border-2 border-rounded-md p-2 mt-1 md:mt-0">
                <div className="text-3xl">
                  {clicks?.filter((click) => click.uri === link.url).length}
                </div>

                <div className="text-gray-400 text-xs uppercase font-bold ">
                  Total Clicks
                </div>
              </div>
            </div>
          </div>
        ))}
      </SectionBox>
    </div>
  );
};

export default AnalyticsPage;
