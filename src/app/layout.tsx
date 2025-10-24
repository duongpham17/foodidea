import 'styles/global.scss';
import styles from './layout.module.scss';
import { Open_Sans } from "next/font/google";

import UseAuthentication from '@context/useAuthentication';
import UseFavourites from '@context/useFavourites';
import Navbar from 'layout/navbar';
import Footer from 'layout/footer';

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${openSans.className}`}>
      <body>
          <UseAuthentication>
          <UseFavourites>
            <Navbar />
            <div className={styles.container}>
            {children}
            </div>
            <Footer />
          </UseFavourites>
          </UseAuthentication>
      </body>
    </html>
  );
};
