'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const RadioTogglers = ({ options, defaultChecked, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(defaultChecked);

  const handleRadioChange = (value) => {
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <div className="radio-togglers shadow ">
      {options.map((option) => (
        <label key={option.label} className="cursor-pointer">
          <input
            type="radio"
            name="bgType"
            // onClick={(e) => onChange(e.target.value)}
            onChange={() => handleRadioChange(option.value)}
            value={option.value}
            // checked={defaultChecked === option.value}
            checked={selectedValue === option.value}
          />
          <div>
            <FontAwesomeIcon icon={option.icon} className="w-4 h-4" />
            <span>{option.label}</span>
          </div>
        </label>
      ))}
    </div>
  );
};

export default RadioTogglers;
