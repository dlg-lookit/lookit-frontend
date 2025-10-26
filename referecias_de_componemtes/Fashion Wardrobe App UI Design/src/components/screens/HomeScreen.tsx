import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Sun, Cloud, Shirt } from 'lucide-react';
import { useApp } from '../AppContext';
import { BottomNavigation } from '../BottomNavigation';

export const HomeScreen: React.FC = () => {
  const { user, setCurrentScreen } = useApp();

  const handleDressMeToday = () => {
    setCurrentScreen('suggestions');
  };

  const handleViewWardrobe = () => {
    setCurrentScreen('wardrobe');
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-rose-50 to-blue-50 pt-12 relative">
      {/* Header with greeting and weather */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-xl text-foreground">Hi {user.name} 👋</span>
            <span className="text-muted-foreground">·</span>
            <div className="flex items-center space-x-1">
              <Cloud className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-muted-foreground">{user.temperature}°C in {user.location}</span>
            </div>
          </div>
        </div>

        {/* Main CTA Button */}
        <Button 
          className="w-full h-16 bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white rounded-2xl mb-6 text-lg shadow-lg transition-all duration-200 active:scale-95"
          onClick={handleDressMeToday}
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Shirt className="w-5 h-5" />
            </div>
            <span>Dress me today</span>
          </div>
        </Button>
      </div>

      {/* Content Section */}
      <div className="flex-1 px-6 pb-24">
        {/* Last outfit worn */}
        <Card 
          className="p-4 mb-6 bg-white/80 backdrop-blur-sm border-0 shadow-sm rounded-2xl cursor-pointer hover:shadow-md transition-shadow duration-200"
          onClick={handleViewWardrobe}
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1524282745852-a463fa495a7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwZmFzaGlvbiUyMGNsb3RoaW5nJTIwb3V0Zml0fGVufDF8fHx8MTc1NTA5ODY2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Last outfit"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-sm text-foreground">Last outfit worn</h3>
              <p className="text-xs text-muted-foreground">Yesterday • Smart Casual</p>
            </div>
            <div className="text-xs text-muted-foreground">→</div>
          </div>
        </Card>

        {/* Today's suggestions */}
        <div className="mb-6">
          <h3 className="text-lg text-foreground mb-3">Today's suggestions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { image: "https://images.unsplash.com/photo-1736555142217-916540c7f1b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtaW5pbWFsaXN0JTIwb3V0Zml0fGVufDF8fHx8MTc1NTA5ODY2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", style: "Minimal", match: "96%" },
              { image: "https://images.unsplash.com/photo-1524498250077-390f9e378fc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBmYXNoaW9uJTIwc3R5bGV8ZW58MXx8fHwxNzU1MDk4NjY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", style: "Casual", match: "89%" }
            ].map((outfit, index) => (
              <Card 
                key={index} 
                className="p-3 bg-white/80 backdrop-blur-sm border-0 shadow-sm rounded-xl cursor-pointer hover:shadow-md transition-shadow duration-200"
                onClick={handleDressMeToday}
              >
                <div className="w-full h-20 rounded-lg overflow-hidden mb-2">
                  <ImageWithFallback 
                    src={outfit.image}
                    alt={`Outfit suggestion ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs text-foreground">{outfit.style}</p>
                <p className="text-xs text-muted-foreground">{outfit.match} match</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};