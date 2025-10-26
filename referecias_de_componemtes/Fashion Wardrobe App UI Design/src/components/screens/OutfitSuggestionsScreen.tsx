import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Heart, Shirt, Bookmark, Cloud, ChevronDown } from 'lucide-react';
import { BottomNavigation } from '../BottomNavigation';
import { useApp } from '../AppContext';

export const OutfitSuggestionsScreen: React.FC = () => {
  const { user } = useApp();
  const [likedOutfits, setLikedOutfits] = useState<number[]>([1]);
  const [savedOutfits, setSavedOutfits] = useState<number[]>([]);

  const outfitSuggestions = [
    {
      image: 'https://images.unsplash.com/photo-1524282745852-a463fa495a7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwZmFzaGlvbiUyMGNsb3RoaW5nJTIwb3V0Zml0fGVufDF8fHx8MTc1NTA5ODY2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      style: 'Minimalist',
      match: '96%',
      weather: 'Perfect for cloudy weather',
      id: 0
    },
    {
      image: 'https://images.unsplash.com/photo-1736555142217-916540c7f1b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtaW5pbWFsaXN0JTIwb3V0Zml0fGVufDF8fHx8MTc1NTA5ODY2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      style: 'Modern Casual',
      match: '92%',
      weather: 'Great for mild temperatures',
      id: 1
    },
    {
      image: 'https://images.unsplash.com/photo-1524498250077-390f9e378fc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBmYXNoaW9uJTIwc3R5bGV8ZW58MXx8fHwxNzU1MDk4NjY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      style: 'Smart Casual',
      match: '89%',
      weather: 'Ideal for office wear',
      id: 2
    }
  ];

  const toggleLike = (id: number) => {
    setLikedOutfits(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleSave = (id: number) => {
    setSavedOutfits(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-purple-50 to-pink-50 pt-12 relative">
      {/* Header */}
      <div className="px-6 py-4">
        <h1 className="text-2xl text-foreground mb-4">Outfit Suggestions</h1>
        
        {/* Filters */}
        <div className="flex space-x-2 mb-4">
          <Button variant="outline" className="rounded-full px-4 py-2 text-sm bg-white/80 border-purple-200">
            <Cloud className="w-4 h-4 mr-2" />
            {user.temperature}°C Cloudy
            <ChevronDown className="w-3 h-3 ml-2" />
          </Button>
          <Button variant="outline" className="rounded-full px-4 py-2 text-sm bg-white/80 border-purple-200">
            Style Match
            <ChevronDown className="w-3 h-3 ml-2" />
          </Button>
        </div>
      </div>

      {/* Suggestions List */}
      <div className="flex-1 px-6 pb-24 space-y-6 overflow-y-auto">
        {outfitSuggestions.map((outfit, index) => (
          <Card key={index} className="bg-white/90 backdrop-blur-sm border-0 shadow-sm rounded-2xl overflow-hidden">
            {/* Outfit Image */}
            <div className="relative h-64">
              <ImageWithFallback 
                src={outfit.image}
                alt={`Outfit suggestion ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-purple-400 text-white px-3 py-1 rounded-full text-xs">
                  {outfit.match} match
                </Badge>
              </div>
            </div>

            {/* Outfit Details */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg text-foreground">{outfit.style}</h3>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`rounded-full p-2 transition-colors duration-200 ${
                      likedOutfits.includes(outfit.id) ? 'text-red-400' : 'text-muted-foreground'
                    }`}
                    onClick={() => toggleLike(outfit.id)}
                  >
                    <Heart className={`w-5 h-5 ${likedOutfits.includes(outfit.id) ? 'fill-current' : ''}`} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`rounded-full p-2 transition-colors duration-200 ${
                      savedOutfits.includes(outfit.id) ? 'text-purple-400' : 'text-muted-foreground'
                    }`}
                    onClick={() => toggleSave(outfit.id)}
                  >
                    <Bookmark className={`w-5 h-5 ${savedOutfits.includes(outfit.id) ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">{outfit.weather}</p>
              
              <div className="flex space-x-2">
                <Button className="flex-1 bg-purple-400 hover:bg-purple-500 text-white rounded-xl transition-colors duration-200">
                  <Shirt className="w-4 h-4 mr-2" />
                  Try On
                </Button>
                <Button 
                  variant="outline" 
                  className={`px-6 rounded-xl border-purple-200 transition-colors duration-200 ${
                    savedOutfits.includes(outfit.id) ? 'bg-purple-50 border-purple-300' : ''
                  }`}
                  onClick={() => toggleSave(outfit.id)}
                >
                  {savedOutfits.includes(outfit.id) ? 'Saved' : 'Save'}
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {/* Sponsored Content */}
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 rounded-2xl p-4 cursor-pointer hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <span className="text-lg">👗</span>
            </div>
            <div className="flex-1">
              <h4 className="text-sm text-foreground">Zara: Shop this look</h4>
              <p className="text-xs text-muted-foreground">Curated pieces matching your style</p>
            </div>
            <Button variant="outline" size="sm" className="rounded-full border-amber-300 text-amber-700">
              Shop
            </Button>
          </div>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};