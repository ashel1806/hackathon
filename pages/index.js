import Layout from '../components/layout';
import { getSomeCoursesData } from '../lib/courses';
import { getAllCategoriesData } from '../lib/categories';
import Card from '../components/Card/Card';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

export async function getStaticProps() {
  const allCategoriesData = getAllCategoriesData();
  const someCourses = getSomeCoursesData(5);
  return {
    props: {
      allCategoriesData,
      someCourses,
    },
  };
}

export default function Home({ allCategoriesData, someCourses }) {
  const slideLeft = (context) => {
    var slider1 = document.getElementById('CardScroll1');
    var slider2 = document.getElementById('CardScroll2');

    if (context === 'categories') {
      slider1.scrollLeft = slider1.scrollLeft - 500;
    } else {
      slider2.scrollLeft = slider2.scrollLeft - 500;
    }
  };

  const slideRight = (context) => {
    var slider1 = document.getElementById('CardScroll1');
    var slider2 = document.getElementById('CardScroll2');
    if (context === 'categories') {
      slider1.scrollLeft = slider1.scrollLeft + 500;
    } else {
      slider2.scrollLeft = slider2.scrollLeft + 500;
    }
  };

  const categoryColors = {
    diseno: {
      label: 'Diseño',
      color: 'bg-blue-600',
    },
    programacion: {
      label: 'Programación',
      color: 'bg-red-600',
    },
    videojuegos: {
      label: 'Videojuegos',
      color: 'bg-purple-600',
    },
    audiovisual: {
      label: 'Audiovisual',
      color: 'bg-green-500',
    },
  };

  return (
    <Layout home>
      <div className='bg-gray-200 mx-auto p-5'>
        <div className='mx-auto'>
          <div className='mb-12'>
            <h1 className='text-gray-800 text-4xl font-bold'>Categorías</h1>
            <div className='relative flex items-center'>
              <div className='hidden md:inline-block cursor-pointer opacity-50 hover:opacity-100'>
                <MdChevronLeft
                  onClick={() => slideLeft('categories')}
                  size={80}
                />
              </div>
              <div
                id='CardScroll1'
                className='flex flex-col md:flex-row sm:gap-x-4 overflow-x-auto scroll-smooth pb-8'
              >
                {allCategoriesData.length &&
                  allCategoriesData.map((category) => (
                    <Card
                      to={`/categories/${category.slug}`}
                      title={category.title}
                      image={category.image}
                      key={category.title}
                    >
                      <span className='text-gray-500 text-xs'>
                        {category.description}
                      </span>
                    </Card>
                  ))}
              </div>
              <div className='hidden md:inline-block cursor-pointer opacity-50 hover:opacity-100'>
                <MdChevronRight
                  onClick={() => slideRight('categories')}
                  size={80}
                />
              </div>
            </div>
          </div>
          <div className=''>
            <h1 className='text-gray-800 text-4xl font-bold'>Populares</h1>
            <div className='relative flex items-center'>
              <div className='hidden md:inline-block cursor-pointer opacity-50 hover:opacity-100'>
                <MdChevronLeft onClick={() => slideLeft('courses')} size={80} />
              </div>
              <div
                id='CardScroll2'
                className='flex flex-col md:flex-row sm:gap-x-4 overflow-x-auto scroll-smooth pb-8'
              >
                {someCourses.length &&
                  someCourses.map((course) => {
                    const age = course.age.join(' - ');

                    return (
                      <Card
                        to={`/courses/${course.slug}`}
                        title={course.title}
                        image={course.banner}
                        key={course.title}
                      >
                        <p>{age} años</p>
                        <div class='space-x-2 '>
                          {course.category.map((category) => (
                            <span
                              key={category}
                              className={`text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold ${categoryColors[category].color} text-white rounded`}
                            >
                              {categoryColors[category].label}
                            </span>
                          ))}
                        </div>
                      </Card>
                    );
                  })}
              </div>
              <div className='hidden md:inline-block cursor-pointer opacity-50 hover:opacity-100'>
                <MdChevronRight
                  onClick={() => slideRight('courses')}
                  size={80}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
