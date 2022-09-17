// function saveToLocalStorage(key = 'favorites', value) {
//   if (typeof window !== 'undefined') {
//     window.localStorage.setItem(key, JSON.stringify(value));
//   }
// }

// function getItemsFromLocalStorage(key = 'favorites') {
//   if (typeof window !== 'undefined') {
//     return JSON.parse(window.localStorage.getItem(key));
//   }

//   return [];
// }

// export function addToFavorites(courseSlug) {
//   if (typeof window !== 'undefined') {
//     let favorites = getItemsFromLocalStorage('favorites')

//     favorites = favorites ? favorites : []

//     favorites.push(courseSlug)

//     saveToLocalStorage('favorites', favorites)
//   }
// }

// export function getAllFavorites() {
//   if (typeof window !== 'undefined') {
//     return getItemsFromLocalStorage('favorites');
//   }

//   return [];
// }

// export function removeFavorite(courseToRemove) {
//   if (typeof window !== 'undefined') {
//     let favorites = getItemsFromLocalStorage('favorites');
  
//     favorites = favorites.filter((course) => course != courseToRemove);
  
//     saveToLocalStorage('favorites', favorites);
//   }
// }

export const saveFavorites = (accessToken) => {
  if (typeof window !== 'undefined')
    localStorage.setItem('accessToken', accessToken);
};

export const getAccessToken = () => {
  if (typeof window !== 'undefined') 
     return localStorage.getItem('accessToken');
};