import React, { useState, useEffect } from 'react';
import PhoneFrame from './components/PhoneFrame';
import HomeDashboard from './components/HomeDashboard';
import CropScanner from './components/CropScanner';
import WeatherForecast from './components/WeatherForecast';
import MarketGuide from './components/MarketGuide';
import Onboarding from './components/Onboarding';
import { supabase } from './supabase';
import { Home, Camera, CloudSun, BarChart3 } from 'lucide-react';

export default function App() {
  const [tab, setTab] = useState('home'); // 'home', 'scan', 'weather', 'market'
  const [user, setUser] = useState(null);
  const [userLocation, setUserLocation] = useState({ city: 'Delhi', district: 'New Delhi', state: 'Delhi', isTestingSession: false });
  const [language, setLanguage] = useState(() => localStorage.getItem('kisaane_lang') || 'en');

  const handleSetLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('kisaane_lang', lang);
  };

  // Listen for Supabase Authentication State changes
  useEffect(() => {
    // Check initial active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        setUserLocation({
          city: session.user.user_metadata?.location_city || 'Delhi',
          district: session.user.user_metadata?.location_district || 'New Delhi',
          state: session.user.user_metadata?.location_state || 'Delhi',
          isTestingSession: session.user.user_metadata?.is_testing_session || false
        });
      }
    });

    // Hook listener for real-time authentication session changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);

        // Fetch location profile from database
        let loc = {
          city: session.user.user_metadata?.location_city || 'Delhi',
          district: session.user.user_metadata?.location_district || 'New Delhi',
          state: session.user.user_metadata?.location_state || 'Delhi',
          isTestingSession: session.user.user_metadata?.is_testing_session || false
        };

        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (profile) {
            loc = {
              city: profile.location_city,
              district: profile.location_district,
              state: profile.location_state,
              isTestingSession: session.user.user_metadata?.is_testing_session || false
            };
          }
        } catch (dbErr) {
          console.warn('Could not load custom DB profile:', dbErr.message);
        }

        setUserLocation(loc);
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleAuthSuccess = (authUser) => {
    setUser(authUser);
    setUserLocation({
      city: authUser.user_metadata?.location_city || 'Delhi',
      district: authUser.user_metadata?.location_district || 'New Delhi',
      state: authUser.user_metadata?.location_state || 'Delhi',
      isTestingSession: authUser.user_metadata?.is_testing_session || false
    });
  };

  const handleSignOut = async () => {
    if (user?.id === 'dummy-test-user-id') {
      setUser(null);
    } else {
      await supabase.auth.signOut();
      setUser(null);
    }
    setTab('home');
  };

  const renderActiveScreen = () => {
    switch (tab) {
      case 'home':
        return (
          <HomeDashboard 
            userName={user?.user_metadata?.full_name || 'Ramesh'} 
            userLocation={userLocation}
            setTab={setTab} 
            onSignOut={handleSignOut}
            language={language}
            setLanguage={handleSetLanguage}
          />
        );
      case 'scan':
        return <CropScanner />;
      case 'weather':
        return (
          <WeatherForecast 
            userLocation={userLocation} 
            language={language}
            setLanguage={handleSetLanguage}
          />
        );
      case 'market':
        return <MarketGuide userLocation={userLocation} />;
      default:
        return (
          <HomeDashboard 
            userName={user?.user_metadata?.full_name || 'Ramesh'} 
            userLocation={userLocation}
            setTab={setTab} 
            onSignOut={handleSignOut}
            language={language}
            setLanguage={handleSetLanguage}
          />
        );
    }
  };

  const [isTabLoading, setIsTabLoading] = useState(false);

  useEffect(() => {
    setIsTabLoading(true);
    const timer = setTimeout(() => {
      setIsTabLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [tab]);

  // If user is not authenticated, show onboarding login/register form
  if (!user) {
    return (
      <PhoneFrame>
        <div className="flex-1 overflow-hidden flex flex-col bg-[#fdfdfc] animate-fade-in">
          <Onboarding onAuthSuccess={handleAuthSuccess} />
        </div>
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame>
      {/* App Body - Holds the active screen with fade-in animation on tab change */}
      <div key={tab} className="flex-1 overflow-hidden flex flex-col bg-[#fdfdfc] relative animate-fade-in">
        {renderActiveScreen()}

        {isTabLoading && (
          <div className="absolute inset-0 bg-[#fdfdfc] z-50 flex flex-col items-center justify-center animate-loading-fade">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full border-3 border-emerald-100 border-t-emerald-700 animate-spin" />
              <span className="text-[10px] font-black text-emerald-800/80 tracking-wider uppercase">Kisaane AI</span>
            </div>
          </div>
        )}
      </div>

      {/* App Navigation Bottom Tab Bar (Fixed height, styled like native app) */}
      <div className="h-16 bg-[#ffffff] border-t border-slate-100/85 flex justify-around items-center px-4 shrink-0 shadow-[0_-6px_20px_rgba(0,0,0,0.06)] z-45 select-none">
        
        {/* Home Tab */}
        <button
          onClick={() => setTab('home')}
          className={`flex flex-col items-center justify-center w-16 h-full transition-all duration-200 active:scale-90 cursor-pointer ${
            tab === 'home' 
              ? 'text-emerald-700 font-extrabold scale-102' 
              : 'text-slate-400 hover:text-slate-650'
          }`}
        >
          <Home className={`w-5 h-5 mb-0.5 transition-transform ${tab === 'home' ? 'scale-110 text-emerald-750' : ''}`} />
          <span className="text-[10px] tracking-tight">Home</span>
        </button>

        {/* Scan Crop Tab */}
        <button
          onClick={() => setTab('scan')}
          className={`flex flex-col items-center justify-center w-16 h-full transition-all duration-200 active:scale-90 cursor-pointer ${
            tab === 'scan' 
              ? 'text-emerald-700 font-extrabold scale-102' 
              : 'text-slate-400 hover:text-slate-650'
          }`}
        >
          <Camera className={`w-5 h-5 mb-0.5 transition-transform ${tab === 'scan' ? 'scale-110 text-emerald-750' : ''}`} />
          <span className="text-[10px] tracking-tight">Scan Crop</span>
        </button>

        {/* Weather Tab */}
        <button
          onClick={() => setTab('weather')}
          className={`flex flex-col items-center justify-center w-16 h-full transition-all duration-200 active:scale-90 cursor-pointer ${
            tab === 'weather' 
              ? 'text-emerald-700 font-extrabold scale-102' 
              : 'text-slate-400 hover:text-slate-650'
          }`}
        >
          <CloudSun className={`w-5 h-5 mb-0.5 transition-transform ${tab === 'weather' ? 'scale-110 text-emerald-750' : ''}`} />
          <span className="text-[10px] tracking-tight">Weather</span>
        </button>

        {/* Market Tab */}
        <button
          onClick={() => setTab('market')}
          className={`flex flex-col items-center justify-center w-16 h-full transition-all duration-200 active:scale-90 cursor-pointer ${
            tab === 'market' 
              ? 'text-emerald-700 font-extrabold scale-102' 
              : 'text-slate-400 hover:text-slate-650'
          }`}
        >
          <BarChart3 className={`w-5 h-5 mb-0.5 transition-transform ${tab === 'market' ? 'scale-110 text-emerald-750' : ''}`} />
          <span className="text-[10px] tracking-tight">Market</span>
        </button>

      </div>
    </PhoneFrame>
  );
}
