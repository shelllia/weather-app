import React, { useEffect, useState } from 'react';
import search_icon from '../assets/search-interface-symbol.png';
import sun from '../assets/sun.png';
import few_clouds from '../assets/cloudy-day.png';
import clouds from '../assets/clouds.png';
import heavy_rain from '../assets/heavy-rain.png';
import thunderstorm from '../assets/thunderstorm.png';
import snow from '../assets/snowflake.png';
import mist from '../assets/mist.png';

import Spinner from './spinner/Spinner'

import humidity from '../assets/humidity.png';
import wind from '../assets/wind.png';

import './weather.css';

const Weather = () => {
    const [input, setInput] = useState('');
    const [weatherData, setWeatherData] = useState(null); 
    const [loading, setLoading] = useState(false)
    const allIcons = {
        "01d": sun,
        "02d": few_clouds,
        "03d": clouds,
        "04d": clouds,
        "09d": heavy_rain,
        "10d": heavy_rain,
        "11d": thunderstorm,
        "13d": snow,
        "50d": mist
    };

    const search = async (city) => {
        try {
            setLoading(true)
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=363777b7d6e054a7c50e428e7be7afd6`;
            const result = await fetch(url);
            const data = await result.json();
            const icon = allIcons[data.weather[0].icon] || sun;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    };

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleSearchClick = async () => {
        await search(input);
    };

    useEffect(() => {
        search(''); 
    }, []);


    const spinner = loading ? <Spinner/> : null;
    const content = !loading ? <View weatherData={weatherData}/> : null

    return (
        <div className='weather'>
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder='Search' 
                    value={input}
                    onChange={handleInputChange}
                />
                <img 
                    src={search_icon} 
                    alt="search icon" 
                    onClick={handleSearchClick} 
                />
            </div>
            {spinner}
            {content}
        </div>
    );
};

const View = ({ weatherData }) => {
    if (!weatherData) return null;

    return (
        <>
            <img src={weatherData.icon} alt="weather icon" className='weather-icon' />
            <p className='temperature'>{weatherData.temperature}°C</p>
            <p className='location'>{weatherData.location}</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidity} alt="humidity" />
                    <div>
                        <p>{weatherData.humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={wind} alt="wind" />
                    <div>
                        <p>{weatherData.windSpeed} Km/h</p>
                        <span>Wind speed</span>
                    </div>
                </div>
            </div>
        </>
    );
};


export default Weather;
