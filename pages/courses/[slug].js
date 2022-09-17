import Head from 'next/head';

import Layout from '../../components/layout';

import { getAllCoursesSlugs, getCourseData } from '../../lib/courses';

export async function getStaticProps({ params }) {
  const courseData = await getCourseData(params.slug);
  return {
    props: {
      courseData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllCoursesSlugs();
  return {
    paths,
    fallback: false,
  };
}

export default function Course({ courseData }) {
  return (
    <Layout>
      <Head>
        <title>{courseData.title}</title>
      </Head>
      <article>
        <h1>{courseData.title}</h1>
        <div
          className='prose prose-lg xl:prose-xl mx-auto prose max-w-none'
          dangerouslySetInnerHTML={{ __html: courseData.contentHtml }}
        />
      </article>
    </Layout>
  );
}
