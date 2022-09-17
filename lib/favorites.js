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

export const saveFavorites = (course) => {
  if (typeof window !== 'undefined') {
    let favorites = JSON.parse(localStorage.getItem('favorites'));

    favorites = favorites ? favorites : [];

    if (!favorites.includes(course)) {
      favorites.push(course);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
};

export const getAllFavorites = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('favorites');
  }
};

export const removeFromFavorites = (course) => {
  if (typeof window !== 'undefined') {
    let favorites = JSON.parse(localStorage.getItem('favorites'));

    favorites = favorites.filter((favorite) => favorite !== course);

    if (!favorites.length) {
      localStorage.removeItem('favorites');
    } else {
      localStorage.setItem('favorites', favorites);
    }
  }
}

export const isSavedInFavorites = (course) => {
  if (typeof window !== 'undefined') {
    let favorites = JSON.parse(localStorage.getItem('favorites'));

    if (favorites) {
      return favorites.includes(course);
    }
  }
}