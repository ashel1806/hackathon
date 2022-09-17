import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

import Layout from '../../components/layout';
import Card from '../../components/Card/Card';
import { addToFavorites, removeFavorites } from '../../redux/states/favoritesSlice';

import {
  getAllCategoriesNames,
  getCoursesByCategory,
} from '../../lib/categories';
import { isSavedInFavorites } from '../../lib/favorites';

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
  const [savedFavorites, setSavedFavorites] = useState([]);
  const { totalCourses, data } = filteredCourses;
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);

  useEffect(() => {
    if (favorites) {
      setSavedFavorites(favorites);
    }
  }, [favorites]);

  const handleFavorites = (course) => {
    isSavedInFavorites(course)
      ? dispatch(removeFavorites(course))
      : dispatch(addToFavorites(course))
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
        <title>Cursos de {colors[category].name}</title>
      </Head>
      <article>
        <h1 className='text-gray-700 text-2xl font-bold'>
          Existen {totalCourses} cursos con esta categoría
        </h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-1 md:gap-y-8 pb-14'>
          {data.length &&
            data.map((course) => {
              const age = course.age.join(' - ');

              return (
                <Card
                  to={`/courses/${course.slug}`}
                  title={course.title}
                  image={course.banner}
                  key={course.title}
                >
                  <p>{age} años</p>
                  <div className='flex space-x-2'>
                    {course.category &&
                      course.category.map((category) => (
                        <div key={category}>
                          <span
                            className={`text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold ${colors[category].color} text-white rounded`}
                          >
                            {colors[category].name}{' '}
                          </span>
                        </div>
                      ))}
                  </div>
                  <button
                    className='absolute top-0 right-0 mr-5 mt-4 text-white p-1 bg-red-400 rounded-lg z-10'
                    onClick={() => handleFavorites(course.slug)}
                  >
                    {savedFavorites && savedFavorites.includes(course.slug) ? (
                      <AiFillHeart size={25} />
                    ) : (
                      <AiOutlineHeart size={25} />
                    )}
                  </button>
                </Card>
              );
            })}
        </div>
      </article>
    </Layout>
  );
}
