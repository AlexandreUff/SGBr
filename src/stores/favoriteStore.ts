import { defineStore } from 'pinia';

interface FavoriteState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  favorites: any[];
}

export const favoriteStore = defineStore('favoriteStore', () => ({
  state: (): FavoriteState => ({
    favorites: [],
  }),
  actions: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addFavorite(this: FavoriteState, item: any) {
      this.favorites.push(item);
      window.localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    removeFavorite(this: FavoriteState, item: any) {
      this.favorites = this.favorites.filter((i) => i !== item);
      window.localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
  },
  plugins: [
    {
      persist: {
        key: 'favorites',
        storage: window.localStorage,
      },
    },
  ],
}));
