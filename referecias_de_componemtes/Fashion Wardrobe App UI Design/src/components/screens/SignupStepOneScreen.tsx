import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

export interface SignupStepOneData {
  email: string;
  password: string;
  username: string;
  displayName: string;
  gender: string;
  acceptedTerms: boolean;
}

interface SignupStepOneScreenProps {
  onNext: (data: SignupStepOneData) => void;
  onBack: () => void;
  initialData?: Partial<SignupStepOneData>;
}

export const SignupStepOneScreen: React.FC<SignupStepOneScreenProps> = ({ onNext, onBack, initialData }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<SignupStepOneData>({
    email: initialData?.email || '',
    password: initialData?.password || '',
    username: initialData?.username || '',
    displayName: initialData?.displayName || '',
    gender: initialData?.gender || '',
    acceptedTerms: initialData?.acceptedTerms || false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SignupStepOneData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof SignupStepOneData, string>> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.displayName) {
      newErrors.displayName = 'Display name is required';
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select a gender';
    }

    if (!formData.acceptedTerms) {
      newErrors.acceptedTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext(formData);
    }
  };

  const handleChange = (field: keyof SignupStepOneData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-rose-50 via-white to-blue-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-rose-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-blue-100/30 rounded-full blur-3xl" />
      
      {/* Header with back button */}
      <div className="pt-8 px-6 relative z-10">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back to login</span>
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
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" className="text-rose-400" />
                  <circle cx="12" cy="12" r="4" fill="currentColor" className="text-rose-400/20" />
                  <circle cx="36" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" className="text-rose-400" />
                  <circle cx="36" cy="12" r="4" fill="currentColor" className="text-rose-400/20" />
                  <line x1="22" y1="12" x2="26" y2="12" stroke="currentColor" strokeWidth="2" className="text-rose-400" />
                  <path d="M 2 12 L -1 13" stroke="currentColor" strokeWidth="1.5" className="text-rose-400/60" strokeLinecap="round" />
                  <path d="M 46 12 L 49 13" stroke="currentColor" strokeWidth="1.5" className="text-rose-400/60" strokeLinecap="round" />
                </g>
                <text x="74" y="36" className="fill-foreground" style={{ fontSize: '38px', fontWeight: '300', letterSpacing: '-1px' }}>kit</text>
              </svg>
            </div>
            <h2 className="text-xl text-foreground mb-1">Create your account</h2>
            <p className="text-sm text-muted-foreground">Step 1 of 2 · Essential information</p>
          </div>

          {/* Signup form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-foreground">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`h-11 bg-white/80 backdrop-blur-sm border-border/50 rounded-xl focus:border-rose-300 focus:ring-rose-200 transition-all ${
                  errors.email ? 'border-red-400' : ''
                }`}
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm text-foreground">Password *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="At least 6 characters"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className={`h-11 bg-white/80 backdrop-blur-sm border-border/50 rounded-xl focus:border-rose-300 focus:ring-rose-200 pr-12 transition-all ${
                    errors.password ? 'border-red-400' : ''
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm text-foreground">Username *</Label>
              <Input
                id="username"
                type="text"
                placeholder="@yourusername"
                value={formData.username}
                onChange={(e) => handleChange('username', e.target.value.toLowerCase().replace(/\s/g, ''))}
                className={`h-11 bg-white/80 backdrop-blur-sm border-border/50 rounded-xl focus:border-rose-300 focus:ring-rose-200 transition-all ${
                  errors.username ? 'border-red-400' : ''
                }`}
              />
              {errors.username && <p className="text-xs text-red-500">{errors.username}</p>}
            </div>

            {/* Display Name */}
            <div className="space-y-2">
              <Label htmlFor="displayName" className="text-sm text-foreground">Display name *</Label>
              <Input
                id="displayName"
                type="text"
                placeholder="Your name or nickname"
                value={formData.displayName}
                onChange={(e) => handleChange('displayName', e.target.value)}
                className={`h-11 bg-white/80 backdrop-blur-sm border-border/50 rounded-xl focus:border-rose-300 focus:ring-rose-200 transition-all ${
                  errors.displayName ? 'border-red-400' : ''
                }`}
              />
              {errors.displayName && <p className="text-xs text-red-500">{errors.displayName}</p>}
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label className="text-sm text-foreground">Gender * <span className="text-xs text-muted-foreground">(for personalized suggestions)</span></Label>
              <RadioGroup
                value={formData.gender}
                onValueChange={(value) => handleChange('gender', value)}
                className="grid grid-cols-3 gap-3 pt-2"
              >
                {['Male', 'Female', 'Other'].map((option) => (
                  <div key={option}>
                    <RadioGroupItem
                      value={option.toLowerCase()}
                      id={option.toLowerCase()}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={option.toLowerCase()}
                      className={`flex items-center justify-center h-11 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.gender === option.toLowerCase()
                          ? 'bg-rose-50 border-rose-300 text-rose-700'
                          : 'bg-white/80 border-border/50 text-muted-foreground hover:border-border'
                      }`}
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {errors.gender && <p className="text-xs text-red-500">{errors.gender}</p>}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-3 pt-2">
              <Checkbox
                id="terms"
                checked={formData.acceptedTerms}
                onCheckedChange={(checked) => handleChange('acceptedTerms', checked as boolean)}
                className={`mt-1 ${errors.acceptedTerms ? 'border-red-400' : ''}`}
              />
              <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                I accept the{' '}
                <button type="button" className="text-foreground hover:text-rose-400 transition-colors">
                  terms and conditions
                </button>
                {' '}and{' '}
                <button type="button" className="text-foreground hover:text-rose-400 transition-colors">
                  privacy policy
                </button>
              </Label>
            </div>
            {errors.acceptedTerms && <p className="text-xs text-red-500">{errors.acceptedTerms}</p>}

            {/* Next button */}
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white rounded-xl shadow-lg transition-all duration-200 active:scale-[0.98] mt-6"
            >
              Next
            </Button>
          </form>

          {/* Already have account */}
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onBack}
                className="text-foreground hover:text-rose-400 transition-colors"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
