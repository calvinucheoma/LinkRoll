'use client';

import { useEffect, useState } from 'react';
import SectionBox from '../layout/SectionBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faGripLines,
  faPhone,
  faPlus,
  faSave,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
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
import SubmitButton from '../buttons/SubmitButton';
import { savePageButtons } from '@/actions/pageActions';
import toast from 'react-hot-toast';
import { ReactSortable } from 'react-sortablejs';
import Loading from '@/app/(app)/account/loading';

const allButtons = [
  {
    key: 'email',
    label: 'e-mail',
    icon: faEnvelope,
    placeholder: 'johndoe@gmail.com',
  },
  {
    key: 'mobile',
    label: 'mobile',
    icon: faPhone,
    placeholder: '09012345667',
  },
  {
    key: 'instagram',
    label: 'instagram',
    icon: faInstagram,
    placeholder: 'https://Ig.com',
  },
  { key: 'facebook', label: 'facebook', icon: faFacebook, placeholder: '' },
  { key: 'discord', label: 'discord', icon: faDiscord, placeholder: '' },
  { key: 'tiktok', label: 'tiktok', icon: faTiktok, placeholder: '' },
  { key: 'youtube', label: 'youtube', icon: faYoutube, placeholder: '' },
  { key: 'whatsapp', label: 'whatsapp', icon: faWhatsapp, placeholder: '' },
  { key: 'github', label: 'github', icon: faGithub, placeholder: '' },
  { key: 'telegram', label: 'telegram', icon: faTelegram, placeholder: '' },
];

const PageButtonsForm = ({ page }) => {
  const pageSavedButtonKeys = Object.keys(page?.buttons ? page.buttons : []);

  const pageSavedButtonsInfo = pageSavedButtonKeys.map((key) =>
    allButtons.find((b) => b.key === key)
  );

  const [activeButtons, setActiveButtons] = useState(pageSavedButtonsInfo);

  // To fix hydration errors I was getting from nextjs because of the <input type='color'/> element
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <Loading />;

  function addButtonToProfile(button) {
    setActiveButtons((prevButtons) => {
      return [...prevButtons, button];
    });
  }

  const availableButtons = allButtons.filter(
    (button1) => !activeButtons.find((button2) => button1.key === button2.key)
  );

  // HANDLING FORM SUBMISSION
  const saveButtons = async (formData) => {
    try {
      const result = await savePageButtons(formData);

      if (result === true) {
        toast.success('Settings Saved!');
      }
    } catch (error) {
      console.error('Error: ', error);
      toast.error('An error occurred...');
    }
  };

  // REMOVING BUTTON
  const removeButton = ({ key: keyToRemove }) => {
    setActiveButtons((prevButtons) => {
      return prevButtons.filter((button) => button.key !== keyToRemove);
    });
  };

  return (
    <SectionBox>
      <form action={saveButtons}>
        <h2 className="text-2xl font-bold mb-4">Buttons</h2>

        <ReactSortable
          list={activeButtons}
          setList={setActiveButtons}
          handle=".handle"
        >
          {activeButtons.map((b) => (
            <div key={b.key} className="mb-4 md:flex items-center gap-4">
              <div className="w-56 flex gap-4 p-2 items-center shadow-lg capitalize text-gray-700">
                <FontAwesomeIcon
                  icon={faGripLines}
                  className="w-4 h-4 cursor-grab text-gray-400 handle"
                />
                <FontAwesomeIcon icon={b.icon} className="w-4 h-4" />
                <span>{b.label}:</span>
              </div>

              <div className="grow flex">
                <input
                  type="text"
                  style={{ marginBottom: 0 }}
                  className="outline-none bg-gray-100 p-2 rounded-md w-[60%]"
                  placeholder={b.placeholder}
                  name={b.key}
                  defaultValue={page?.buttons ? page?.buttons[b.key] : ''}
                />
                <button
                  type="button"
                  className="py-2 px-4 bg-red-500 cursor-pointer text-white"
                  onClick={() => removeButton(b)}
                >
                  <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </ReactSortable>

        <div className="flex flex-wrap gap-1 mt-4 border-y-2 py-4">
          {availableButtons.map((b) => (
            <button
              type="button"
              key={b.key}
              className="flex gap-2 p-2 items-center bg-gray-200"
              onClick={() => {
                addButtonToProfile(b);
              }}
            >
              <FontAwesomeIcon icon={b.icon} className="w-4 h-4" />
              <span className="capitalize">{b.label}</span>
              <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
            </button>
          ))}
        </div>

        <div className="mt-8 max-w-[200px] ml-auto px-4 py-2">
          <SubmitButton usingFormAction>
            <FontAwesomeIcon icon={faSave} className="w-4 h-4" />
            <span>Save</span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
};

export default PageButtonsForm;
