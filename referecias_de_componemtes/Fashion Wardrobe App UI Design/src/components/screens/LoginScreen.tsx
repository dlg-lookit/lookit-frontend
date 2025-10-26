import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Eye, EyeOff } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (email: string, password: string) => void;
  onSignup: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email, password);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-rose-50 via-white to-blue-50 justify-center items-center px-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-rose-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-blue-100/30 rounded-full blur-3xl" />
      
      {/* Main content */}
      <div className="w-full max-w-sm relative z-10">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-3">
            <svg width="180" height="60" viewBox="0 0 180 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* L */}
              <text x="0" y="45" className="fill-foreground" style={{ fontSize: '48px', fontWeight: '300', letterSpacing: '-1px' }}>L</text>
              
              {/* OO as minimalist glasses */}
              <g transform="translate(30, 18)">
                {/* Left lens */}
                <circle cx="15" cy="15" r="13" stroke="currentColor" strokeWidth="2.5" fill="none" className="text-rose-400" />
                <circle cx="15" cy="15" r="5" fill="currentColor" className="text-rose-400/20" />
                
                {/* Right lens */}
                <circle cx="45" cy="15" r="13" stroke="currentColor" strokeWidth="2.5" fill="none" className="text-rose-400" />
                <circle cx="45" cy="15" r="5" fill="currentColor" className="text-rose-400/20" />
                
                {/* Bridge connecting the lenses */}
                <line x1="28" y1="15" x2="32" y2="15" stroke="currentColor" strokeWidth="2.5" className="text-rose-400" />
                
                {/* Left temple (arm) */}
                <path d="M 2 15 L -2 16" stroke="currentColor" strokeWidth="2" className="text-rose-400/60" strokeLinecap="round" />
                
                {/* Right temple (arm) */}
                <path d="M 58 15 L 62 16" stroke="currentColor" strokeWidth="2" className="text-rose-400/60" strokeLinecap="round" />
              </g>
              
              {/* kit */}
              <text x="95" y="45" className="fill-foreground" style={{ fontSize: '48px', fontWeight: '300', letterSpacing: '-1px' }}>kit</text>
            </svg>
          </div>
          
          <p className="text-sm text-muted-foreground">Your personal style companion</p>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email input */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-foreground">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-white/80 backdrop-blur-sm border-border/50 rounded-xl focus:border-rose-300 focus:ring-rose-200 transition-all"
              required
            />
          </div>

          {/* Password input */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm text-foreground">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 bg-white/80 backdrop-blur-sm border-border/50 rounded-xl focus:border-rose-300 focus:ring-rose-200 pr-12 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Forgot password link */}
          <div className="text-right">
            <button
              type="button"
              className="text-xs text-muted-foreground hover:text-rose-400 transition-colors"
            >
              Forgot password?
            </button>
          </div>

          {/* Login button */}
          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white rounded-xl shadow-lg transition-all duration-200 active:scale-[0.98] mt-6"
          >
            Login
          </Button>
        </form>

        {/* Sign up link */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onSignup}
              className="text-foreground hover:text-rose-400 transition-colors"
            >
              Sign up
            </button>
          </p>
        </div>

        {/* Demo hint */}
        <div className="mt-10 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-border/30">
          <p className="text-xs text-center text-muted-foreground">
            Demo: Enter any email and password to login, or click "Sign up" to explore the registration flow
          </p>
        </div>
      </div>
    </div>
  );
};
