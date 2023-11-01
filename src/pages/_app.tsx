import 'styles/global.scss';
import styles from './_app.module.scss';
import type { AppProps } from 'next/app';
import Navbar from 'layout/navbar';
import Footer from 'layout/footer';
import UseAuthentication from '@context/useAuthentication';
import UseFavourites from '@context/useFavourites';
import progress from '@misc/progress';
import { Poppins } from 'next/font/google';

const font = Poppins({subsets: ["latin"], weight: ["400", "200"]})
progress();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UseAuthentication>
      <UseFavourites>
        <main className={font.className}>
          <Navbar />
          <div className={styles.container}> 
            <Component {...pageProps} />
          </div>
          <Footer />
        </main>
      </UseFavourites>
    </UseAuthentication>
  )
}
