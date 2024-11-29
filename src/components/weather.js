import React, { useState, useEffect } from 'react';
import { getCurrentWeatherData, getWeeklyWeatherData } from '../api/OpenWeatherData';
import './weather.css';

const Weather = () => {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [weeklyWeatherData, setWeeklyWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const currentWeatherData = await getCurrentWeatherData('Toronto');
        const weeklyWeatherData = await getWeeklyWeatherData('Toronto');

        setCurrentWeatherData(currentWeatherData);
        setWeeklyWeatherData(weeklyWeatherData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div class="main-container">
        <div class="weather-card">
            <div class="current-weather">
                <div class="weather-content">
                    <h1 class="city-name">{currentWeatherData?.name}</h1>
                    <div class="temperature-details">
                        <p class="temperature">{Math.round(currentWeatherData?.main?.temp)}°C</p>
                        <p class="feels-like">Feels like: {Math.round(currentWeatherData?.main?.feels_like)}°C</p>
                    </div>
                </div>
                <p class="current-date">{new Date().toLocaleDateString()}</p>
            </div>

            {currentWeatherData && (
                <div class="current-condition">
                    <div class="condition-info">
                        <p>{currentWeatherData.main.humidity}%</p>
                        <p class="info-label">Humidity</p>
                    </div>
                    <div class="condition-info">
                        <p>{currentWeatherData.clouds.all}%</p>
                        <p  class="info-label">Cloudiness</p>
                    </div>
                    <div class="condition-info">
                        <p>{currentWeatherData.wind.speed} m/s</p>
                        <p  class="info-label">Wind Speed</p>
                    </div>
                </div>
            )}

            {weeklyWeatherData && (
                    <div class="five-day-forecast-container">
                        {weeklyWeatherData.list
                            .filter((forecast, index, self) => {
                                const forecastDate = new Date(forecast.dt_txt).setHours(0, 0, 0);
                                return index === self.findIndex(
                                    (t) => new Date(t.dt_txt).setHours(0, 0, 0) === forecastDate
                                );
                            })
                            .slice(0, 5)
                            .map((forecast, index) => {
                                const iconCode = forecast.weather[0].icon;
                                const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
                                return (
                                    <div key={index} class="forecast-card">
                                        <p class="forecast-date">
                                            {new Date(forecast.dt_txt).toLocaleDateString('en-US', {
                                                weekday: 'short',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </p>
                                        <img src={iconUrl} alt="Forecast icon" class="forecast-icon" />
                                        <p class="forecast-temp">{Math.round(forecast.main.temp)}°C</p>
                                    </div>
                                );
                            })}
                    </div>
            )}
        </div>
    </div>
);
};

export default Weather;

