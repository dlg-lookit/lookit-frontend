import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Edit3, Palette, Star, LogOut } from 'lucide-react';
import { BottomNavigation } from '../BottomNavigation';
import { useApp } from '../AppContext';

export const StyleProfileScreen: React.FC = () => {
  const { logout } = useApp();
  const [selectedStyles, setSelectedStyles] = useState<string[]>(['Minimalist', 'Smart-Casual', 'Urban']);
  
  const stylePreferences = [
    { name: 'Minimalist', description: 'Clean lines & simple silhouettes' },
    { name: 'Smart-Casual', description: 'Polished yet relaxed' },
    { name: 'Urban', description: 'Street-inspired & contemporary' },
    { name: 'Bohemian', description: 'Free-spirited & artistic' },
    { name: 'Classic', description: 'Timeless & elegant' },
    { name: 'Trendy', description: 'Fashion-forward & current' }
  ];

  const favoriteColors = ['#000000', '#FFFFFF', '#F5F5DC', '#8B7355', '#2F4F4F'];
  const favoriteBrands = ['Zara', 'Uniqlo', 'COS', 'Everlane', 'Arket'];

  const toggleStyle = (styleName: string) => {
    setSelectedStyles(prev => 
      prev.includes(styleName) 
        ? prev.filter(style => style !== styleName)
        : [...prev, styleName]
    );
  };

  const handleUpdateStyle = () => {
    // Simulate API call
    console.log('Updating style preferences:', selectedStyles);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-emerald-50 to-teal-50 pt-12 relative">
      {/* Header */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl text-foreground">Style Profile</h1>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="rounded-full">
              <Edit3 className="w-5 h-5 text-muted-foreground" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="rounded-full"
              onClick={logout}
            >
              <LogOut className="w-5 h-5 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-24 space-y-6 overflow-y-auto">
        {/* Style Quiz Result */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-sm rounded-2xl p-6">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Star className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-xl text-foreground mb-2">Modern Minimalist</h2>
            <p className="text-sm text-muted-foreground">
              Your style is characterized by clean lines, neutral colors, and thoughtful simplicity
            </p>
          </div>
        </Card>

        {/* Selected Styles */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-sm rounded-2xl p-4">
          <h3 className="text-lg text-foreground mb-4">Your Style Preferences</h3>
          <div className="grid grid-cols-2 gap-3">
            {stylePreferences.map((style, index) => {
              const isSelected = selectedStyles.includes(style.name);
              return (
                <div 
                  key={index} 
                  className={`p-3 rounded-xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-300 shadow-sm' 
                      : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => toggleStyle(style.name)}
                >
                  <h4 className={`text-sm mb-1 ${isSelected ? 'text-emerald-700' : 'text-muted-foreground'}`}>
                    {style.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">{style.description}</p>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Favorite Colors */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-sm rounded-2xl p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Palette className="w-5 h-5 text-muted-foreground" />
            <h3 className="text-lg text-foreground">Favorite Colors</h3>
          </div>
          <div className="flex space-x-3">
            {favoriteColors.map((color, index) => (
              <div 
                key={index}
                className="w-10 h-10 rounded-full shadow-md border-2 border-white cursor-pointer hover:scale-110 transition-transform duration-200"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </Card>

        {/* Favorite Brands */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-sm rounded-2xl p-4">
          <h3 className="text-lg text-foreground mb-4">Favorite Brands</h3>
          <div className="flex flex-wrap gap-2">
            {favoriteBrands.map((brand, index) => (
              <Badge 
                key={index}
                className="px-3 py-1.5 bg-emerald-100 text-emerald-700 border-emerald-200 rounded-full text-sm cursor-pointer hover:bg-emerald-200 transition-colors duration-200"
              >
                {brand}
              </Badge>
            ))}
          </div>
        </Card>
      </div>

      {/* Update Button */}
      <div className="absolute bottom-24 left-6 right-6">
        <Button 
          className="w-full bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl h-12 transition-all duration-200"
          onClick={handleUpdateStyle}
        >
          Update My Style
        </Button>
      </div>

      <BottomNavigation />
    </div>
  );
};