import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const coursesDirectory = path.join(process.cwd(), 'data', 'courses');

/**
 * Funcion que permite obtener la información de todos los cursos
 * dentro de la carpeta /courses
 *
 * @returns {array} Arreglo de objetos de todos los cursos
 */
export function getAllCoursesData() {
  //Obtenemos los nombres de los cursos de la carpeta /courses
  const fileNames = fs.readdirSync(coursesDirectory);

  // Procesamos cada archivo de la carpeta /courses
  const allCoursesData = fileNames.map((fileName) => {
    //Eliminamos la extensión .md y obtenemos el slug de cada curso
    const slug = fileName.replace(/\.md$/, '');

    //Leemos el archivo .md como texto
    const fullPath = path.join(coursesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');

    //Obtenemos la metadata de cada archivo de los cursos
    const matterResult = matter(fileContents);

    //Combinamos el slug con la metadata
    return {
      slug,
      ...matterResult.data,
    };
  });

  //Devolvemos la información de los cursos
  return allCoursesData;
}

/**
 * Funcion que nos permite obtener los slugs de todos los cursos
 * @returns Arreglo de objetos que contienen el slug de cada curso
 */
export function getAllCoursesSlugs() {
  const fileNames = fs.readdirSync(coursesDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

/**
 * Funcion que devuelve la información de un curso en base al
 * identificador (slug) que pasemos por parámetro
 *
 * @param {string} slug Cadena de texto que identifica a cada curso
 * @returns {object} Objeto con toda la información del curso
 */
export async function getCourseData(slug) {
  const fullPath = path.join(coursesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf-8');

  //Obtenemos el contenido de cada archivo de los cursos
  const matterResult = matter(fileContents);

  // Usamor remark para extraer el contenido que será mostrado como HTML
  const proccessedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = proccessedContent.toString();

  // Combinamos el slug con el contenido y la metadata de cada curso
  return {
    slug,
    contentHtml,
    ...matterResult.data,
  };
}

/**
 * Funcion que devuelve una cantidad de cursos dependiendo el valor del
 * parámetro limit
 * 
 * @param {string} limit Cantidad de cursos a devolver
 */
export function getSomeCoursesData(limit) {
  const allCoursesData = getAllCoursesData();

  allCoursesData.length = limit;

  return allCoursesData;
}
