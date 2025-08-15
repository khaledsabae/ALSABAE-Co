import {createLocalizedPathnamesNavigation} from 'next-intl/navigation';

export const locales = ['en', 'ar'] as const;
export const localePrefix = 'always'; // Default

// The `pathnames` object holds pairs of internal
// and external paths, separated by locale.
export const pathnames = {
  // If all locales use the same path, use
  // the `shared` key
  '/': '/',
  '/dashboard': {
    en: '/dashboard',
    ar: '/لوحة-التحكم'
  }
};

export const {Link, redirect, usePathname, useRouter} =
  createLocalizedPathnamesNavigation({locales, localePrefix, pathnames});
