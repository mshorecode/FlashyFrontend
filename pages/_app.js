/* eslint-disable react/prop-types */
import '../styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useRouter } from 'next/router';
import { AuthProvider } from '../utils/context/authContext';
import ViewDirectorBasedOnUserAuthStatus from '../utils/ViewDirector';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider attribute="class" defaultTheme="light">
        <AuthProvider>
          {/* gives children components access to user and auth methods */}
          <ViewDirectorBasedOnUserAuthStatus
            // if status is pending === loading
            // if status is logged in === view app
            // if status is logged out === sign in page
            component={Component}
            pageProps={pageProps}
          />
        </AuthProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export default MyApp;
