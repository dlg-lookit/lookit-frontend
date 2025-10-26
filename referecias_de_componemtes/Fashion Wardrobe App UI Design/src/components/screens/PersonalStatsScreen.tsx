import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Trophy, Flame, Share2, TrendingUp, Shirt, Award } from 'lucide-react';
import { BottomNavigation } from '../BottomNavigation';
import { useApp } from '../AppContext';

export const PersonalStatsScreen: React.FC = () => {
  const { wardrobeStreak } = useApp();
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const mostUsedItems = [
    { name: 'Blue Jeans', count: 15 },
    { name: 'White Tee', count: 12 },
    { name: 'Black Sneakers', count: 18 },
    { name: 'Denim Jacket', count: 8 }
  ];

  const wardrobeUsage = [
    { name: 'Frequently Used', value: 35, color: '#10B981' },
    { name: 'Occasionally Used', value: 45, color: '#F59E0B' },
    { name: 'Rarely Used', value: 20, color: '#EF4444' }
  ];

  const achievements = [
    { title: 'Style Explorer', description: 'Tried 5 different styles this month', icon: '🎨', unlocked: true },
    { title: 'Eco-Conscious', description: 'Rewore outfits 10+ times', icon: '🌱', unlocked: true },
    { title: 'Trendsetter', description: 'Created 3 unique combinations', icon: '⭐', unlocked: false },
    { title: 'Minimalist', description: '80% wardrobe usage rate', icon: '✨', unlocked: false }
  ];

  const handleShare = () => {
    setShareModalOpen(true);
    setTimeout(() => {
      setShareModalOpen(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-indigo-50 to-purple-50 pt-12 relative">
      {/* Header */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl text-foreground">My Stats</h1>
          <Button variant="ghost" size="sm" className="rounded-full" onClick={handleShare}>
            <Share2 className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-24 space-y-6 overflow-y-auto">
        {/* Daily Streak */}
        <Card className="bg-gradient-to-r from-orange-100 to-amber-100 border-0 shadow-sm rounded-2xl p-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full flex items-center justify-center">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg text-foreground">{wardrobeStreak} Day Streak!</h3>
              <p className="text-sm text-muted-foreground">Without repeating outfits</p>
            </div>
            <div className="text-right">
              <div className="text-2xl text-orange-600">{wardrobeStreak}</div>
              <div className="text-xs text-muted-foreground">days</div>
            </div>
          </div>
        </Card>

        {/* Most Used Items Chart */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-sm rounded-2xl p-4">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-muted-foreground" />
            <h3 className="text-lg text-foreground">Most Used Items</h3>
          </div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mostUsedItems}>
                <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-around mt-2">
            {mostUsedItems.map((item, index) => (
              <div key={index} className="text-center">
                <p className="text-xs text-muted-foreground">{item.name}</p>
                <p className="text-sm text-indigo-600">{item.count}x</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Wardrobe Usage */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-sm rounded-2xl p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Shirt className="w-5 h-5 text-muted-foreground" />
            <h3 className="text-lg text-foreground">Wardrobe Usage</h3>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={wardrobeUsage}
                    cx="50%"
                    cy="50%"
                    innerRadius={25}
                    outerRadius={40}
                    dataKey="value"
                  >
                    {wardrobeUsage.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {wardrobeUsage.map((usage, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: usage.color }}
                  />
                  <span className="text-sm text-foreground flex-1">{usage.name}</span>
                  <span className="text-sm text-muted-foreground">{usage.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Achievements */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-sm rounded-2xl p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Trophy className="w-5 h-5 text-muted-foreground" />
            <h3 className="text-lg text-foreground">Achievements</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  achievement.unlocked 
                    ? 'bg-yellow-50 border-yellow-300 hover:shadow-sm' 
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-2">{achievement.icon}</div>
                <h4 className={`text-sm mb-1 ${achievement.unlocked ? 'text-yellow-700' : 'text-muted-foreground'}`}>
                  {achievement.title}
                </h4>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
                {achievement.unlocked && (
                  <Badge className="mt-2 bg-yellow-100 text-yellow-700 border-yellow-300 text-xs">
                    <Award className="w-3 h-3 mr-1" />
                    Unlocked
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Share Progress Button */}
      <div className="absolute bottom-24 left-6 right-6">
        <Button 
          className="w-full bg-gradient-to-r from-indigo-400 to-purple-400 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl h-12 transition-all duration-200"
          onClick={handleShare}
        >
          <Share2 className="w-5 h-5 mr-2" />
          Share my style progress
        </Button>
      </div>

      {/* Share Modal */}
      {shareModalOpen && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 mx-6 max-w-sm w-full">
            <div className="text-center">
              <Share2 className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
              <h3 className="text-lg text-foreground mb-2">Sharing Progress</h3>
              <p className="text-sm text-muted-foreground">Your style journey is being shared...</p>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
};