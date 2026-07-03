import React, { useState, useEffect } from 'react';
import { Camera, ArrowRight, Sprout, TrendingUp, Sun, ChevronRight, User, Sparkles, BookOpen, LogOut, CloudRain, Cloud, CloudLightning, Droplets, CloudSun, CloudSnow, CloudFog } from 'lucide-react';
import denseFogVideo from '../assets/Dense fog.mp4';
import frostFreezeVideo from '../assets/Frost and Freeze.mp4';
import heatwaveDustVideo from '../assets/Heatwave and dust.mp4';
import heavyHumidityVideo from '../assets/Heavy humidity.mp4';
import mostlySunnyVideo from '../assets/Mostly Sunny.mp4';
import rainStormVideo from '../assets/Rain and storm..mp4';

export default function HomeDashboard({ userName = 'Ramesh', userLocation, setTab, onSignOut, language = 'en', setLanguage }) {
  const t = {
    en: {
      hello: "Hello, Farmer",
      smartAssistant: "Smart Assistant",
      advisory: "Advisory",
      humidity: "Humidity",
      rainChance: "Rain Chance",
      fullWeather: "Full Weather",
      sunny: "Sunny",
      rainy: "Rainy",
      heavyRain: "Heavy Rain",
      thunder: "Thunderstorm",
      cloudy: "Cloudy",
      partSun: "Partly Sunny",
      fog: "Dense Fog",
      snow: "Frost & Freeze",
      heatwave: "Heatwave & Dust",
      heavyHumidity: "Heavy Humidity",
      advisoryHarvest: "Good day for harvesting",
      advisoryAlert: "Stay alert for weather changes",
      advisoryRain: "Postpone chemical spraying",
      advisoryThunder: "Avoid machinery operations",
      advisoryFog: "High dampness - scan for blight",
      advisorySnow: "Protect sensitive plants",
      advisoryHeatwave: "Irrigate after sunset",
      advisoryHumidity: "Heavy humidity - monitor fungal blight",
      advisoryNormal: "Ideal weather parameter window",
      highRainProb: "High probability of rain",
      stableWeather: "Stable weather parameters",
      checkPrices: "Check Prices",
      marketTrends: "Market trends",
      soilAdvisor: "Soil Advisor",
      fertilizers: "Fertilizers",
      farmersAdvisory: "Farmers Advisory",
      tipOf: "Tip",
      nextTip: "Next Tip"
    },
    hi: {
      hello: "नमस्ते, किसान",
      smartAssistant: "स्मार्ट सहायक",
      advisory: "सलाह",
      humidity: "उमस",
      rainChance: "बारिश की संभावना",
      fullWeather: "पूरा मौसम",
      sunny: "धूप",
      rainy: "बारिश",
      heavyRain: "भारी बारिश",
      thunder: "आंधी-तूफान",
      cloudy: "बादल छाए हैं",
      partSun: "आंशिक रूप से धूप",
      fog: "घना कोहरा",
      snow: "पाला और ठंड",
      heatwave: "लू और धूल",
      heavyHumidity: "भारी उमस",
      advisoryHarvest: "फसल कटाई के लिए अच्छा दिन",
      advisoryAlert: "मौसम के बदलावों पर नजर रखें",
      advisoryRain: "रासायनिक छिड़काव स्थगित करें",
      advisoryThunder: "मशीनरी का उपयोग न करें",
      advisoryFog: "नमी अधिक है - झुलसा रोग की जांच करें",
      advisorySnow: "संवेदनशील पौधों को पाले से बचाएं",
      advisoryHeatwave: "सूर्यास्त के बाद सिंचाई करें",
      advisoryHumidity: "भारी उमस - फंगल संक्रमण की जांच करें",
      advisoryNormal: "जैविक कार्यों के लिए सामान्य मौसम",
      highRainProb: "बारिश की उच्च संभावना",
      stableWeather: "स्थिर मौसम पैरामीटर",
      checkPrices: "दाम जांचें",
      marketTrends: "बाजार रुझान",
      soilAdvisor: "मिट्टी सलाहकार",
      fertilizers: "उर्वरक मार्गदर्शन",
      farmersAdvisory: "किसान सलाहकार",
      tipOf: "सुझाव",
      nextTip: "अगला सुझाव"
    },
    mr: {
      hello: "नमस्कार, शेतकरी",
      smartAssistant: "स्मार्ट सहाय्यक",
      advisory: "सल्ला",
      humidity: "दमटपणा",
      rainChance: "पावसाची शक्यता",
      fullWeather: "पूर्ण हवामान",
      sunny: "स्वच्छ ऊन",
      rainy: "पाऊस",
      heavyRain: "मुसळधार पाऊस",
      thunder: "वादळी पाऊस",
      cloudy: "ढगाळ हवामान",
      partSun: "अंशतः ऊन",
      fog: "दाट धुके",
      snow: "कडाक्याची थंडी",
      heatwave: "उष्णतेची लाट आणि धूळ",
      heavyHumidity: "जास्त दमटपणा",
      advisoryHarvest: "पीक कापणीसाठी चांगला दिवस",
      advisoryAlert: "हवामानातील बदलांवर लक्ष ठेवा",
      advisoryRain: "रासायनिक फवारणी पुढे ढकला",
      advisoryThunder: "यंत्रसामग्री वापरणे टाळा",
      advisoryFog: "दमटपणा जास्त - करपा रोग तपासा",
      advisorySnow: "रोपांचे कडाक्याच्या थंडीपासून रक्षण करा",
      advisoryHeatwave: "सूर्यास्तानंतर पाणी द्या",
      advisoryHumidity: "दमटपणा जास्त - बुरशीजन्य रोग तपासा",
      advisoryNormal: "शेतीकामासाठी हवामान योग्य आहे",
      highRainProb: "पावसाची दाट शक्यता",
      stableWeather: "हवामान घटक स्थिर आहेत",
      checkPrices: "दर तपासा",
      marketTrends: "बाजार प्रवाह",
      soilAdvisor: "माती सल्लागार",
      fertilizers: "खते मार्गदर्शन",
      farmersAdvisory: "शेतकरी सल्लागार",
      tipOf: "सल्ला",
      nextTip: "पुढील सल्ला"
    }
  };

  const translateCondition = (conditionName) => {
    switch (conditionName) {
      case 'Sunny': return t[language].sunny;
      case 'Rainy': return t[language].rainy;
      case 'Heavy Rain': return t[language].heavyRain;
      case 'Thunderstorm': return t[language].thunder;
      case 'Cloudy': return t[language].cloudy;
      case 'Partly Sunny': return t[language].partSun;
      case 'Dense Fog': return t[language].fog;
      case 'Frost & Freeze': return t[language].snow;
      case 'Heatwave & Dust': return t[language].heatwave;
      case 'Heavy Humidity': return t[language].heavyHumidity;
      default: return conditionName;
    }
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const [weatherDetails, setWeatherDetails] = useState({
    temp: 32,
    condition: 'Sunny',
    humidity: 48,
    rainChance: 5,
    icon: 'sun'
  });
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Fetch current weather for the user's global location
  useEffect(() => {
    async function fetchCurrentWeather() {
      try {
        // If it is a developer testing session, bypass API fetch and immediately use regional mock presets
        if (userLocation?.isTestingSession) {
          console.warn('Developer testing session detected, loading local preset configurations.');
          const defaultWeathers = {
            'Delhi': { temp: 32, condition: 'Sunny', humidity: 48, rainChance: 5, icon: 'sun' },
            'Mumbai': { temp: 26, condition: 'Heavy Rain', humidity: 95, rainChance: 98, icon: 'heavy-rain' },
            'Bangalore': { temp: 24, condition: 'Cloudy', humidity: 72, rainChance: 15, icon: 'cloudy' },
            'Kolkata': { temp: 28, condition: 'Thunderstorm', humidity: 88, rainChance: 90, icon: 'thunder' },
            'Indore': { temp: 30, condition: 'Partly Sunny', humidity: 55, rainChance: 8, icon: 'part-sun' },
            'Srinagar': { temp: 2, condition: 'Frost & Freeze', humidity: 85, rainChance: 40, icon: 'snow' },
            'Shimla': { temp: 4, condition: 'Frost & Freeze', humidity: 78, rainChance: 30, icon: 'snow' },
            'Jaisalmer': { temp: 42, condition: 'Heatwave & Dust', humidity: 15, rainChance: 2, icon: 'heatwave' },
            'Amritsar': { temp: 14, condition: 'Dense Fog', humidity: 95, rainChance: 0, icon: 'fog' },
            'Chennai': { temp: 31, condition: 'Heavy Humidity', humidity: 88, rainChance: 15, icon: 'humidity' }
          };
          const resolved = defaultWeathers[userLocation.city] || { temp: 31, condition: 'Sunny', humidity: 50, rainChance: 10, icon: 'sun' };
          setWeatherDetails(resolved);
          return;
        }

        const apiKey = import.meta.env.VITE_262c19f3d2e51310dba4b741108b7ffe;
        
        if (!apiKey || apiKey.includes('placeholder') || apiKey === '') {
          // Fallback to local default parameters based on city selection
          const defaultWeathers = {
            'Delhi': { temp: 32, condition: 'Sunny', humidity: 48, rainChance: 5, icon: 'sun' },
            'Mumbai': { temp: 26, condition: 'Heavy Rain', humidity: 95, rainChance: 98, icon: 'heavy-rain' },
            'Bangalore': { temp: 24, condition: 'Cloudy', humidity: 72, rainChance: 15, icon: 'cloudy' },
            'Kolkata': { temp: 28, condition: 'Thunderstorm', humidity: 88, rainChance: 90, icon: 'thunder' },
            'Indore': { temp: 30, condition: 'Partly Sunny', humidity: 55, rainChance: 8, icon: 'part-sun' },
            'Srinagar': { temp: 2, condition: 'Frost & Freeze', humidity: 85, rainChance: 40, icon: 'snow' },
            'Shimla': { temp: 4, condition: 'Frost & Freeze', humidity: 78, rainChance: 30, icon: 'snow' },
            'Jaisalmer': { temp: 42, condition: 'Heatwave & Dust', humidity: 15, rainChance: 2, icon: 'heatwave' },
            'Amritsar': { temp: 14, condition: 'Dense Fog', humidity: 95, rainChance: 0, icon: 'fog' },
            'Chennai': { temp: 31, condition: 'Heavy Humidity', humidity: 88, rainChance: 15, icon: 'humidity' }
          };
          const resolved = defaultWeathers[userLocation.city] || { temp: 31, condition: 'Sunny', humidity: 50, rainChance: 10, icon: 'sun' };
          setWeatherDetails(resolved);
          return;
        }

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${userLocation.city},IN&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
          throw new Error('API request failed');
        }

        const data = await response.json();
        const mainCond = data.weather[0].main;
        const descCond = data.weather[0].description;
        const temp = Math.round(data.main.temp);
        const humidity = data.main.humidity;
        
        let condition = mainCond;
        let icon = 'sun';
        if (temp >= 40) {
          condition = 'Heatwave & Dust';
          icon = 'heatwave';
        } else if (temp <= 5 || mainCond === 'Snow') {
          condition = 'Frost & Freeze';
          icon = 'snow';
        } else if (mainCond === 'Clear') {
          condition = 'Sunny';
          icon = 'sun';
        } else if (mainCond === 'Rain' || mainCond === 'Drizzle') {
          condition = descCond.includes('heavy') ? 'Heavy Rain' : 'Rainy';
          icon = 'heavy-rain';
        } else if (mainCond === 'Thunderstorm') {
          condition = 'Thunderstorm';
          icon = 'thunder';
        } else if (['Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Ash', 'Squall', 'Tornado'].includes(mainCond)) {
          condition = mainCond === 'Fog' ? 'Dense Fog' : mainCond;
          icon = 'fog';
        } else if (humidity >= 80) {
          condition = 'Heavy Humidity';
          icon = 'humidity';
        } else if (mainCond === 'Clouds') {
          condition = 'Cloudy';
          icon = 'cloudy';
        } else {
          condition = mainCond;
          icon = 'part-sun';
        }

        const rainChance = (icon === 'heavy-rain' || icon === 'thunder') ? 95 :
                           (icon === 'humidity') ? 35 :
                           (icon === 'cloudy') ? 20 : 5;

        setWeatherDetails({
          temp: temp,
          condition: condition,
          humidity: humidity,
          rainChance: rainChance,
          icon: icon
        });
      } catch (err) {
        console.warn('Could not fetch home dashboard weather, using mock location defaults.');
        const defaultWeathers = {
          'Delhi': { temp: 32, condition: 'Sunny', humidity: 48, rainChance: 5, icon: 'sun' },
          'Mumbai': { temp: 26, condition: 'Heavy Rain', humidity: 95, rainChance: 98, icon: 'heavy-rain' },
          'Bangalore': { temp: 24, condition: 'Cloudy', humidity: 72, rainChance: 15, icon: 'cloudy' },
          'Kolkata': { temp: 28, condition: 'Thunderstorm', humidity: 88, rainChance: 90, icon: 'thunder' },
          'Indore': { temp: 30, condition: 'Partly Sunny', humidity: 55, rainChance: 8, icon: 'part-sun' },
          'Srinagar': { temp: 2, condition: 'Frost & Freeze', humidity: 85, rainChance: 40, icon: 'snow' },
          'Shimla': { temp: 4, condition: 'Frost & Freeze', humidity: 78, rainChance: 30, icon: 'snow' },
          'Jaisalmer': { temp: 42, condition: 'Heatwave & Dust', humidity: 15, rainChance: 2, icon: 'heatwave' },
          'Amritsar': { temp: 14, condition: 'Dense Fog', humidity: 95, rainChance: 0, icon: 'fog' },
          'Chennai': { temp: 31, condition: 'Heavy Humidity', humidity: 88, rainChance: 15, icon: 'humidity' }
        };
        setWeatherDetails(defaultWeathers[userLocation.city] || { temp: 31, condition: 'Sunny', humidity: 50, rainChance: 10, icon: 'sun' });
      }
    }

    fetchCurrentWeather();
  }, [userLocation]);

  // Determine weather card background styles based on condition icon
  const getWeatherCardStyle = () => {
    switch (weatherDetails.icon) {
      case 'heavy-rain':
      case 'thunder':
        return 'bg-slate-950 text-white border border-white/10';
      case 'fog':
        return 'bg-slate-800 text-white border border-white/10';
      case 'snow':
        return 'bg-sky-950 text-white border border-white/10';
      case 'heatwave':
        return 'bg-orange-950 text-white border border-white/10';
      case 'humidity':
        return 'bg-emerald-950 text-white border border-white/10';
      default:
        return 'bg-emerald-900 text-white border border-white/10';
    }
  };

  const getWeatherVideo = (icon) => {
    switch (icon) {
      case 'fog':
        return denseFogVideo;
      case 'snow':
        return frostFreezeVideo;
      case 'heatwave':
        return heatwaveDustVideo;
      case 'humidity':
        return heavyHumidityVideo;
      case 'heavy-rain':
      case 'thunder':
        return rainStormVideo;
      case 'sun':
      case 'part-sun':
      case 'cloudy':
      default:
        return mostlySunnyVideo;
    }
  };

  const tipsTranslations = {
    en: [
      { id: 1, title: "Restore Soil Nitrogen", desc: "Planting legumes like peas or beans in rotation fixes nitrogen back into your soil naturally.", category: "Soil Health" },
      { id: 2, title: "Identify Early Blight", desc: "Check lower leaves for dark spots with concentric rings. Early fungicide application saves yields.", category: "Crop Care" },
      { id: 3, title: "Optimized Watering", desc: "Irrigate in the early morning or late evening to minimize water loss from evaporation.", category: "Irrigation" }
    ],
    hi: [
      { id: 1, title: "मिट्टी का नाइट्रोजन बढ़ाएं", desc: "फसल चक्र में मटर या बीन्स जैसे दलहन बोने से मिट्टी में प्राकृतिक रूप से नाइट्रोजन का स्तर बढ़ता है।", category: "मिट्टी स्वास्थ्य" },
      { id: 2, title: "झुलसा रोग की पहचान करें", desc: "निचले पत्तों पर काले गोलाकार धब्बे देखें। कवकनाशी का सही समय पर छिड़काव उपज बचाता है।", category: "फसल देखभाल" },
      { id: 3, title: "सिंचाई का सही समय", desc: "पानी के वाष्पीकरण को रोकने के लिए सुबह जल्दी या शाम को देर से सिंचाई करें।", category: "सिंचाई प्रबंधन" }
    ],
    mr: [
      { id: 1, title: "मातीमधील नत्र (Nitrogen) वाढवा", desc: "पीक बदलामध्ये मटार किंवा घेवड्यासारखी कडधान्ये लावून मातीतील नायट्रोजनचे प्रमाण वाढवा.", category: "मातीचे आरोग्य" },
      { id: 2, title: "करपा रोगाची लक्षणे शोधा", desc: "खालच्या पानावरील काळे गोलाकार ठिपके तपासा. वेळीच बुरशीनाशक फवारल्याने पीक वाचते.", category: "पिकांची काळजी" },
      { id: 3, title: "पाणी देण्याचे नियोजन", desc: "पाण्याचे बाष्पीभवन टाळण्यासाठी पहाटे किंवा संध्याकाळी उशिरा पाणी द्या.", category: "सिंचन नियोजन" }
    ]
  };

  const tips = tipsTranslations[language] || tipsTranslations.en;

  const [activeTip, setActiveTip] = useState(0);

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-5 flex flex-col gap-5 text-slate-800 relative">
      
      {/* Header Profile Greeting */}
      <div className="flex items-center justify-between relative">
        <div>
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">{t[language].smartAssistant} • {userLocation.city}</span>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-1.5 mt-0.5">
            {t[language].hello} {userName} <span className="animate-bounce">👋</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">{currentDate}</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Switcher Dropdown */}
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-emerald-50 border border-emerald-100 rounded-xl px-2.5 py-1.5 text-xs font-bold text-emerald-800 cursor-pointer focus:outline-none hover:bg-emerald-100 transition-colors shadow-2xs"
          >
            <option value="en">EN</option>
            <option value="hi">हिन्दी</option>
            <option value="mr">मराठी</option>
          </select>

          {/* User Account / Profile Menu Trigger */}
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100/80 flex items-center justify-center text-emerald-800 shadow-sm hover:shadow-md cursor-pointer hover:bg-emerald-100 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Profile Popover Options */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2.5 w-48 bg-white border border-slate-100 rounded-xl shadow-lg py-2.5 z-50 animate-fade-in">
                <div className="px-3.5 py-1.5 border-b border-slate-50">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Active Profile</span>
                  <span className="text-xs font-black text-slate-800 block truncate">{userName}</span>
                  <span className="text-[9px] text-slate-500 truncate block mt-0.5">{userLocation.city}, {userLocation.state}</span>
                </div>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onSignOut();
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs font-bold text-rose-700 hover:bg-rose-50 flex items-center gap-2 transition-colors cursor-pointer mt-1"
                >
                  <LogOut className="w-4 h-4 shrink-0" />
                  Sign Out / Exit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mini Weather Summary Card with dynamic Video background */}
      <div 
        onClick={() => setTab('weather')}
        className={`${getWeatherCardStyle()} rounded-2xl p-5 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-98 transition-card relative overflow-hidden cursor-pointer group`}
      >
        {/* Background Video */}
        <video
          key={weatherDetails.icon}
          src={getWeatherVideo(weatherDetails.icon)}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />

        {/* Subtle Dark Overlay */}
        <div className="absolute inset-0 bg-slate-950/35 z-0 pointer-events-none" />

        {/* TOPOGRAPHIC LEAF VEINS SVG OVERLAY (10% Opacity) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay z-0">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,90 Q30,50 50,10 T90,-70" stroke="white" strokeWidth="0.8" />
            <path d="M50,10 Q35,35 20,45" stroke="white" strokeWidth="0.5" />
            <path d="M50,25 Q38,48 24,60" stroke="white" strokeWidth="0.5" />
            <path d="M50,40 Q40,60 28,75" stroke="white" strokeWidth="0.5" />
            <path d="M50,10 Q65,35 80,45" stroke="white" strokeWidth="0.5" />
            <path d="M50,25 Q62,48 76,60" stroke="white" strokeWidth="0.5" />
            <path d="M50,40 Q60,60 72,75" stroke="white" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="flex justify-between items-start relative z-10">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-xs shrink-0 select-none shadow-2xs">
                {weatherDetails.icon === 'sun' && <Sun className="w-7 h-7 text-amber-300 animate-spin-slow" />}
                {weatherDetails.icon === 'heavy-rain' && <CloudRain className="w-7 h-7 text-blue-300 animate-bounce" />}
                {weatherDetails.icon === 'thunder' && <CloudLightning className="w-7 h-7 text-indigo-300 animate-pulse" />}
                {weatherDetails.icon === 'cloudy' && <Cloud className="w-7 h-7 text-slate-300" />}
                {weatherDetails.icon === 'part-sun' && <CloudSun className="w-7 h-7 text-amber-300" />}
                {weatherDetails.icon === 'fog' && <CloudFog className="w-7 h-7 text-slate-300 opacity-90" />}
                {weatherDetails.icon === 'snow' && <CloudSnow className="w-7 h-7 text-blue-200" />}
                {weatherDetails.icon === 'heatwave' && <Sun className="w-7 h-7 text-orange-450 animate-pulse" />}
                {weatherDetails.icon === 'humidity' && <Droplets className="w-7 h-7 text-teal-300" />}
              </div>
              
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-3xl font-black text-white tracking-tight leading-none drop-shadow-sm">{weatherDetails.temp}°C</span>
                  <span className="text-[10px] font-black text-white bg-white/20 border border-white/10 px-2.5 py-1 rounded-full backdrop-blur-xs inline-block whitespace-nowrap leading-none uppercase tracking-wider">
                    {translateCondition(weatherDetails.condition)}
                  </span>
                </div>
              </div>
            </div>
            
            <p className="text-sm font-semibold mt-4 text-slate-100">
              {t[language].advisory}: {
                weatherDetails.icon === 'heavy-rain' ? t[language].advisoryRain : 
                weatherDetails.icon === 'thunder' ? t[language].advisoryThunder :
                weatherDetails.icon === 'fog' ? t[language].advisoryFog :
                weatherDetails.icon === 'snow' ? t[language].advisorySnow :
                weatherDetails.icon === 'heatwave' ? t[language].advisoryHeatwave :
                weatherDetails.icon === 'humidity' ? t[language].advisoryHumidity :
                (weatherDetails.condition === 'Sunny' ? t[language].advisoryHarvest : t[language].advisoryNormal)
              }
            </p>
            <p className="text-xs text-white/80 mt-0.5">
              {t[language].humidity}: {weatherDetails.humidity}% • {weatherDetails.rainChance > 50 ? t[language].highRainProb : t[language].stableWeather}
            </p>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); setTab('weather'); }} 
            className="text-xs font-semibold bg-white/15 hover:bg-white/25 border border-white/10 px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-all active:scale-95 text-white cursor-pointer"
          >
            {t[language].fullWeather} <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>


      {/* Quick Actions */}
      <div>
        <h2 className="text-xs font-bold text-slate-400 mb-3 tracking-wider uppercase">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-3">
          
          <button
            onClick={() => setTab('scan')}
            className="flex flex-col items-center justify-center bg-white border border-slate-100/80 p-3.5 rounded-2xl text-center shadow-sm hover:shadow-md hover:-translate-y-1 active:scale-90 transition-card group cursor-pointer"
          >
            {/* Glassmorphic Icon Wrapper */}
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/15 flex items-center justify-center text-emerald-700 mb-2 group-hover:scale-105 transition-transform duration-200">
              <Camera className="w-5.5 h-5.5" />
            </div>
            <span className="text-xs font-bold text-slate-855 group-hover:text-emerald-800 transition-colors">Scan Crop</span>
            <span className="text-[9px] text-slate-400 mt-0.5 leading-none">Find disease</span>
          </button>

          <button
            onClick={() => setTab('market')}
            className="flex flex-col items-center justify-center bg-white border border-slate-100/80 p-3.5 rounded-2xl text-center shadow-sm hover:shadow-md hover:-translate-y-1 active:scale-90 transition-card group cursor-pointer"
          >
            {/* Glassmorphic Icon Wrapper */}
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center text-amber-800 mb-2 group-hover:scale-105 transition-transform duration-200">
              <TrendingUp className="w-5.5 h-5.5" />
            </div>
            <span className="text-xs font-bold text-slate-855 group-hover:text-amber-800 transition-colors">{t[language].checkPrices}</span>
            <span className="text-[9px] text-slate-400 mt-0.5 leading-none">{t[language].marketTrends}</span>
          </button>

          <button
            onClick={() => {
              setTab('market');
              setTimeout(() => {
                const fertBtn = document.getElementById('market-fertilizer-tab');
                if (fertBtn) fertBtn.click();
              }, 100);
            }}
            className="flex flex-col items-center justify-center bg-white border border-slate-100/80 p-3.5 rounded-2xl text-center shadow-sm hover:shadow-md hover:-translate-y-1 active:scale-90 transition-card group cursor-pointer"
          >
            {/* Glassmorphic Icon Wrapper */}
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/15 flex items-center justify-center text-blue-800 mb-2 group-hover:scale-105 transition-transform duration-200">
              <Sprout className="w-5.5 h-5.5" />
            </div>
            <span className="text-xs font-bold text-slate-855 group-hover:text-blue-850 transition-colors">{t[language].soilAdvisor}</span>
            <span className="text-[9px] text-slate-400 mt-0.5 leading-none">{t[language].fertilizers}</span>
          </button>

        </div>
      </div>

      {/* Advisory Tips Section */}
      <div className="mt-1 flex-1 flex flex-col min-h-0">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xs font-bold text-slate-400 tracking-wider uppercase flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-emerald-700" /> {t[language].farmersAdvisory}
          </h2>
          <span className="text-xs text-slate-400 font-medium">
            {t[language].tipOf} {activeTip + 1} / {tips.length}
          </span>
        </div>

        <div className="bg-white border border-slate-100/80 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-card flex-1 flex flex-col justify-between hover:border-emerald-100/70">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="px-2.5 py-0.5 text-[9px] font-extrabold uppercase rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100/60">
                {tips[activeTip].category}
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <h3 className="text-base font-extrabold text-slate-950 mb-2 leading-snug">
              {tips[activeTip].title}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {tips[activeTip].desc}
            </p>
          </div>

          <div className="flex items-center justify-between mt-5 pt-3 border-t border-slate-50">
            <div className="flex gap-1.5">
              {tips.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTip(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeTip ? 'w-5 bg-emerald-700' : 'w-1.5 bg-slate-200'}`}
                />
              ))}
            </div>
            <button
              onClick={() => setActiveTip((prev) => (prev + 1) % tips.length)}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-0.5 transition-colors active:scale-95 cursor-pointer"
            >
              {t[language].nextTip} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
}
