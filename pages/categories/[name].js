import React from 'react';
import Head from 'next/head';

import Layout from '../../components/layout';
import Card from '../../components/Card/Card';

import {
  getAllCategoriesNames,
  getCoursesByCategory,
} from '../../lib/categories';

export async function getStaticProps({ params }) {
  const filteredCourses = await getCoursesByCategory(params.name);
  return {
    props: {
      filteredCourses,
      category: params.name,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllCategoriesNames();
  return {
    paths,
    fallback: false,
  };
}

export default function Category({ filteredCourses, category }) {
  const { totalCourses, data } = filteredCourses;

  return (
    <Layout>
      <Head>
        <title>Cursos de {category}</title>
      </Head>
      <article>
        <h1 className='text-gray-700 text-2xl font-bold'>
          Existen {totalCourses} cursos con esta categoría
        </h1>
          <div
            id='CardScroll'
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-1 md:gap-y-8'
          >
            {data.length &&
              data.map((course) => (
                <Card
                  to={`/courses/${course.slug}`}
                  title={course.title}
                  image={course.banner}
                  key={course.title}
                >
                  {course.category &&
                    course.category.map((category) => (
                      <span key={category}>{category} - </span>
                    ))}
                </Card>
              ))}
          </div>         
      </article>
    </Layout>
  );
}
