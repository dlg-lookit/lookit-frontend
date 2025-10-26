import React from 'react';
import { Home, Shirt, Sparkles, BarChart3, User } from 'lucide-react';
import { useApp, Screen } from './AppContext';

export const BottomNavigation: React.FC = () => {
  const { currentScreen, setCurrentScreen } = useApp();

  const navItems = [
    { icon: Home, label: 'Home', screen: 'home' as Screen },
    { icon: Shirt, label: 'Wardrobe', screen: 'wardrobe' as Screen },
    { icon: Sparkles, label: 'Suggestions', screen: 'suggestions' as Screen },
    { icon: BarChart3, label: 'Stats', screen: 'stats' as Screen },
    { icon: User, label: 'Profile', screen: 'profile' as Screen }
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 px-6 pb-8">
      <div className="flex justify-around items-center bg-white/90 backdrop-blur-md rounded-2xl py-3 shadow-lg">
        {navItems.map((item, index) => (
          <button 
            key={index} 
            className="flex flex-col items-center space-y-1 transition-colors duration-200"
            onClick={() => setCurrentScreen(item.screen)}
          >
            <item.icon className={`w-5 h-5 ${currentScreen === item.screen ? 'text-rose-400' : 'text-muted-foreground'}`} />
            <span className={`text-xs ${currentScreen === item.screen ? 'text-rose-400' : 'text-muted-foreground'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};