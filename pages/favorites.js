import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

import { isSavedInFavorites } from '../lib/favorites';
import {
  addToFavorites,
  removeFavorites,
} from '../redux/states/favoritesSlice';

import Layout from '../components/layout';
import Card from '../components/Card/Card';
import { getAllCoursesData } from '../lib/courses';

export async function getStaticProps() {
  const allCoursesData = getAllCoursesData();
  return {
    props: {
      allCoursesData,
    },
  };
}

export default function Favorites({ allCoursesData }) {
  const [savedFavorites, setSavedFavorites] = useState([]);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    if (favorites) {
      const joinedFavorites = allCoursesData.filter((course) => favorites.includes(course.slug))
      setSavedFavorites(joinedFavorites);
    }
  }, [favorites]);

  const handleFavorites = (course) => {
    isSavedInFavorites(course)
      ? dispatch(removeFavorites(course))
      : dispatch(addToFavorites(course));
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
        <title>Mis Favoritos</title>
      </Head>
      <article>
        <h1 className='text-gray-700 text-2xl font-bold'>
          {savedFavorites.length ? 'Mis favoritos' : 'Aún no has agregados favoritos'}
        </h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-1 md:gap-y-8 pb-14'>
          {savedFavorites.length &&
            savedFavorites.map((course) => {
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
