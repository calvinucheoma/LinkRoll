'use client';

import {
  faCloudArrowUp,
  faImage,
  faPalette,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import RadioTogglers from '../formItems/RadioTogglers';
import Image from 'next/image';
import SubmitButton from '../buttons/SubmitButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { savePageSettings } from '@/actions/pageActions';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import Loading from '@/app/(app)/account/loading';
import SectionBox from '../layout/SectionBox';
import { upload } from '@/libs/upload';

const PageSettingsForm = ({ page, user }) => {
  const [displayName, setDisplayName] = useState(page?.displayName || '');
  const [location, setLocation] = useState(page?.location || '');
  const [bio, setBio] = useState(page?.bio || '');
  const [bgColor, setBgColor] = useState(page?.bgColor || '#000');
  const [bgImage, setBgImage] = useState(page?.bgImage || '');
  const [bgType, setBgType] = useState(page?.bgType || 'color');
  const [avatar, setAvatar] = useState(user?.image || '');

  // To fix hydration errors I was getting from nextjs because of the <input type='color'/> element
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <Loading />;

  // SAVE USER PROFILE SETTINGS FUNCTION
  const saveUserProfileSettings = async (formData) => {
    try {
      const result = await savePageSettings(formData);

      if (result === true) {
        toast.success('Details Updated!');
      }
    } catch (error) {
      console.error('Error: ', error);
      toast.error('An error occurred...');
    }

    // const promise = new Promise(async (resolve,reject) => {
    //   const result = await savePageSettings(formData);
    //   if (result) resolve()
    //     else reject()
    // })

    // await toast.promise(promise, {
    //   success: 'Saved!',
    //   loading: 'Saving...',
    //   error: 'Saving failed'
    // })
    // Does not work with server actions
  };

  // COVER IMAGE CHANGE FUNCTION
  const handleCoverImageChange = async (e) => {
    await upload(e, (link) => {
      setBgImage(link);
    });
  };

  // HANDLING AVATAR CHANGE FUNCTION
  const handleAvatarImageChange = async (e) => {
    await upload(e, (link) => {
      setAvatar(link);
    });
  };

  return (
    <>
      <SectionBox>
        <form action={saveUserProfileSettings}>
          <div
            className="-m-4 py-4 flex justify-center items-center bg-cover bg-center min-h-[300px]"
            style={
              bgType === 'color'
                ? { backgroundColor: bgColor }
                : { backgroundImage: `url(${bgImage})` }
            }
          >
            <div>
              <RadioTogglers
                options={[
                  { value: 'color', icon: faPalette, label: 'Color' },
                  { value: 'image', icon: faImage, label: 'Image' },
                ]}
                defaultChecked={page?.bgType || 'color'}
                onChange={(value) => setBgType(value)}
              />

              {bgType === 'color' && (
                <div className="bg-gray-200 shadow text-gray-700 p-2 mt-2">
                  <div className="flex justify-center gap-2">
                    <span>Background color: </span>
                    <input
                      type="color"
                      name="bgColor"
                      // defaultValue={page.bgColor}
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {bgType === 'image' && (
                <div className="flex justify-center">
                  <label
                    htmlFor="image"
                    className="bg-white shadow px-4 py-2 mt-2 cursor-pointer"
                  >
                    <input type="hidden" name="bgImage" value={bgImage} />
                    <input
                      type="file"
                      onChange={handleCoverImageChange}
                      className="hidden"
                      id="image"
                      accept="image/png, image/jpeg, image/jpg, .webp, .svg"
                    />
                    <div className="flex gap-2 items-center">
                      <FontAwesomeIcon
                        icon={faCloudArrowUp}
                        className="text-gray-700 w-5 h-5"
                      />
                      <span>Change Image</span>
                    </div>
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center -mb-12">
            <div className="relative -top-8 w-[128px] h-[128px]">
              <div className="h-full rounded-full border-4 border-white shadow shadow-black/50 overflow-hidden">
                <Image
                  src={avatar}
                  alt="User avatar"
                  width={128}
                  height={128}
                  objectFit="cover"
                  className="object-cover w-full h-full"
                />
              </div>

              <label
                htmlFor="avatarInput"
                className="absolute bottom-0 -right-2 bg-white p-2 rounded-full shadow shadow-black/50 aspect-square flex items-center cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={faCloudArrowUp}
                  size="xl"
                  className="w-7 h-7"
                />
                <input
                  type="file"
                  id="avatarInput"
                  className="hidden"
                  onChange={handleAvatarImageChange}
                  accept="image/png, image/jpeg, image/jpg, .webp, .svg"
                />
                <input type="hidden" name="avatar" value={avatar} />
              </label>
            </div>
          </div>

          <div className="p-0">
            <label className="input-label" htmlFor="nameInput">
              Display Name
            </label>

            <input
              type="text"
              placeholder="John Doe"
              className="text-input"
              id="nameInput"
              name="displayName"
              // defaultValue={page?.displayName}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />

            <label className="input-label" htmlFor="locationInput">
              Location
            </label>

            <input
              type="text"
              placeholder="somewhere on earth..."
              id="locationInput"
              name="location"
              // defaultValue={page?.location}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="text-input"
            />

            <label className="input-label" htmlFor="bioInput">
              Bio
            </label>

            <textarea
              name="bio"
              // defaultValue={page?.bio}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Your bio goes here..."
              id="bioInput"
            />

            <div className="max-w-[200px] ml-auto px-4 py-2">
              <SubmitButton usingFormAction>
                <FontAwesomeIcon icon={faSave} className="w-4 h-4" />
                <span>Save</span>
              </SubmitButton>
            </div>
          </div>
        </form>
      </SectionBox>
    </>
  );
};

export default PageSettingsForm;
