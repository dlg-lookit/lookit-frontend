import React from 'react';
import { IPhoneMockup } from './IPhoneMockup';
import { LoginScreen } from './screens/LoginScreen';
import { SignupStepOneScreen } from './screens/SignupStepOneScreen';
import { SignupStepTwoScreen } from './screens/SignupStepTwoScreen';
import { HomeScreen } from './screens/HomeScreen';
import { WardrobeScreen } from './screens/WardrobeScreen';
import { OutfitSuggestionsScreen } from './screens/OutfitSuggestionsScreen';
import { StyleProfileScreen } from './screens/StyleProfileScreen';
import { PersonalStatsScreen } from './screens/PersonalStatsScreen';
import { useApp } from './AppContext';

export const MobileApp: React.FC = () => {
  const { 
    currentScreen, 
    authScreen,
    setAuthScreen,
    isAuthenticated, 
    login,
    signupStepOneData,
    setSignupStepOneData,
    completeSignup
  } = useApp();

  const renderCurrentScreen = () => {
    if (!isAuthenticated) {
      switch (authScreen) {
        case 'login':
          return (
            <LoginScreen 
              onLogin={login} 
              onSignup={() => setAuthScreen('signupStepOne')}
            />
          );
        case 'signupStepOne':
          return (
            <SignupStepOneScreen
              onNext={(data) => {
                setSignupStepOneData(data);
                setAuthScreen('signupStepTwo');
              }}
              onBack={() => setAuthScreen('login')}
              initialData={signupStepOneData || undefined}
            />
          );
        case 'signupStepTwo':
          return (
            <SignupStepTwoScreen
              onComplete={(data) => completeSignup(data)}
              onBack={() => setAuthScreen('signupStepOne')}
              onSkip={() => completeSignup()}
            />
          );
        default:
          return (
            <LoginScreen 
              onLogin={login} 
              onSignup={() => setAuthScreen('signupStepOne')}
            />
          );
      }
    }

    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'wardrobe':
        return <WardrobeScreen />;
      case 'suggestions':
        return <OutfitSuggestionsScreen />;
      case 'profile':
        return <StyleProfileScreen />;
      case 'stats':
        return <PersonalStatsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="relative">
      <IPhoneMockup>
        {renderCurrentScreen()}
      </IPhoneMockup>
      
      {/* Screen indicator */}
      {isAuthenticated && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
            <p className="text-xs text-muted-foreground capitalize">
              {currentScreen === 'suggestions' ? 'Outfit Suggestions' : 
               currentScreen === 'profile' ? 'Style Profile' :
               currentScreen}
            </p>
          </div>
        </div>
      )}
      
      {/* Auth screen indicator */}
      {!isAuthenticated && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
            <p className="text-xs text-muted-foreground capitalize">
              {authScreen === 'signupStepOne' ? 'Signup - Step 1' : 
               authScreen === 'signupStepTwo' ? 'Signup - Step 2' :
               'Login'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
