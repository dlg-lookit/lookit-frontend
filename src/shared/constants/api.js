// API endpoints and configurations
export const API_BASE_URL = 'https://api.lookit.app';

export const ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
  },
  
  wardrobe: {
    items: '/wardrobe/items',
    categories: '/wardrobe/categories',
  },
  
  outfits: {
    generate: '/outfits/generate',
    save: '/outfits/save',
    history: '/outfits/history',
  },
  
  weather: {
    current: '/weather/current',
    forecast: '/weather/forecast',
  },
  
  profile: {
    me: '/profile/me',
    preferences: '/profile/preferences',
    sizes: '/profile/sizes',
  },
};