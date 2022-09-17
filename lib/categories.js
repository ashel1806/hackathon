import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getAllCoursesData } from './courses';

const categoriesDirectory = path.join(process.cwd(), 'data', 'categories');

/**
 * Funcion que permite obtener toda la información de cada categoría
 *
 * @returns {array} Arreglo de objetos de todas las categorías
 */
export function getAllCategoriesData() {
  //Obtenemos los nombres de las categorias de la carpeta /categories
  const fileNames = fs.readdirSync(categoriesDirectory);

  // Procesamos cada archivo de la carpeta /categories
  const allCategoriesData = fileNames.map((fileName) => {
    //Eliminamos la extensión .md y obtenemos el nombre de cada categoria
    const name = fileName.replace(/\.md$/, '');

    //Leemos el archivo .md como texto
    const fullPath = path.join(categoriesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');

    //Obtenemos la metadata de cada archivo de las categorias
    const matterResult = matter(fileContents);

    //Combinamos el nombre con la metadata
    return {
      name,
      ...matterResult.data,
    };
  });

  //Devolvemos la información de las categorias
  return allCategoriesData;
}

/**
 * Funcion que nos permite obtener los nombres de todos las categorias
 * @returns Arreglo de objetos que contienen el nombre de cada categoria
 */
export function getAllCategoriesNames() {
  const fileNames = fs.readdirSync(categoriesDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        name: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

/**
 * Funcion que devuelve los cursos filtrados según la categoría que se le pase
 * por parámetro
 *
 * @param {string} category Categoría seleccionada
 * @returns {object} Objeto con información de los cursos filtrados
 */
export async function getCoursesByCategory(category) {
  const allCoursesData = getAllCoursesData();

  const filteredCourses = allCoursesData.filter((course) => course?.category?.includes(category))

  return {
    totalCourses: filteredCourses.length,
    data: filteredCourses
  }
}