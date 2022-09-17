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
    return JSON.parse(localStorage.getItem('favorites'));
  }
};

export const removeFromFavorites = (course) => {
  if (typeof window !== 'undefined') {
    let favorites = JSON.parse(localStorage.getItem('favorites'));

    favorites = favorites.filter((favorite) => favorite !== course);

    if (!favorites.length) {
      localStorage.removeItem('favorites');
    } else {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }
};

export const isSavedInFavorites = (course) => {
  if (typeof window !== 'undefined') {
    let favorites = JSON.parse(localStorage.getItem('favorites'));

    favorites = favorites ? favorites : [];

    return favorites.includes(course);
  }
};
