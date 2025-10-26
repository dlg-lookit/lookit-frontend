import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SignupStepOneData } from './screens/SignupStepOneScreen';
import { SignupStepTwoData } from './screens/SignupStepTwoScreen';

export type Screen = 'home' | 'wardrobe' | 'suggestions' | 'profile' | 'stats';
export type AuthScreen = 'login' | 'signupStepOne' | 'signupStepTwo';

interface AppContextType {
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
  authScreen: AuthScreen;
  setAuthScreen: (screen: AuthScreen) => void;
  user: {
    name: string;
    location: string;
    temperature: number;
    weatherIcon: string;
  };
  wardrobeStreak: number;
  favoriteItems: any[];
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  signupStepOneData: SignupStepOneData | null;
  setSignupStepOneData: (data: SignupStepOneData) => void;
  completeSignup: (stepTwoData?: SignupStepTwoData) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [authScreen, setAuthScreen] = useState<AuthScreen>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [signupStepOneData, setSignupStepOneData] = useState<SignupStepOneData | null>(null);
  
  const user = {
    name: signupStepOneData?.displayName || 'Daniel',
    location: 'CDMX',
    temperature: 22,
    weatherIcon: '☁️'
  };

  const wardrobeStreak = 7;
  const favoriteItems = [];

  const login = (email: string, password: string) => {
    // In a real app, this would validate credentials
    setIsAuthenticated(true);
    setAuthScreen('login');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAuthScreen('login');
    setCurrentScreen('home');
    setSignupStepOneData(null);
  };

  const completeSignup = (stepTwoData?: SignupStepTwoData) => {
    // In a real app, this would save user data to the backend
    setIsAuthenticated(true);
    setAuthScreen('login');
  };

  return (
    <AppContext.Provider value={{
      currentScreen,
      setCurrentScreen,
      authScreen,
      setAuthScreen,
      user,
      wardrobeStreak,
      favoriteItems,
      isAuthenticated,
      login,
      logout,
      signupStepOneData,
      setSignupStepOneData,
      completeSignup
    }}>
      {children}
    </AppContext.Provider>
  );
};
