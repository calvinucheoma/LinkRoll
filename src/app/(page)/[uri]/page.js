import { Event } from '@/models/Event';
import { Page } from '@/models/Page';
import { User } from '@/models/User';
import {
  faDiscord,
  faFacebook,
  faGithub,
  faInstagram,
  faTelegram,
  faTiktok,
  faWhatsapp,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faLink,
  faLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mongoose from 'mongoose';
import Image from 'next/image';
import Link from 'next/link';
import NotFoundPage from './not-found';

const buttonIcons = {
  email: faEnvelope,
  mobile: faPhone,
  instagram: faInstagram,
  facebook: faFacebook,
  discord: faDiscord,
  tiktok: faTiktok,
  youtube: faYoutube,
  whatsapp: faWhatsapp,
  github: faGithub,
  telegram: faTelegram,
};

// FUNCTION FOR TRUNCATING A STRING
function truncateString(str, maxLength) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength - 3) + '...';
  }
  return str;
}

function buttonLink(key, value) {
  if (key === 'mobile') {
    return 'tel:' + value;
  }
  if (key === 'email') {
    return 'mailto:' + value;
  }
  return value;
}

/*

To handle spaces in URLs properly, you need to decode the URI component when retrieving the username from the 
URL parameters. The issue arises because URLs encode spaces as `%20`, so when querying the database, you need to 
decode the encoded URI back to its original form. We do this using the 'decodeURIComponent' which is a standard 
JavaScript function that is available by default in both Node.js and browser environments. It is used to decode a 
URI component that was previously created by encodeURIComponent or by a URL encoding process.

*/

const UserPage = async ({ params }) => {
  const uri = decodeURIComponent(params.uri);

  await mongoose.connect(process.env.MONGODB_URI);

  const page = await Page.findOne({ uri });

  if (!page) {
    return <NotFoundPage />;
  }

  const user = await User.findOne({ email: page?.owner });

  await Event.create({ uri: uri, page: uri, type: 'view' });

  return (
    <div className="bg-blue-950 text-white min-h-screen">
      <div
        className="bg-cover bg-center h-36 bg-gray-400"
        style={
          page?.bgType === 'color'
            ? { backgroundColor: page?.bgColor }
            : { backgroundImage: `url(${page?.bgImage})` }
        }
      ></div>

      <div className="rounded-full w-36 h-36 aspect-square mx-auto relative -top-16 border-4 border-white shadow shadow-black/50 -mb-12">
        <Image
          src={user?.image}
          alt="user avatar"
          width={256}
          height={256}
          className="object-cover w-full h-full rounded-full"
        />
      </div>

      <h2 className="text-2xl text-center mb-1">{page?.displayName}</h2>
      <h3 className="text-md flex gap-2 items-center justify-center text-white/70">
        <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4" />{' '}
        <span>{page?.location}</span>{' '}
      </h3>
      <div className="max-w-xs mx-auto my-2 text-center">
        <p>{page?.bio}</p>
      </div>

      <div className="flex gap-2 justify-center pb-4 mt-4">
        {page?.buttons &&
          Object.keys(page.buttons).map((buttonKey, index) => (
            <Link
              key={index}
              href={buttonLink(buttonKey, page.buttons[buttonKey])}
              className="rounded-full border bg-white text-blue-950 p-2 flex items-center justify-center"
            >
              <FontAwesomeIcon
                icon={buttonIcons[buttonKey]}
                className="w-5 h-5"
              />
            </Link>
          ))}
      </div>

      <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-6 py-4 px-8">
        {page?.links?.map((link) => (
          <Link
            ping={`/api/click?url=${encodeURI(link.url)}&page=${page.uri}`}
            // ping attribute is used to notify when someone clicks a link before redirecting the user to that link
            target="_blank"
            href={link.url}
            key={link.key}
            className="bg-indigo-800 p-2 flex"
          >
            <div className="relative -left-4 overflow-hidden">
              <div className="w-16 h-16 aspect-square flex items-center justify-center bg-blue-700">
                {link.icon ? (
                  <Image
                    src={link.icon}
                    alt="icon"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FontAwesomeIcon icon={faLink} className="w-8 h-8" />
                )}
              </div>
            </div>

            <div className="flex items-center justify-center shrink grow-0">
              <div>
                <h3>{link.title}</h3>
                <p className="text-white/50 h-6 overflow-hidden">
                  {truncateString(link.subtitle, 30)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
