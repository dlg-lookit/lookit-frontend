import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Switch } from '../ui/switch';
import { ArrowLeft, Shirt, Wind, Glasses, Sparkles, Users, Briefcase, PartyPopper } from 'lucide-react';

export interface SignupStepTwoData {
  preferredStyles: string[];
  shirtSize: string;
  pantsSize: string;
  shoeSize: string;
  birthday: string;
  biometricEnabled: boolean;
}

interface SignupStepTwoScreenProps {
  onComplete: (data: SignupStepTwoData) => void;
  onBack: () => void;
  onSkip: () => void;
}

const styleOptions = [
  { id: 'casual', label: 'Casual', icon: Shirt, color: 'from-blue-400 to-blue-500' },
  { id: 'streetwear', label: 'Streetwear', icon: Wind, color: 'from-purple-400 to-purple-500' },
  { id: 'formal', label: 'Formal', icon: Briefcase, color: 'from-gray-600 to-gray-700' },
  { id: 'minimal', label: 'Minimal', icon: Sparkles, color: 'from-rose-400 to-pink-400' },
  { id: 'bohemian', label: 'Bohemian', icon: PartyPopper, color: 'from-amber-400 to-orange-400' },
  { id: 'classic', label: 'Classic', icon: Glasses, color: 'from-emerald-400 to-teal-400' },
];

export const SignupStepTwoScreen: React.FC<SignupStepTwoScreenProps> = ({ onComplete, onBack, onSkip }) => {
  const [formData, setFormData] = useState<SignupStepTwoData>({
    preferredStyles: [],
    shirtSize: '',
    pantsSize: '',
    shoeSize: '',
    birthday: '',
    biometricEnabled: false,
  });

  const handleStyleToggle = (styleId: string) => {
    setFormData(prev => ({
      ...prev,
      preferredStyles: prev.preferredStyles.includes(styleId)
        ? prev.preferredStyles.filter(s => s !== styleId)
        : [...prev.preferredStyles, styleId],
    }));
  };

  const handleComplete = () => {
    onComplete(formData);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-purple-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-purple-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-indigo-100/30 rounded-full blur-3xl" />
      
      {/* Header */}
      <div className="pt-8 px-6 relative z-10">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto px-8 pb-8 relative z-10">
        <div className="w-full max-w-sm mx-auto">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-3">
              <svg width="140" height="48" viewBox="0 0 140 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="36" className="fill-foreground" style={{ fontSize: '38px', fontWeight: '300', letterSpacing: '-1px' }}>L</text>
                <g transform="translate(23, 14)">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" className="text-purple-400" />
                  <circle cx="12" cy="12" r="4" fill="currentColor" className="text-purple-400/20" />
                  <circle cx="36" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" className="text-purple-400" />
                  <circle cx="36" cy="12" r="4" fill="currentColor" className="text-purple-400/20" />
                  <line x1="22" y1="12" x2="26" y2="12" stroke="currentColor" strokeWidth="2" className="text-purple-400" />
                  <path d="M 2 12 L -1 13" stroke="currentColor" strokeWidth="1.5" className="text-purple-400/60" strokeLinecap="round" />
                  <path d="M 46 12 L 49 13" stroke="currentColor" strokeWidth="1.5" className="text-purple-400/60" strokeLinecap="round" />
                </g>
                <text x="74" y="36" className="fill-foreground" style={{ fontSize: '38px', fontWeight: '300', letterSpacing: '-1px' }}>kit</text>
              </svg>
            </div>
            <h2 className="text-xl text-foreground mb-1">Personalize your experience</h2>
            <p className="text-sm text-muted-foreground">Step 2 of 2 · Optional preferences</p>
          </div>

          {/* Preferred Styles */}
          <div className="mb-6">
            <Label className="text-sm text-foreground mb-3 block">What's your style? (Select all that apply)</Label>
            <div className="grid grid-cols-2 gap-3">
              {styleOptions.map((style) => {
                const Icon = style.icon;
                const isSelected = formData.preferredStyles.includes(style.id);
                return (
                  <Card
                    key={style.id}
                    onClick={() => handleStyleToggle(style.id)}
                    className={`p-4 cursor-pointer transition-all duration-200 border-2 ${
                      isSelected
                        ? 'border-purple-300 bg-purple-50 shadow-md'
                        : 'border-border/50 bg-white/80 hover:border-border'
                    }`}
                  >
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${style.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className={`text-sm ${isSelected ? 'text-purple-700' : 'text-muted-foreground'}`}>
                        {style.label}
                      </span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Sizes */}
          <div className="mb-6">
            <Label className="text-sm text-foreground mb-3 block">Your sizes (Optional)</Label>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label htmlFor="shirtSize" className="text-xs text-muted-foreground">Shirt</Label>
                <Input
                  id="shirtSize"
                  type="text"
                  placeholder="S/M/L"
                  value={formData.shirtSize}
                  onChange={(e) => setFormData(prev => ({ ...prev, shirtSize: e.target.value.toUpperCase() }))}
                  className="h-11 bg-white/80 backdrop-blur-sm border-border/50 rounded-xl focus:border-purple-300 focus:ring-purple-200 text-center"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pantsSize" className="text-xs text-muted-foreground">Pants</Label>
                <Input
                  id="pantsSize"
                  type="text"
                  placeholder="30/32"
                  value={formData.pantsSize}
                  onChange={(e) => setFormData(prev => ({ ...prev, pantsSize: e.target.value }))}
                  className="h-11 bg-white/80 backdrop-blur-sm border-border/50 rounded-xl focus:border-purple-300 focus:ring-purple-200 text-center"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shoeSize" className="text-xs text-muted-foreground">Shoes</Label>
                <Input
                  id="shoeSize"
                  type="text"
                  placeholder="9/10"
                  value={formData.shoeSize}
                  onChange={(e) => setFormData(prev => ({ ...prev, shoeSize: e.target.value }))}
                  className="h-11 bg-white/80 backdrop-blur-sm border-border/50 rounded-xl focus:border-purple-300 focus:ring-purple-200 text-center"
                />
              </div>
            </div>
          </div>

          {/* Birthday */}
          <div className="mb-6">
            <Label htmlFor="birthday" className="text-sm text-foreground mb-2 block">
              Birthday (Optional) <span className="text-xs text-muted-foreground">— for personalized recommendations</span>
            </Label>
            <Input
              id="birthday"
              type="date"
              value={formData.birthday}
              onChange={(e) => setFormData(prev => ({ ...prev, birthday: e.target.value }))}
              className="h-11 bg-white/80 backdrop-blur-sm border-border/50 rounded-xl focus:border-purple-300 focus:ring-purple-200"
            />
          </div>

          {/* Biometric Login */}
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-border/50 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <Label htmlFor="biometric" className="text-sm text-foreground">Enable biometric login</Label>
                <p className="text-xs text-muted-foreground mt-1">Use Face ID or fingerprint to sign in</p>
              </div>
              <Switch
                id="biometric"
                checked={formData.biometricEnabled}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, biometricEnabled: checked }))}
              />
            </div>
          </Card>

          {/* Action buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleComplete}
              className="w-full h-12 bg-gradient-to-r from-purple-400 to-indigo-400 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl shadow-lg transition-all duration-200 active:scale-[0.98]"
            >
              Start using Lookit
            </Button>
            
            <button
              type="button"
              onClick={onSkip}
              className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
