import React, { useState } from 'react';
import { supabase } from '../supabase';
import { AlertTriangle, Lock, Mail, User, MapPin, CheckCircle, ShieldAlert, Sparkles } from 'lucide-react';

// List of predefined Indian states for selection
const STATES = [
  'Andhra Pradesh', 'Bihar', 'Delhi', 'Gujarat', 'Haryana', 
  'Karnataka', 'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan', 'Uttar Pradesh'
];

// Test locations mapping to weather background profiles
const TEST_LOCATIONS = [
  { city: 'Delhi', district: 'New Delhi', state: 'Delhi', condition: 'Sunny & Hot (Mostly Sunny)' },
  { city: 'Mumbai', district: 'Mumbai City', state: 'Maharashtra', condition: 'Heavy Rain & Storms' },
  { city: 'Bangalore', district: 'Bengaluru Urban', state: 'Karnataka', condition: 'Mostly Cloudy' },
  { city: 'Kolkata', district: 'Kolkata', state: 'West Bengal', condition: 'Thunderstorms' },
  { city: 'Indore', district: 'Indore', state: 'Madhya Pradesh', condition: 'Partly Sunny / Normal' },
  { city: 'Srinagar', district: 'Srinagar', state: 'Jammu & Kashmir', condition: 'Frost & Freeze (Snow)' },
  { city: 'Jaisalmer', district: 'Jaisalmer', state: 'Rajasthan', condition: 'Heatwave & Dust' },
  { city: 'Amritsar', district: 'Amritsar', state: 'Punjab', condition: 'Dense Fog' },
  { city: 'Chennai', district: 'Chennai', state: 'Tamil Nadu', condition: 'Heavy Humidity' }
];

