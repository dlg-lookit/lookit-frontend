import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Plus, Camera, Filter, Search } from 'lucide-react';
import { BottomNavigation } from '../BottomNavigation';

export const WardrobeScreen: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const wardrobeItems = [
    { name: 'White T-Shirt', category: 'Tops', worn: '3x this month', image: 'https://images.unsplash.com/photo-1524282745852-a463fa495a7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwZmFzaGlvbiUyMGNsb3RoaW5nJTIwb3V0Zml0fGVufDF8fHx8MTc1NTA5ODY2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { name: 'Blue Jeans', category: 'Bottoms', worn: '5x this month', image: 'https://images.unsplash.com/photo-1655252205431-5d0ef316837b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJkcm9iZSUyMGNsb3NldCUyMGNsb3RoZXN8ZW58MXx8fHwxNzU1MDk4NjY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { name: 'Black Sneakers', category: 'Shoes', worn: '7x this month', image: 'https://images.unsplash.com/photo-1565953198075-db265882ee68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYWNjZXNzb3JpZXMlMjBzaG9lc3xlbnwxfHx8fDE3NTUwOTg2NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { name: 'Beige Coat', category: 'Outerwear', worn: '2x this month', image: 'https://images.unsplash.com/photo-1524498250077-390f9e378fc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBmYXNoaW9uJTIwc3R5bGV8ZW58MXx8fHwxNzU1MDk4NjY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { name: 'Cotton Dress', category: 'Dresses', worn: '1x this month', image: 'https://images.unsplash.com/photo-1736555142217-916540c7f1b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtaW5pbWFsaXN0JTIwb3V0Zml0fGVufDF8fHx8MTc1NTA5ODY2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { name: 'Leather Bag', category: 'Accessories', worn: '4x this month', image: 'https://images.unsplash.com/photo-1655252205431-5d0ef316837b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJkcm9iZSUyMGNsb3NldCUyMGNsb3RoZXN8ZW58MXx8fHwxNzU1MDk4NjY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' }
  ];

  const filters = ['All', 'Tops', 'Bottoms', 'Shoes', 'Accessories'];

  const filteredItems = activeFilter === 'All' 
    ? wardrobeItems 
    : wardrobeItems.filter(item => item.category === activeFilter);

  const handleAddItem = () => {
    setShowAddModal(true);
    // Simulate camera/photo picker
    setTimeout(() => {
      setShowAddModal(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 to-indigo-50 pt-12 relative">
      {/* Header */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl text-foreground">My Wardrobe</h1>
          <Button variant="ghost" size="sm" className="rounded-full">
            <Search className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>

        {/* Filters */}
        <div className="flex space-x-2 mb-4 overflow-x-auto">
          {filters.map((filter, index) => (
            <Badge 
              key={index}
              variant={filter === activeFilter ? "default" : "secondary"}
              className={`px-3 py-1.5 rounded-full text-xs cursor-pointer transition-colors duration-200 whitespace-nowrap ${
                filter === activeFilter 
                  ? 'bg-indigo-400 text-white' 
                  : 'bg-white/80 text-muted-foreground hover:bg-white'
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Badge>
          ))}
          <Button variant="ghost" size="sm" className="rounded-full">
            <Filter className="w-4 h-4 text-muted-foreground" />
          </Button>
        </div>
      </div>

      {/* Wardrobe Grid */}
      <div className="flex-1 px-6 pb-24 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          {filteredItems.map((item, index) => (
            <div 
              key={index} 
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-200"
            >
              <div className="w-full h-32 rounded-xl overflow-hidden mb-3">
                <ImageWithFallback 
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-sm text-foreground mb-1">{item.name}</h3>
              <p className="text-xs text-muted-foreground mb-2">{item.category}</p>
              <Badge variant="outline" className="text-xs px-2 py-0.5 bg-green-50 text-green-600 border-green-200">
                {item.worn}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Add Button */}
      <div className="absolute bottom-24 right-6">
        <Button 
          className="w-14 h-14 bg-gradient-to-r from-indigo-400 to-blue-400 hover:from-indigo-500 hover:to-blue-500 text-white rounded-full shadow-lg transition-all duration-200 active:scale-95"
          onClick={handleAddItem}
        >
          <div className="flex flex-col items-center">
            <Plus className="w-5 h-5 mb-0.5" />
            <Camera className="w-3 h-3" />
          </div>
        </Button>
      </div>

      {/* Add Item Modal Simulation */}
      {showAddModal && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 mx-6 max-w-sm w-full">
            <div className="text-center">
              <Camera className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
              <h3 className="text-lg text-foreground mb-2">Add New Item</h3>
              <p className="text-sm text-muted-foreground">Opening camera to capture your clothing item...</p>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
};