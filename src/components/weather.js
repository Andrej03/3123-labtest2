import React, { useState, useEffect } from 'react';
import { getCurrentWeatherData, getWeeklyWeatherData } from '../api/axios';
import './weather.css';

const Weather = () => {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [weeklyWeather, setWeeklyWeather] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const currentWeatherData = await getCurrentWeatherData('Toronto');
                const weeklyWeatherData = await getWeeklyWeatherData('Toronto');

                setCurrentWeather(currentWeatherData);
                setWeeklyWeather(weeklyWeatherData);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeatherData();
    }, []);

    return (
        <div class="weather-container">
            <div class="weather-card">
                <div class="weather-header">
                    {currentWeather ? (
                        <>
                            <h1 class="city-name">{currentWeather.name}
                                <p class="current-date">
                                    {new Date().toLocaleDateString()}
                                </p>
                            </h1>
                            <div class="current-weather">
                                <div>
                                    <p class="temperature">{Math.round(currentWeather.main.temp)}°C</p>
                                    <p class="label">Temperature</p>
                                </div>
                                <div>
                                    <p class="humidity">{currentWeather.main.humidity}%</p>
                                    <p class="label">Humidity</p>
                                </div>
                                <div>
                                    <p class="wind-speed">{currentWeather.wind.speed} m/s</p>
                                    <p class="label">Wind Speed</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p>Loading current weather...</p>
                    )}
                </div>
                <div class="forecast-section">
                    <div class="forecast-list">
                        {weeklyWeather ? (
                            weeklyWeather.list
                                .filter(
                                    (forecast, index, self) =>
                                        index ===
                                        self.findIndex(
                                            (t) =>
                                                new Date(t.dt_txt).toLocaleDateString('en-US') ===
                                                new Date(forecast.dt_txt).toLocaleDateString('en-US')
                                        )
                                )
                                .slice(0, 5)
                                .map((forecast, index) => {
                                    const forecastIconCode = forecast.weather[0].icon;
                                    const forecastIconUrl = `https://openweathermap.org/img/wn/${forecastIconCode}@2x.png`;
                                    return (
                                        <div key={index} class="forecast-card">
                                            <p class="forecast-date">
                                                {new Date(forecast.dt_txt).toLocaleDateString('en-US', {
                                                    weekday: 'short',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </p>
                                            <img src={forecastIconUrl} alt="Forecast icon" />
                                            <p class="forecast-temp">
                                                {Math.round(forecast.main.temp)}°C
                                            </p>
                                            <p class="forecast-humidity">
                                                {forecast.main.humidity}% Humidity
                                            </p>
                                        </div>
                                    );
                                })
                        ) : (
                            <p>Loading forecast...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weather;
