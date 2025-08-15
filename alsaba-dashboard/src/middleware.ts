import createMiddleware from 'next-intl/middleware';
import {pathnames, locales} from './navigation';

export default createMiddleware({
  // A list of all locales that are supported
  locales,
 
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'en',
 
  // Used when no locale matches
  localePrefix: 'always',
  pathnames
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\..*).*)'
  ]
};
