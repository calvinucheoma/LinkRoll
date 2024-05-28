'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SectionBox from '../layout/SectionBox';
import {
  faCloudArrowUp,
  faGripLines,
  faLink,
  faPlus,
  faSave,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import SubmitButton from '../buttons/SubmitButton';
import { useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { upload } from '@/libs/upload';
import Image from 'next/image';
import { savePageLinks } from '@/actions/pageActions';
import toast from 'react-hot-toast';
import Loading from '@/app/(app)/account/loading';

const PageLinksForm = ({ page, user }) => {
  const [links, setLinks] = useState(page.links || []);

  // To fix hydration errors I was getting from nextjs because of the <input type='color'/> element
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <Loading />;

  function addNewLink() {
    setLinks((prevLink) => {
      return [
        ...prevLink,
        {
          key: Date.now().toString(),
          title: '',
          subtitle: '',
          icon: '',
          url: '',
        },
      ];
    });
  }

  // HANDLE UPLOAD OF LINK IMAGE
  async function handleUpload(e, linkKeyForUpload) {
    await upload(e, (uploadedImageUrl) => {
      setLinks((prevLinks) => {
        const newLinks = [...prevLinks];
        newLinks.forEach((link, index) => {
          if (link.key === linkKeyForUpload) {
            link.icon = uploadedImageUrl;
          }
        });
        return newLinks;
      });
    });
  }

  // HANDLE CHANGE OF LINK INPUT VALUES
  function handleLinkChange(keyOfLinkToChange, propertyToChange, event) {
    setLinks((prevLinks) => {
      const newLinks = [...prevLinks];

      newLinks.forEach((link) => {
        if (link.key === keyOfLinkToChange) {
          link[propertyToChange] = event.target.value;
        }
      });

      return [...prevLinks];
    });
  }

  // REMOVE LINK
  function removeLink(linkKeyToRemove) {
    setLinks((prevLinks) => {
      return [...prevLinks].filter((link) => link.key !== linkKeyToRemove);
    });
  }

  // HANDLE FORM SUBMISSION
  async function save() {
    try {
      const result = await savePageLinks(links);

      if (result === true) {
        toast.success('Saved!');
      }
    } catch (error) {
      console.error('Error: ', error);
      toast.error('An error occurred...');
    }
  }

  return (
    <SectionBox>
      <form action={save}>
        <h2 className="text-2xl font-bold mb-4">Links</h2>

        <button
          type="button"
          className="text-blue-500 text-lg flex gap-2 items-center cursor-pointer"
          onClick={addNewLink}
        >
          <FontAwesomeIcon
            icon={faPlus}
            className="w-4 h-4 bg-blue-500 text-white p-1 rounded-full aspect-square"
          />
          <span>Add new</span>
        </button>

        <div className="">
          <ReactSortable list={links} setList={setLinks} handle=".handle">
            {links.map((link) => (
              <div key={link.key} className="mt-8 md:flex gap-8 items-center">
                <div className="handle">
                  <FontAwesomeIcon
                    icon={faGripLines}
                    className="w-4 h-4 text-gray-500 mr-2 cursor-grab"
                  />
                </div>

                <div className="text-center">
                  <div className="bg-gray-300 relative aspect-square overflow-hidden w-16 h-16 inline-flex justify-center items-center">
                    {!link.icon ? (
                      <FontAwesomeIcon
                        icon={faLink}
                        size="xl"
                        className="w-8 h-8"
                      />
                    ) : (
                      <Image
                        src={link.icon}
                        alt={link.title}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    )}
                  </div>
                  <div className="mt-2">
                    <input
                      type="file"
                      id={'icon' + link.key}
                      className="hidden"
                      onChange={(e) => handleUpload(e, link.key)}
                      accept="image/png, image/jpeg, image/jpg, .webp, .svg"
                    />
                    <label
                      htmlFor={'icon' + link.key}
                      className="border-2 p-2 flex items-center justify-center gap-1 rounded-md text-gray-700 cursor-pointer mb-2"
                    >
                      <FontAwesomeIcon
                        icon={faCloudArrowUp}
                        className="h-4 w-4"
                      />
                      <span>Change Icon</span>
                    </label>

                    <div className="flex items-center justify-center">
                      <button
                        type="button"
                        className="py-2 px-3 bg-red-500 cursor-pointer text-white mb-2 flex gap-2 items-center justify-center rounded-md max-md:block max-md:w-full"
                        onClick={() => removeLink(link.key)}
                      >
                        <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                        <span>Remove this link</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grow">
                  <label htmlFor="title" className="input-label">
                    Title:
                  </label>
                  <input
                    type="text"
                    id="title"
                    placeholder="title"
                    className="block outline-none bg-gray-100 p-2 rounded-md w-full mb-2"
                    value={link.title}
                    onChange={(e) => handleLinkChange(link.key, 'title', e)}
                  />

                  <label htmlFor="subtitle" className="input-label">
                    Subtitle:
                  </label>
                  <input
                    type="text"
                    id="subtitle"
                    placeholder="subtitle (optional)"
                    className="block outline-none bg-gray-100 p-2 rounded-md w-full mb-2"
                    value={link.subtitle}
                    onChange={(e) => handleLinkChange(link.key, 'subtitle', e)}
                  />

                  <label htmlFor="url" className="input-label">
                    URL:
                  </label>
                  <input
                    type="text"
                    id="url"
                    placeholder="url"
                    className="block outline-none bg-gray-100 p-2 rounded-md w-full mb-2"
                    value={link.url}
                    onChange={(e) => handleLinkChange(link.key, 'url', e)}
                  />
                </div>
              </div>
            ))}
          </ReactSortable>
        </div>

        <div className="border-t-2 pt-4 mt-4">
          <div className="max-w-[200px] ml-auto px-4 py-2">
            <SubmitButton usingFormAction>
              <FontAwesomeIcon icon={faSave} className="w-4 h-4" />
              Save
            </SubmitButton>
          </div>
        </div>
      </form>
    </SectionBox>
  );
};

export default PageLinksForm;

// Adding handle='.handle' to the ReactSortable component prevents the input fields from not being able to select and
// highlight a text in the field because it automatically starts to drag the input field. So for this to work, we
// specify a component we want the dragging functionality to work on only and we used our icon in this case.
