"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { COUNTRIES, type Country } from "@/lib/countries";

interface CountrySelectProps {
  id: string;
  label: string;
  /** Currently selected ISO country code */
  value: string;
  onChange: (code: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

export function CountrySelect({
  id,
  label,
  value,
  onChange,
  error,
  required,
  placeholder = "Select a country",
}: CountrySelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [highlightIdx, setHighlightIdx] = useState(-1);
  const errorId = `${id}-error`;

  const selected: Country | undefined = COUNTRIES.find((c) => c.code === value);

  const filtered = search.trim()
    ? COUNTRIES.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.code.toLowerCase().includes(search.toLowerCase()) ||
          c.dialCode.includes(search),
      )
    : COUNTRIES;

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightIdx >= 0 && listRef.current) {
      const items = listRef.current.children;
      if (items[highlightIdx]) {
        (items[highlightIdx] as HTMLElement).scrollIntoView({
          block: "nearest",
        });
      }
    }
  }, [highlightIdx]);

  // Reset highlight when filtered list changes
  useEffect(() => {
    setHighlightIdx(-1);
  }, [search]);

  const selectCountry = useCallback(
    (country: Country) => {
      onChange(country.code);
      setSearch("");
      setOpen(false);
    },
    [onChange],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightIdx((prev) => Math.min(prev + 1, filtered.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightIdx((prev) => Math.max(prev - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightIdx >= 0 && highlightIdx < filtered.length) {
          selectCountry(filtered[highlightIdx]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
    }
  };

  return (
    <div ref={containerRef} className="relative flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-text-primary">
        {label}
        {required && (
          <span className="ml-1 text-accent" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {/* Trigger */}
      <button
        type="button"
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={`${id}-listbox`}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        onClick={() => {
          setOpen((prev) => !prev);
          // Focus search input when opening
          setTimeout(() => inputRef.current?.focus(), 0);
        }}
        onKeyDown={handleKeyDown}
        className={`w-full rounded-lg border px-4 py-3 text-sm font-sans text-left transition-all duration-150
          focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand
          ${
            error
              ? "border-red-400 focus:ring-red-400/30 focus:border-red-400"
              : "border-border hover:border-border-light"
          }
          ${selected ? "text-text-primary" : "text-text-tertiary"}
          bg-background-alt cursor-pointer`}
      >
        {selected ? (
          <span className="flex items-center gap-2">
            <span className="text-base leading-none">{selected.flag}</span>
            <span>{selected.name}</span>
            <span className="text-text-tertiary ml-auto">
              {selected.dialCode}
            </span>
          </span>
        ) : (
          placeholder
        )}
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-tertiary mt-3">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M3 4.5L6 7.5L9 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 rounded-lg border border-border bg-white shadow-lg shadow-black/8 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
          {/* Search */}
          <div className="p-2 border-b border-border/60">
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search countries…"
              className="w-full rounded-md border border-border/60 bg-background-alt px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
              aria-label="Search countries"
              autoComplete="off"
            />
          </div>

          {/* List */}
          <ul
            ref={listRef}
            id={`${id}-listbox`}
            role="listbox"
            className="max-h-56 overflow-y-auto py-1"
          >
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-sm text-text-tertiary text-center">
                No countries found
              </li>
            ) : (
              filtered.map((country, idx) => {
                const isHighlighted = idx === highlightIdx;
                const isSelected = country.code === value;
                return (
                  <li
                    key={country.code}
                    role="option"
                    aria-selected={isSelected}
                    className={`flex items-center gap-2.5 px-4 py-2.5 text-sm cursor-pointer transition-colors duration-100
                      ${isHighlighted ? "bg-brand/8 text-text-primary" : ""}
                      ${isSelected && !isHighlighted ? "bg-accent/5 font-medium" : ""}
                      ${!isHighlighted && !isSelected ? "text-text-secondary hover:bg-gray-50 hover:text-text-primary" : ""}
                    `}
                    onClick={() => selectCountry(country)}
                    onMouseEnter={() => setHighlightIdx(idx)}
                  >
                    <span className="text-base leading-none flex-shrink-0">
                      {country.flag}
                    </span>
                    <span className="truncate">{country.name}</span>
                    <span className="ml-auto text-text-tertiary text-xs flex-shrink-0">
                      {country.dialCode}
                    </span>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}

      {error && (
        <p id={errorId} role="alert" className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
