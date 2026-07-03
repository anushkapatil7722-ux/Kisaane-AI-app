import React, { useState } from 'react';
import { Sun, CloudRain, CloudLightning, Cloud, CloudSun, AlertTriangle, Droplets, Wind, Thermometer, Calendar, Navigation, CloudSnow, CloudFog } from 'lucide-react';
import denseFogVideo from '../assets/Dense fog.mp4';
import frostFreezeVideo from '../assets/Frost and Freeze.mp4';
import heatwaveDustVideo from '../assets/Heatwave and dust.mp4';
import heavyHumidityVideo from '../assets/Heavy humidity.mp4';
import mostlySunnyVideo from '../assets/Mostly Sunny.mp4';
import rainStormVideo from '../assets/Rain and storm..mp4';

// Helper to generate dynamic mock forecast based on city climate profiles
const generateMockForecast = (city) => {
  const baselines = {
    'Delhi': { temp: 32, icon: 'sun', condition: 'Sunny', humidity: 48 },
    'Mumbai': { temp: 26, icon: 'heavy-rain', condition: 'Heavy Rain', humidity: 95 },
    'Bangalore': { temp: 24, icon: 'cloudy', condition: 'Cloudy', humidity: 72 },
    'Kolkata': { temp: 28, icon: 'thunder', condition: 'Thunderstorms', humidity: 88 },
    'Indore': { temp: 30, icon: 'part-sun', condition: 'Partly Sunny', humidity: 55 },
    'Srinagar': { temp: 2, icon: 'snow', condition: 'Frost & Freeze', humidity: 85 },
    'Shimla': { temp: 4, icon: 'snow', condition: 'Frost & Freeze', humidity: 78 },
    'Jaisalmer': { temp: 42, icon: 'heatwave', condition: 'Heatwave & Dust', humidity: 15 },
    'Amritsar': { temp: 14, icon: 'fog', condition: 'Dense Fog', humidity: 95 },
    'Chennai': { temp: 31, icon: 'humidity', condition: 'Heavy Humidity', humidity: 88 }
  };

  const base = baselines[city] || { temp: 31, icon: 'sun', condition: 'Sunny', humidity: 50 };
  const dailyData = [];
  const today = new Date();

  for (let i = 0; i < 5; i++) {
    const dateObj = new Date(today);
    dateObj.setDate(today.getDate() + i);

    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    const dateFormatted = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    let dayTemp = base.temp;
    let dayHumidity = base.humidity;
    let dayIcon = base.icon;
    let dayCondition = base.condition;

    if (i > 0) {
      // Small variation per day
      dayTemp += Math.floor(Math.sin(i) * 3);
      dayHumidity = Math.max(10, Math.min(100, dayHumidity + Math.floor(Math.cos(i) * 10)));
      if (base.icon === 'sun' && i === 2) {
        dayIcon = 'part-sun';
        dayCondition = 'Partly Sunny';
      }
    }

    let alert = null;
    let recommendation = 'Weather returning to normal. Safe to resume organic fertilizer application and weeding.';

    if (dayIcon === 'heavy-rain') {
      alert = '⚠️ Severe weather alert: Heavy downpour expected. Keep drainage clear.';
      recommendation = 'Postpone irrigation. Cover harvested grain sacks and check water logging in low areas.';
    } else if (dayIcon === 'thunder') {
      alert = '⚠️ Storm warning: Gusty winds and lightning. Avoid operating machinery in fields.';
      recommendation = 'Avoid spraying chemical fertilizers or pesticides. Rain will wash them away completely.';
    } else if (dayIcon === 'fog') {
      alert = '🌫️ Reduced visibility warning: Dense fog or haze. Use caution in transport.';
      recommendation = 'High dampness can lead to early blight. Delay morning pesticide sprays until fog lifts.';
    } else if (dayIcon === 'snow') {
      alert = '❄️ Frost warning: Freezing temperatures. Cover vulnerable young shoots.';
      recommendation = 'Protect roots from frost damage. Consider light mulch or night heating if possible.';
    } else if (dayIcon === 'heatwave' || dayTemp >= 40) {
      dayIcon = 'heatwave';
      dayCondition = 'Heatwave & Dust';
      alert = '🔥 Heatwave alert: Extreme temperatures. Protect crops from sun scorch.';
      recommendation = 'Increase watering frequency. Avoid any mechanical stress or pruning during peak heat hours.';
    } else if (dayHumidity >= 80) {
      dayIcon = 'humidity';
      dayCondition = 'Heavy Humidity';
      recommendation = 'Heavy humidity. Highly favorable for fungal leaf infections. Keep scanning crops for spots.';
    } else if (dayTemp > 30) {
      recommendation = 'Best time for irrigation: Today after 5:00 PM. High soil evaporation rate during noon.';
    } else if (dayIcon === 'cloudy') {
      recommendation = 'Humidity is high. Favorable for fungal leaf infections. Keep scanning crops for spots.';
    }

    const uvIndex = dayTemp > 30 ? '8 (Very High)' : (dayTemp > 25 ? '5 (Moderate)' : '2 (Low)');
    const windSpeed = Math.round(12 + Math.sin(i) * 5);
    const rainChance = dayIcon === 'heavy-rain' || dayIcon === 'thunder' ? 90 : (dayIcon === 'cloudy' ? 20 : 5);

    dailyData.push({
      day: i === 0 ? 'Today' : dayName,
      date: dateFormatted,
      temp: dayTemp,
      condition: dayCondition,
      humidity: dayHumidity,
      rainChance: rainChance,
      wind: windSpeed,
      uvIndex: uvIndex,
      alert: alert,
      recommendation: recommendation,
      icon: dayIcon
    });
  }
  return dailyData;
};

