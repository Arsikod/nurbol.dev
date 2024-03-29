import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../../../styles/utils.module.css';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import Tilt from '../../lib/Tilt';

const name = 'nurbol.dev';
export const siteTitle = 'Nurbol Dev';

export type LayoutProps = PropsWithChildren<{
  home?: boolean;
}>;

export default function Layout({ children, home }: LayoutProps) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Web development tips" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Tilt>
              <Image
                priority
                src="/images/profile.png"
                alt={name}
                height={150}
                width={75}
              />
            </Tilt>
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/profile.png"
                  alt={name}
                  height={150}
                  width={75}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}
