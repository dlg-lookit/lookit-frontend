// Global state management with Zustand
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Auth Store
export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      login: (user, token) => set({ 
        user, 
        token, 
        isAuthenticated: true 
      }),
      
      logout: () => set({ 
        user: null, 
        token: null, 
        isAuthenticated: false 
      }),
      
      updateUser: (userData) => set((state) => ({
        user: { ...state.user, ...userData }
      })),
    }),
    {
      name: 'auth-storage',
    }
  )
);

// Wardrobe Store
export const useWardrobeStore = create((set, get) => ({
  items: [],
  categories: [],
  isLoading: false,
  
  setItems: (items) => set({ items }),
  
  addItem: (item) => set((state) => ({
    items: [...state.items, item]
  })),
  
  removeItem: (itemId) => set((state) => ({
    items: state.items.filter(item => item.id !== itemId)
  })),
  
  setLoading: (isLoading) => set({ isLoading }),
}));

// App Store (general app state)
export const useAppStore = create((set, get) => ({
  theme: 'light',
  onboardingCompleted: false,
  
  setTheme: (theme) => set({ theme }),
  
  completeOnboarding: () => set({ onboardingCompleted: true }),
  
  resetApp: () => set({ 
    theme: 'light',
    onboardingCompleted: false 
  }),
}));