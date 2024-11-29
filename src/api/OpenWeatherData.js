const API_KEY = '57b4bcff1db5aae67ca96baa54d3ce60';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getCurrentWeatherData = async (city = 'Toronto') => {
    const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
        console.error('Error in getCurrentWeatherData:', data.message);
        throw new Error(data.message);
    }
    return data;
};

export const getWeeklyWeatherData = async (city = 'Toronto') => {
    const url = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
        console.error('Error in getWeeklyWeatherData:', data.message);
        throw new Error(data.message);
    }
    return data;
};
