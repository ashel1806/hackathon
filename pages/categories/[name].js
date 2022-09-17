import { useEffect, useState } from 'react';
import Head from 'next/head';

import Layout from '../../components/layout';
import Card from '../../components/Card/Card';

import {
  getAllCategoriesNames,
  getCoursesByCategory,
} from '../../lib/categories';
import {
  getAllFavorites,
  saveFavorites,
  isSavedInFavorites,
} from '../../lib/favorites';
import { AiOutlineHeart } from 'react-icons/ai';

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
  const [favorites, setFavorites] = useState([]);
  const { totalCourses, data } = filteredCourses;

  useEffect(() => {
    const getFavorites = getAllFavorites();

    if (getFavorites) {
      setFavorites(getFavorites);
    }

    console.log(favorites);
  }, []);

  const handleFavorites = (course) => {
    if (isSavedInFavorites(course)) {
      removeFromFavorites(course);
    } else {
      saveFavorites(course);
    }
  };

  const colors = {
    diseno: {
      name: 'Diseño',
      color: 'bg-blue-600',
    },
    programacion: {
      name: 'Programación',
      color: 'bg-red-600',
    },
    videojuegos: {
      name: 'Videojuegos',
      color: 'bg-purple-600',
    },
    audiovisual: {
      name: 'Audiovisual',
      color: 'bg-green-500',
    },
  };

  return (
    <Layout>
      <Head>
        <title>Cursos de {category}</title>
      </Head>
      <article>
        <h1 className='text-gray-700 text-2xl font-bold'>
          Existen {totalCourses} cursos con esta categoría
        </h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-1 md:gap-y-8 pb-14'>
          {data.length &&
            data.map((course) => (
              <Card
                to={`/courses/${course.slug}`}
                title={course.title}
                image={course.banner}
                key={course.title}
              >
                <div className='flex space-x-2'>
                  {course.category &&
                    course.category.map((category) => (
                      <div>
                        <span
                          className={`text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold ${colors[category].color} text-white rounded`}
                          key={category}
                        >
                          {colors[category].name}{' '}
                        </span>
                      </div>
                    ))}
                </div>
                <button
                  onClick={() => handleFavorites(course.slug)}
                  className='bg-red-100'
                >
                  {favorites.includes(course.slug)
                    ? 'Guardarn´t en favoritos'
                    : 'Guardar en favoritos'}
                </button>
                <div className='absolute top-0 right-0 mr-5 mt-4 text-white p-1 bg-red-400 rounded-lg z-10'>
                  <AiOutlineHeart size={25} />
                </div>
              </Card>
            ))}
        </div>
      </article>
    </Layout>
  );
}