export default function WeatherForecast({ userLocation = { city: 'Delhi', district: 'New Delhi', state: 'Delhi' }, language = 'en', setLanguage }) {
  const t = {
    en: {
      title: "Weather & Irrigation Advisory",
      subtitle: "Real-time agricultural weather forecasts and guidelines",
      smartRec: "Smart Farming Recommendation",
      outlook: "5-Day Outlook",
      selected: "Selected:",
      today: "Today",
      humidity: "HUMIDITY",
      rainChance: "RAIN CHANCE",
      windSpeed: "WIND SPEED",
      uvIndex: "UV INDEX",
      alertTitle: "Alert Warning",
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
      alertRain: "⚠️ Severe weather alert: Heavy downpour expected. Keep drainage clear.",
      recommendRain: "Postpone irrigation. Cover harvested grain sacks and check water logging in low areas.",
      alertThunder: "⚠️ Storm warning: Gusty winds and lightning. Avoid operating machinery in fields.",
      recommendThunder: "Avoid spraying chemical fertilizers or pesticides. Rain will wash them away completely.",
      alertFog: "🌫️ Reduced visibility warning: Dense fog or haze. Use caution in transport.",
      recommendFog: "High dampness can lead to early blight. Delay morning pesticide sprays until fog lifts.",
      alertSnow: "❄️ Frost warning: Freezing temperatures. Cover vulnerable young shoots.",
      recommendSnow: "Protect roots from frost damage. Consider light mulch or night heating if possible.",
      alertHeatwave: "🔥 Heatwave alert: Extreme temperatures. Protect crops from sun scorch.",
      recommendHeatwave: "Increase watering frequency. Avoid any mechanical stress or pruning during peak heat hours.",
      recommendHumidity: "Heavy humidity. Highly favorable for fungal leaf infections. Keep scanning crops for spots.",
      recommendSunny: "Ideal time for harvesting or soil prep. High soil evaporation during peak noon hours.",
      recommendNormal: "Weather returning to normal. Safe to resume organic fertilizer application and weeding.",
      days: {
        "Sunday": "Sunday",
        "Monday": "Monday",
        "Tuesday": "Tuesday",
        "Wednesday": "Wednesday",
        "Thursday": "Thursday",
        "Friday": "Friday",
        "Saturday": "Saturday",
        "Today": "Today"
      },
      daysShort: {
        "Sunday": "Sun",
        "Monday": "Mon",
        "Tuesday": "Tue",
        "Wednesday": "Wed",
        "Thursday": "Thu",
        "Friday": "Fri",
        "Saturday": "Sat",
        "Today": "Today"
      }
    },
    hi: {
      title: "मौसम और सिंचाई सलाह",
      subtitle: "वास्तविक समय कृषि मौसम पूर्वानुमान और दिशा-निर्देश",
      smartRec: "स्मार्ट खेती की सिफारिश",
      outlook: "5-दिवसीय दृष्टिकोण",
      selected: "चयनित:",
      today: "आज",
      humidity: "उमस",
      rainChance: "बारिश की संभावना",
      windSpeed: "हवा की गति",
      uvIndex: "यूवी इंडेक्स",
      alertTitle: "चेतावनी अलर्ट",
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
      alertRain: "⚠️ भारी बारिश की चेतावनी: जलनिकासी व्यवस्था साफ़ रखें।",
      recommendRain: "सिंचाई स्थगित करें। कटी हुई फसल के बोरों को ढकें और जलभराव की जांच करें।",
      alertThunder: "⚠️ आंधी की चेतावनी: तेज हवाएं और बिजली। खेतों में मशीनरी का उपयोग न करें।",
      recommendThunder: "खाद या कीटनाशक छिड़काव से बचें। बारिश इसे पूरी तरह धो देगी।",
      alertFog: "🌫️ कम दृश्यता की चेतावनी: घना कोहरा। यातायात में सावधानी बरतें।",
      recommendFog: "अत्यधिक नमी से झुलसा रोग हो सकता है। कोहरा छटने तक सुबह के छिड़काव को टालें।",
      alertSnow: "❄️ पाला चेतावनी: जमा देने वाला तापमान। नए पौधों को ढक कर रखें।",
      recommendSnow: "जड़ों को पाले से बचाएं। हल्की मल्चिंग करें या रात में गर्मी का प्रबंध करें।",
      alertHeatwave: "🔥 लू की चेतावनी: अत्यधिक तापमान। फसलों को झुलसने से बचाएं।",
      recommendHeatwave: "सिंचाई की आवृत्ति बढ़ाएं। तेज धूप के घंटों में पौधों की कटाई या छंटाई से बचें।",
      recommendHumidity: "अत्यधिक नमी। फंगल पत्ती संक्रमण के लिए अत्यधिक अनुकूल। पत्तों के धब्बों की निगरानी करें।",
      recommendSunny: "फसल कटाई या मिट्टी की तैयारी के लिए सबसे अच्छा समय। दोपहर में वाष्पीकरण अधिक रहता है।",
      recommendNormal: "मौसम सामान्य हो रहा है। जैविक खाद डालने और निराई शुरू करने के लिए सुरक्षित समय।",
      days: {
        "Sunday": "रविवार",
        "Monday": "सोमवार",
        "Tuesday": "मंगलवार",
        "Wednesday": "बुधवार",
        "Thursday": "गुरुवार",
        "Friday": "शुक्रवार",
        "Saturday": "शनिवार",
        "Today": "आज"
      },
      daysShort: {
        "Sunday": "रवि",
        "Monday": "सोम",
        "Tuesday": "मंग",
        "Wednesday": "बुध",
        "Thursday": "गुरु",
        "Friday": "शुक्र",
        "Saturday": "शनि",
        "Today": "आज"
      }
    },
    mr: {
      title: "हवामान आणि सिंचन सल्ला",
      subtitle: "तंतोतंत कृषी हवामान अंदाज आणि मार्गदर्शक तत्त्वे",
      smartRec: "स्मार्ट शेती शिफारस",
      outlook: "५-दिवसांचा अंदाज",
      selected: "निवडलेले:",
      today: "आज",
      humidity: "दमटपणा",
      rainChance: "पावसाची शक्यता",
      windSpeed: "वाऱ्याचा वेग",
      uvIndex: "अतिनील (UV) इंडेक्स",
      alertTitle: "धोकादायक हवामान इशारा",
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
      alertRain: "⚠️ मुसळधार पावसाचा इशारा: पाण्याचा निचरा योग्य ठेवा.",
      recommendRain: "सिंचन पुढे ढकला. कापणी केलेल्या धान्याची पोती झाकून ठेवा आणि पाण्याचा साचलेला निचरा करा.",
      alertThunder: "⚠️ वादळाचा इशारा: वेगवान वारे आणि वीज. शेतात लोखंडी यंत्रसामग्री वापरणे टाळा.",
      recommendThunder: "खत किंवा कीटनाशक फवारणी टाळा. पावसामुळे औषध पूर्णपणे वाहून जाईल.",
      alertFog: "🌫️ कमी दृश्यता इशारा: दाट धुके. प्रवासात काळजी घ्या.",
      recommendFog: "जास्त आर्द्रतेमुळे करपा रोग येऊ शकतो. धुके कमी होईपर्यंत फवारणी करणे टाळा.",
      alertSnow: "❄️ कडाक्याची थंडीचा इशारा: तापमान अतिशय कमी आहे. लहान पिकांना झाकून ठेवा.",
      recommendSnow: "मुळांचे थंडीपासून संरक्षण करा. रात्री पिकांच्या बाजूला हलकी शेकोटी करा.",
      alertHeatwave: "⚠️ उष्णतेची लाट: पिकांचे कडक उन्हापासून रक्षण करा.",
      recommendHeatwave: "पाणी देण्याची वारंवारता वाढवा. दुपारच्या कडक उन्हात मशागतीची कामे टाळा.",
      recommendHumidity: "दमटपणा जास्त आहे. पानांवरील बुरशीजन्य रोगासाठी अनुकूल वेळ. ठिपके तपासा.",
      recommendSunny: "पीक कापणी किंवा शेती मशागतीसाठी योग्य वेळ. दुपारच्या वेळी बाष्पीभवन जास्त राहील.",
      recommendNormal: "हवामान सामान्य होत आहे. सेंद्रिय खते टाकण्यासाठी आणि कोळपणीसाठी योग्य वेळ.",
      days: {
        "Sunday": "रविवार",
        "Monday": "सोमवार",
        "Tuesday": "मंगळवार",
        "Wednesday": "बुधवार",
        "Thursday": "गुरुवार",
        "Friday": "शुक्रवार",
        "Saturday": "शनिवार",
        "Today": "आज"
      },
      daysShort: {
        "Sunday": "रवि",
        "Monday": "सोम",
        "Tuesday": "मंग",
        "Wednesday": "बुध",
        "Thursday": "गुरु",
        "Friday": "शुक्र",
        "Saturday": "शनि",
        "Today": "आज"
      }
    }
  };

  const translateDay = (dayName) => {
    return t[language].days[dayName] || dayName;
  };

  const translateCondition = (conditionName) => {
    switch (conditionName) {
      case 'Sunny': return t[language].sunny;
      case 'Rainy': return t[language].rainy;
      case 'Heavy Rain': return t[language].heavyRain;
      case 'Thunderstorm':
      case 'Thunderstorms': return t[language].thunder;
      case 'Cloudy': return t[language].cloudy;
      case 'Partly Sunny': return t[language].partSun;
      case 'Dense Fog': return t[language].fog;
      case 'Frost & Freeze': return t[language].snow;
      case 'Heatwave & Dust': return t[language].heatwave;
      case 'Heavy Humidity': return t[language].heavyHumidity;
      default: return conditionName;
    }
  };

  const getAdvisoryDetails = (item) => {
    let alert = null;
    let recommendation = t[language].recommendNormal;

    if (item.icon === 'heavy-rain') {
      alert = t[language].alertRain;
      recommendation = t[language].recommendRain;
    } else if (item.icon === 'thunder') {
      alert = t[language].alertThunder;
      recommendation = t[language].recommendThunder;
    } else if (item.icon === 'fog') {
      alert = t[language].alertFog;
      recommendation = t[language].recommendFog;
    } else if (item.icon === 'snow') {
      alert = t[language].alertSnow;
      recommendation = t[language].recommendSnow;
    } else if (item.icon === 'heatwave') {
      alert = t[language].alertHeatwave;
      recommendation = t[language].recommendHeatwave;
    } else if (item.icon === 'humidity') {
      recommendation = t[language].recommendHumidity;
    } else if (item.icon === 'sun') {
      recommendation = t[language].recommendSunny;
    }

    return { alert, recommendation };
  };

  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  React.useEffect(() => {
    async function fetchWeather() {
      const queryCity = userLocation?.city || 'Delhi';
      try {
        setLoading(true);
        setError(null);

        // If it is a developer testing session, bypass API fetch and immediately use regional mock forecasts
        if (userLocation?.isTestingSession) {
          console.warn('Developer testing session detected, loading local preset configurations for forecast.');
          const mockData = generateMockForecast(queryCity);
          setForecastData(mockData);
          setError(null);
          setLoading(false);
          return;
        }

        // Retrieve the API Key from the secure env setup
        const apiKey = import.meta.env.VITE_262c19f3d2e51310dba4b741108b7ffe;

        // If the key is not set or is the placeholder, load local mock forecast
        if (!apiKey || apiKey.includes('placeholder') || apiKey === '') {
          console.warn('VITE_262c19f3d2e51310dba4b741108b7ffe key is placeholder, loading mock forecast data.');
          const mockData = generateMockForecast(queryCity);
          setForecastData(mockData);
          setError(null);
          setLoading(false);
          return;
        }

        // Call the Weather API dynamically for the selected city
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${queryCity},IN&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
          throw new Error('Weather data temporarily unavailable');
        }

        const data = await response.json();

        // Map the 3-hourly forecast data into a daily 5-day format
        const dailyData = [];
        const seenDates = new Set();

        for (const item of data.list) {
          // Extract the date string (YYYY-MM-DD)
          const dateStr = item.dt_txt.split(' ')[0];

          if (!seenDates.has(dateStr)) {
            seenDates.add(dateStr);

            const dateObj = new Date(item.dt * 1000);
            const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
            const dateFormatted = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

            const mainCondition = item.weather[0].main;
            const descCondition = item.weather[0].description;
            const windSpeed = Math.round(item.wind.speed * 3.6); // m/s to km/h
            const rainChance = Math.round((item.pop || 0) * 100);
            const humidity = item.main.humidity;
            const temp = Math.round(item.main.temp);

            let condition = mainCondition;
            let icon = 'sun';

            // Mapping for standard and additional weather states matching the video assets
            if (temp >= 40) {
              condition = 'Heatwave & Dust';
              icon = 'heatwave';
            } else if (temp <= 5 || mainCondition === 'Snow') {
              condition = 'Frost & Freeze';
              icon = 'snow';
            } else if (mainCondition === 'Clear') {
              condition = 'Sunny';
              icon = 'sun';
            } else if (mainCondition === 'Rain' || mainCondition === 'Drizzle') {
              condition = descCondition.includes('heavy') ? 'Heavy Rain' : 'Rainy';
              icon = 'heavy-rain';
            } else if (mainCondition === 'Thunderstorm') {
              condition = 'Thunderstorms';
              icon = 'thunder';
            } else if (['Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Ash', 'Squall', 'Tornado'].includes(mainCondition)) {
              condition = mainCondition === 'Fog' ? 'Dense Fog' : mainCondition;
              icon = 'fog';
            } else if (humidity >= 80) {
              condition = 'Heavy Humidity';
              icon = 'humidity';
            } else if (mainCondition === 'Clouds') {
              condition = 'Cloudy';
              icon = 'cloudy';
            } else {
              condition = mainCondition;
              icon = 'part-sun';
            }

            let alert = null;
            let recommendation = 'Weather returning to normal. Safe to resume organic fertilizer application and weeding.';

            if (icon === 'heavy-rain') {
              alert = '⚠️ Severe weather alert: Heavy downpour expected. Keep drainage clear.';
              recommendation = 'Postpone irrigation. Cover harvested grain sacks and check water logging in low areas.';
            } else if (icon === 'thunder') {
              alert = '⚠️ Storm warning: Gusty winds and lightning. Avoid operating machinery in fields.';
              recommendation = 'Avoid spraying chemical fertilizers or pesticides. Rain will wash them away completely.';
            } else if (icon === 'fog') {
              alert = '🌫️ Reduced visibility warning: Dense fog or haze. Use caution in transport.';
              recommendation = 'High dampness can lead to early blight. Delay morning pesticide sprays until fog lifts.';
            } else if (icon === 'snow') {
              alert = '❄️ Frost warning: Freezing temperatures. Cover vulnerable young shoots.';
              recommendation = 'Protect roots from frost damage. Consider light mulch or night heating if possible.';
            } else if (icon === 'heatwave') {
              alert = '🔥 Heatwave alert: Extreme temperatures. Protect crops from sun scorch.';
              recommendation = 'Increase watering frequency. Avoid any mechanical stress or pruning during peak heat hours.';
            } else if (icon === 'humidity') {
              recommendation = 'Heavy humidity. Highly favorable for fungal leaf infections. Keep scanning crops for spots.';
            } else if (temp > 30) {
              recommendation = 'Best time for irrigation: Today after 5:00 PM. High soil evaporation rate during noon.';
            } else if (icon === 'cloudy') {
              recommendation = 'Humidity is high. Favorable for fungal leaf infections. Keep scanning crops for spots.';
            }

            const uvIndex = temp > 30 ? '8 (Very High)' : (temp > 25 ? '5 (Moderate)' : '2 (Low)');

            dailyData.push({
              day: dailyData.length === 0 ? 'Today' : dayName,
              date: dateFormatted,
              temp: temp,
              condition: condition,
              humidity: humidity,
              rainChance: rainChance,
              wind: windSpeed,
              uvIndex: uvIndex,
              alert: alert,
              recommendation: recommendation,
              icon: icon
            });

            if (dailyData.length >= 5) break;
          }
        }

        if (dailyData.length === 0) {
          throw new Error('No weather data parsed');
        }

        setForecastData(dailyData);
        setLoading(false);
      } catch (err) {
        console.warn('Weather API failed, using regional mock forecast:', err);
        try {
          const mockData = generateMockForecast(queryCity);
          setForecastData(mockData);
          setError(null);
        } catch (fallbackErr) {
          setError('Weather data temporarily unavailable');
        }
        setLoading(false);
      }
    }

    fetchWeather();
  }, [userLocation]);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-3 p-6 text-slate-500 bg-[#fdfdfc]">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center animate-pulse">
          <CloudSun className="w-6 h-6 text-emerald-700 animate-bounce" />
        </div>
        <p className="text-sm font-semibold animate-pulse text-emerald-950">Fetching live weather advisories...</p>
      </div>
    );
  }

  if (error || forecastData.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6 text-slate-500 bg-[#fdfdfc]">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-rose-600" />
        </div>
        <div className="text-center">
          <p className="text-sm font-extrabold text-slate-800">{error || 'Weather data temporarily unavailable'}</p>
          <p className="text-xs text-slate-400 mt-1 font-medium px-4">
            Please verify your Internet connection or check your API keys in the .env file.
          </p>
        </div>
      </div>
    );
  }

  const activeWeather = forecastData[activeIndex];

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

  const getWeatherIcon = (type, sizeClass = 'w-6 h-6') => {
    switch (type) {
      case 'sun':
        return <Sun className={`${sizeClass} text-amber-300 animate-spin-slow`} />;
      case 'heavy-rain':
        return <CloudRain className={`${sizeClass} text-blue-300`} />;
      case 'thunder':
        return <CloudLightning className={`${sizeClass} text-indigo-300`} />;
      case 'cloudy':
        return <Cloud className={`${sizeClass} text-slate-300`} />;
      case 'part-sun':
        return <CloudSun className={`${sizeClass} text-amber-300`} />;
      case 'fog':
        return <CloudFog className={`${sizeClass} text-slate-300 opacity-90`} />;
      case 'snow':
        return <CloudSnow className={`${sizeClass} text-blue-200`} />;
      case 'heatwave':
        return <Sun className={`${sizeClass} text-orange-400 animate-pulse`} />;
      case 'humidity':
        return <Droplets className={`${sizeClass} text-teal-300`} />;
      default:
        return <Sun className={`${sizeClass} text-amber-300`} />;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-5 flex flex-col gap-4 text-slate-800">
      
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">{t[language].title}</h1>
          <p className="text-xs text-slate-500 font-medium">{t[language].subtitle}</p>
        </div>
        
        {/* Language Selector Dropdown */}
        <select 
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-emerald-50 border border-emerald-100 rounded-xl px-2.5 py-1.5 text-xs font-bold text-emerald-800 cursor-pointer focus:outline-none hover:bg-emerald-100 transition-colors shadow-2xs"
        >
          <option value="en">EN</option>
          <option value="hi">हिन्दी</option>
          <option value="mr">मराठी</option>
        </select>
      </div>

      {/* Main Focus Card with dynamic Video background */}
      <div className="bg-slate-900 border border-white/10 rounded-2xl p-5 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-card relative overflow-hidden text-white">
        
        {/* Background Video */}
        <video
          key={activeWeather.icon} // Key forces video reload on day change
          src={getWeatherVideo(activeWeather.icon)}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />
        
        {/* Subtle Dark Overlay */}
        <div className="absolute inset-0 bg-slate-950/40 z-0 pointer-events-none" />

        {/* Content Container (Layered on top of video) */}
        <div className="relative z-10 flex flex-col">
          {/* Top Details */}
          <div className="flex justify-between items-start">
            <div>
              <span className="px-2.5 py-0.5 text-[9px] font-extrabold uppercase rounded-full bg-white/20 text-white border border-white/10 backdrop-blur-xs">
                {t[language].selected} {translateDay(activeWeather.day)} ({activeWeather.date})
              </span>
              <div className="flex items-baseline gap-2 flex-wrap mt-3">
                <span className="text-4.5xl font-black text-white tracking-tight leading-none drop-shadow-sm">{activeWeather.temp}°C</span>
                <span className="text-xs font-bold text-white bg-white/15 border border-white/10 px-2.5 py-1 rounded-full backdrop-blur-xs inline-block whitespace-nowrap leading-none uppercase tracking-wider">{translateCondition(activeWeather.condition)}</span>
              </div>
            </div>
            
            <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/10 flex items-center justify-center shadow-2xs backdrop-blur-xs group-hover:scale-105 transition-transform duration-200">
              {getWeatherIcon(activeWeather.icon, 'w-9 h-9')}
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4 mt-5 pt-4 border-t border-white/10">
            
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/15 border border-white/10 text-white flex items-center justify-center shrink-0">
                <Droplets className="w-4.5 h-4.5 text-blue-300" />
              </div>
              <div>
                <span className="text-[9px] text-slate-300/80 font-bold block leading-none uppercase tracking-wide">{t[language].humidity}</span>
                <span className="text-xs font-black text-white mt-1 block">{activeWeather.humidity}%</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/15 border border-white/10 text-white flex items-center justify-center shrink-0">
                <CloudRain className="w-4.5 h-4.5 text-indigo-300" />
              </div>
              <div>
                <span className="text-[9px] text-slate-300/80 font-bold block leading-none uppercase tracking-wide">{t[language].rainChance}</span>
                <span className="text-xs font-black text-white mt-1 block">{activeWeather.rainChance}%</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/15 border border-white/10 text-white flex items-center justify-center shrink-0">
                <Wind className="w-4.5 h-4.5 text-amber-300" />
              </div>
              <div>
                <span className="text-[9px] text-slate-300/80 font-bold block leading-none uppercase tracking-wide">{t[language].windSpeed}</span>
                <span className="text-xs font-black text-white mt-1 block">{activeWeather.wind} km/h</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/15 border border-white/10 text-white flex items-center justify-center shrink-0">
                <Thermometer className="w-4.5 h-4.5 text-orange-300" />
              </div>
              <div>
                <span className="text-[9px] text-slate-300/80 font-bold block leading-none uppercase tracking-wide">{t[language].uvIndex}</span>
                <span className="text-xs font-black text-white mt-1 block">{activeWeather.uvIndex}</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Prominent Severe Alerts Banner with Glow */}
      {getAdvisoryDetails(activeWeather).alert && (
        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 shadow-[0_0_12px_rgba(220,38,38,0.08)] hover:shadow-md transition-card flex items-start gap-2.5 animate-pulse-slow">
          <AlertTriangle className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-[10px] font-black text-rose-955 uppercase tracking-wider">{t[language].alertTitle}</h3>
            <p className="text-xs text-rose-850 font-bold mt-1 leading-relaxed">
              {getAdvisoryDetails(activeWeather).alert}
            </p>
          </div>
        </div>
      )}

      {/* Smart Irrigation Advisory Recommendation */}
      <div className="bg-emerald-50 border border-emerald-100/60 rounded-2xl p-4 shadow-sm hover:shadow-md transition-card">
        <div className="flex items-center gap-1.5 mb-2.5 text-emerald-955 font-bold text-xs uppercase tracking-wider">
          <Navigation className="w-4 h-4 text-emerald-700 rotate-45 shrink-0" />
          {t[language].smartRec}
        </div>
        <p className="text-xs text-slate-700 font-semibold leading-relaxed">
          {getAdvisoryDetails(activeWeather).recommendation}
        </p>
      </div>

      {/* 5-Day Weekly Carousel Forecast */}
      <div>
        <div className="flex items-center gap-1.5 mb-2.5 text-slate-400">
          <Calendar className="w-4.5 h-4.5 text-emerald-700" />
          <h2 className="text-xs font-bold uppercase tracking-wider">{t[language].outlook}</h2>
        </div>
        
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
          {forecastData.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`flex-none w-[72px] p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-card active:scale-90 hover:-translate-y-0.5 cursor-pointer ${
                idx === activeIndex
                  ? 'bg-gradient-to-br from-emerald-600 to-emerald-800 border-emerald-700 text-white shadow-md font-bold'
                  : 'bg-white border-slate-100 text-slate-650 hover:border-emerald-200 hover:shadow-sm'
              }`}
            >
              <span className={`text-[9px] uppercase tracking-wider font-bold leading-none ${idx === activeIndex ? 'text-emerald-100' : 'text-slate-400'}`}>
                {language === 'en' ? (item.day === 'Today' ? 'Today' : item.day.substring(0, 3)) : (t[language].daysShort[item.day] || item.day)}
              </span>
              <div className="w-7 h-7 flex items-center justify-center">
                {getWeatherIcon(item.icon, idx === activeIndex ? 'w-6 h-6 text-white' : 'w-5.5 h-5.5')}
              </div>
              <span className="text-xs font-extrabold leading-none tracking-tight">{item.temp}°C</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
