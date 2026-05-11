"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { getCountries, getCountryCallingCode } from 'react-phone-number-input';

type CountryCodeDropdownProps = {
  value: string | undefined;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  height?: string;
  bgColor?: string;
  borderColor?: string;
  textClass?: string;
};

function getCountryFlag(country: string) {
  const codePoints = country
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

const CountryCodeDropdown: React.FC<CountryCodeDropdownProps> = ({
  value,
  onChange,
  className = '',
  disabled = false,
  error = false,
  height = 'h-12',
  bgColor = 'bg-white',
  borderColor = 'border-[#ef4a25]',
  textClass = 'text-gray-900'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const countries = getCountries();
  const countryData = countries
    .map((country) => ({
      code: country,
      name: new Intl.DisplayNames(['en'], { type: 'region' }).of(country) || country,
      flag: getCountryFlag(country),
      callingCode: getCountryCallingCode(country)
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  useEffect(() => {
    if (!value && countryData.length > 0) {
      const indiaCountry = countryData.find((c) => c.code === 'IN');
      if (indiaCountry) {
        onChange(`+${indiaCountry.callingCode}`);
      }
    }
  }, [value, countryData, onChange]);

  const selectedCountry =
    countryData.find((c) => `+${c.callingCode}` === value) ||
    countryData.find((c) => c.callingCode === (value || '').replace('+', '')) ||
    countryData.find((c) => c.code === 'IN') ||
    countryData[0];

  const filteredCountries = countryData.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.callingCode.includes(searchTerm) ||
    c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (callingCode: string) => {
    onChange(`+${callingCode}`);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!disabled) {
      if (!isOpen) setSearchTerm('');
      // Decide placement based on available viewport space
      try {
        const rect = buttonRef.current?.getBoundingClientRect();
        const dropdownEstimatedHeight = 320; // px
        const gap = 8; // px
        if (rect) {
          const spaceBelow = window.innerHeight - rect.bottom;
          setOpenUp(spaceBelow < dropdownEstimatedHeight + gap);
        }
      } catch {
        // Ignore errors
      }
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isDropdownButton = !!target.closest('.country-dropdown');
      const isDropdownOption = !!target.closest('[data-country-dropdown]');
      const isSearchInput = target.tagName.toLowerCase() === 'input';
      if (isOpen && !isDropdownButton && !isDropdownOption && !isSearchInput) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className={`relative country-dropdown ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={`
          flex items-center justify-between w-full px-3 text-sm border rounded-l-xl appearance-none ${height}
          ${error ? 'border-red-500' : borderColor}
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : `${bgColor} cursor-pointer`}
          focus:ring-2 focus:ring-[#ef4a25] focus:border-[#ef4a25] transition-all ${textClass}
        `}
      >
        <div className="flex items-center space-x-2">
          <span className="text-lg">{selectedCountry.flag}</span>
          <span className="font-medium">+{selectedCountry.callingCode}</span>
        </div>
        <FiChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && !disabled && (
        <div
          data-country-dropdown
          className={`absolute z-50 w-72 bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-hidden ${openUp ? 'bottom-full mb-1' : 'top-full mt-1'}`}
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 p-3">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search country or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ef4a25] focus:border-[#ef4a25]"
              autoFocus
            />
          </div>

          <div className="max-h-64 overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleSelect(country.callingCode)}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <span className="text-lg flex-shrink-0">{country.flag}</span>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-gray-900">{country.name}</div>
                    <div className="text-gray-500 text-xs">+{country.callingCode}</div>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-6 text-sm text-gray-500 text-center">No countries found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryCodeDropdown;