export default function Onboarding({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [testingMode, setTestingMode] = useState(false);
  const [testLocationIndex, setTestLocationIndex] = useState(0);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');

  // Status states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Toggle testing mode and autofill/clear values
  const handleToggleTestingMode = (checked) => {
    setTestingMode(checked);
    setError(null);
    if (checked) {
      setEmail('testfarmer@example.com');
      setPassword('testfarmer123');
      setFullName('Test Farmer');
      const testLoc = TEST_LOCATIONS[testLocationIndex];
      setState(testLoc.state);
      setDistrict(testLoc.district);
      setCity(testLoc.city);
    } else {
      setEmail('');
      setPassword('');
      setFullName('');
      setState('');
      setDistrict('');
      setCity('');
    }
  };

  // Pre-fill location fields when changing test location index
  const handleTestLocationChange = (idx) => {
    setTestLocationIndex(idx);
    const testLoc = TEST_LOCATIONS[idx];
    setState(testLoc.state);
    setDistrict(testLoc.district);
    setCity(testLoc.city);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 1. Developer Testing Mode Login Bypass
    if (testingMode) {
      setTimeout(() => {
        const dummyUser = {
          id: 'dummy-test-user-id',
          email: email,
          user_metadata: {
            full_name: fullName,
            location_city: city,
            location_district: district,
            location_state: state,
            is_testing_session: true
          }
        };
        onAuthSuccess(dummyUser);
        setLoading(false);
      }, 800);
      return;
    }

    // 2. Real Supabase Authentication Flow
    try {
      if (isLogin) {
        // Sign in user
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (authError) throw authError;

        // Fetch user profile from database
        const { data: profile, error: dbError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (dbError) {
          console.warn('Profile not found in database. Using auth metadata fallback.');
        }

        const loggedInUser = {
          id: data.user.id,
          email: data.user.email,
          user_metadata: {
            full_name: profile?.full_name || data.user.user_metadata?.full_name || 'Farmer',
            location_city: profile?.location_city || 'Delhi',
            location_district: profile?.location_district || 'New Delhi',
            location_state: profile?.location_state || 'Delhi'
          }
        };

        onAuthSuccess(loggedInUser);
      } else {
        // Sign up new user
        const { data, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              location_city: city,
              location_district: district,
              location_state: state
            }
          }
        });

        if (authError) throw authError;
        if (!data.user) throw new Error('Signup failed. Please try again.');

        // Save custom details to public profiles table
        const { error: dbError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            full_name: fullName,
            location_state: state,
            location_district: district,
            location_city: city,
            email: email
          });

        if (dbError) {
          console.error('Database Profile save failed, but auth succeeded:', dbError);
        }

        setSuccess(true);
        setLoading(false);
        // Switch back to login with a success prompt
        setTimeout(() => {
          setIsLogin(true);
          setSuccess(false);
        }, 3000);
      }
    } catch (err) {
      console.error('Authentication Error:', err);
      setError(err.message || 'An error occurred during authentication.');
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-8 flex flex-col justify-center bg-gradient-to-b from-[#f7faf8] to-[#edf4ee] text-slate-800">
      
      {/* Testing Mode Toggle Switch Banner */}
      <div className="bg-emerald-800/10 border border-emerald-800/20 rounded-2xl p-4 mb-6 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-emerald-800 shrink-0" />
            <div>
              <span className="text-xs font-bold text-emerald-950 block leading-tight">Developer Testing Mode</span>
              <span className="text-[10px] text-emerald-800 font-medium">Bypass server credentials locally</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleToggleTestingMode(!testingMode)}
            className={`w-12 h-6 rounded-full transition-colors duration-200 relative focus:outline-none ${
              testingMode ? 'bg-emerald-700' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform duration-200 shadow-2xs ${
                testingMode ? 'translate-x-6.5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

        {/* Dynamic Testing Location Switcher Dropdown */}
        {testingMode && (
          <div className="mt-4 pt-3.5 border-t border-emerald-800/15 flex flex-col gap-2 animate-fade-in">
            <label className="text-[9px] font-black text-emerald-900 uppercase tracking-wider block">
              Quick Weather Background Switcher
            </label>
            <select
              value={testLocationIndex}
              onChange={(e) => handleTestLocationChange(Number(e.target.value))}
              className="w-full bg-white border border-emerald-250 rounded-xl px-3 py-2 text-xs font-semibold text-emerald-950 focus:outline-none focus:border-emerald-700"
            >
              {TEST_LOCATIONS.map((loc, idx) => (
                <option key={idx} value={idx}>
                  {loc.city} ({loc.condition})
                </option>
              ))}
            </select>
            <span className="text-[9px] text-emerald-700 font-medium italic">
              * Logging in will immediately force weather visuals and prices to this city's region.
            </span>
          </div>
        )}
      </div>

      {/* Main Glassmorphic Form Card */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden">
        
        {/* Graphic Accent */}
        <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-emerald-500/5 blur-xl pointer-events-none" />

        <div className="text-center mb-6">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100/50 inline-block">
            {testingMode ? '🧪 Dummy Account Active' : '🌾 Kisaane AI Dashboard'}
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-3 tracking-tight">
            {isLogin ? 'Welcome Back Farmer' : 'Create Farmer Account'}
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-medium leading-relaxed">
            {isLogin 
              ? 'Sign in to access your customized local advisories.'
              : 'Register to customize weather and crop market prices.'}
          </p>
        </div>

        {/* Status Alerts */}
        {error && (
          <div className="bg-rose-50 border border-rose-100 text-rose-850 rounded-2xl p-3.5 text-xs font-bold flex items-start gap-2.5 mb-5 animate-pulse-slow">
            <AlertTriangle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
            <div>
              <span>{error}</span>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 border border-emerald-100 text-emerald-850 rounded-2xl p-3.5 text-xs font-bold flex items-start gap-2.5 mb-5">
            <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span>Farmer registered successfully! Switching to Login screen...</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Name Field (Only on Register) */}
          {!isLogin && (
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider pl-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-100 border border-slate-200/50 rounded-xl py-3 pl-10 pr-4 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-700 focus:bg-white focus:shadow-sm transition-all"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>
          )}

          {/* Email ID */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider pl-1">Email ID</label>
            <div className="relative">
              <input
                type="email"
                required
                disabled={testingMode}
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-100 disabled:opacity-75 disabled:cursor-not-allowed border border-slate-200/50 rounded-xl py-3 pl-10 pr-4 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-700 focus:bg-white focus:shadow-sm transition-all"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider pl-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                disabled={testingMode}
                placeholder="Enter account password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-100 disabled:opacity-75 disabled:cursor-not-allowed border border-slate-200/50 rounded-xl py-3 pl-10 pr-4 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-700 focus:bg-white focus:shadow-sm transition-all"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Location Fields (Only on Register, and pre-filled/disabled on Test Mode) */}
          {!isLogin && (
            <div className="flex flex-col gap-3 mt-1 border-t border-slate-50 pt-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" /> Farming Location
              </span>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-slate-450 uppercase">State</label>
                  <select
                    required
                    disabled={testingMode}
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-slate-100 border border-slate-200/50 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-700"
                  >
                    <option value="">Choose State</option>
                    {STATES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-slate-450 uppercase">District</label>
                  <input
                    type="text"
                    required
                    disabled={testingMode}
                    placeholder="District name"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-slate-100 border border-slate-200/50 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-700 focus:bg-white"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-slate-450 uppercase">City / Tehsil / Village</label>
                <input
                  type="text"
                  required
                  disabled={testingMode}
                  placeholder="Village/City name"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-100 border border-slate-200/50 rounded-xl py-3 px-3.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-700 focus:bg-white"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 text-white font-bold text-xs py-3.5 rounded-xl flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 cursor-pointer mt-2 disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
            ) : (
              <>
                {testingMode ? <Sparkles className="w-4 h-4" /> : null}
                <span>{isLogin ? (testingMode ? 'Launch Demo Session' : 'Login Account') : 'Register Account'}</span>
              </>
            )}
          </button>
        </form>

        {/* Auth Toggle Link */}
        <div className="text-center mt-5">
          <button
            type="button"
            disabled={testingMode}
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
            }}
            className="text-xs font-bold text-emerald-805 hover:text-emerald-950 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLogin ? "New user? Register a new farmer profile" : "Already registered? Switch to Login"}
          </button>
        </div>

      </div>

    </div>
  );
}
