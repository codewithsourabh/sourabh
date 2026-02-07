import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, X } from "lucide-react";

interface CountryCode {
  code: string;
  country: string;
  flag: string;
  popular?: boolean;
}

interface SearchableCountrySelectProps {
  value: string;
  onChange: (value: string) => void;
  countries: CountryCode[];
  className?: string;
}

export default function SearchableCountrySelect({
  value,
  onChange,
  countries,
  className = "",
}: SearchableCountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Filter countries based on search query
  const filteredCountries = countries.filter(
    (country) =>
      country.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.includes(searchQuery)
  );

  // Separate popular and other countries
  const popularCountries = filteredCountries.filter((c) => c.popular);
  const otherCountries = filteredCountries.filter((c) => !c.popular);

  const selectedCountry = countries.find((c) => c.code === value);

  const handleSelect = (code: string) => {
    onChange(code);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Selected value button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 flex items-center justify-between"
      >
        <span className="flex items-center gap-2">
          {selectedCountry ? (
            <>
              <span>{selectedCountry.flag}</span>
              <span>{selectedCountry.code}</span>
            </>
          ) : (
            <span className="text-slate-400">Select</span>
          )}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-64 mt-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg shadow-lg max-h-80 overflow-hidden">
          {/* Search input */}
          <div className="p-2 border-b border-slate-200 dark:border-slate-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country or code..."
                className="w-full pl-9 pr-8 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Countries list */}
          <div className="overflow-y-auto max-h-64">
            {/* Popular countries */}
            {popularCountries.length > 0 && (
              <div>
                <div className="px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900">
                  Popular
                </div>
                {popularCountries.map((country) => (
                  <button
                    key={`${country.country}-${country.code}`}
                    type="button"
                    onClick={() => handleSelect(country.code)}
                    className={`w-full px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2 ${
                      value === country.code ? "bg-cyan-50 dark:bg-cyan-900/20" : ""
                    }`}
                  >
                    <span>{country.flag}</span>
                    <span className="flex-1 text-sm">{country.country}</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">{country.code}</span>
                  </button>
                ))}
              </div>
            )}

            {/* All countries */}
            {otherCountries.length > 0 && (
              <div>
                {popularCountries.length > 0 && (
                  <div className="px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900">
                    All Countries
                  </div>
                )}
                {otherCountries.map((country) => (
                  <button
                    key={`${country.country}-${country.code}`}
                    type="button"
                    onClick={() => handleSelect(country.code)}
                    className={`w-full px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2 ${
                      value === country.code ? "bg-cyan-50 dark:bg-cyan-900/20" : ""
                    }`}
                  >
                    <span>{country.flag}</span>
                    <span className="flex-1 text-sm">{country.country}</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">{country.code}</span>
                  </button>
                ))}
              </div>
            )}

            {/* No results */}
            {filteredCountries.length === 0 && (
              <div className="px-3 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                No countries found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
