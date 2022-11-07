import Head from 'next/head';
import Link from 'next/link';
import Date from '../components/atoms/Date';
import Layout, { siteTitle } from '../components/unlisted/Layout/Layout';
import { getSortedPostsData } from '../lib/posts';
import utilStyles from '../styles/utils.module.css';
import Icon from '../components/atoms/icon/Icon';

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
        <p>
          I develop software with <Icon iconName="reactIcon" height="25" width="25" />{' '}
          React and <Icon iconName="nextJsIcon" height="25" width="25" /> NextJS
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>1 min read recipes</h2>
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
