import Head from 'next/head';
import Link from 'next/link';
import Date from '../components/atoms/Date';
import Layout, { siteTitle } from '../components/unlisted/Layout/Layout';
import { getSortedPostsData } from '../lib/posts';
import utilStyles from '../styles/utils.module.css';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData,
    },
  };
}

export interface HomePageProps {
  allPostsData: Array<{ id: string; date: string; title: string }>;
}

export default function Home({ allPostsData }: HomePageProps) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd} style={{ textAlign: 'center' }}>
        <p>I write software with React and NextJS</p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => {
            return (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            );
          })}
        </ul>
      </section>
    </Layout>
  );
}
