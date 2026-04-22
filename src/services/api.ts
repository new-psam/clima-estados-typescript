import { WeatherData } from '@/types/weather';
import axios from 'axios';

const API_KEY = '950b101b558aa4a014fba2e073c2cdad';

export const getWeather = async (city: string): Promise<WeatherData | null> => {
    try {
        const res = await axios.get<WeatherData>(
            `https://api.openweathermap.org/data/2.5/weather?q=${city},BR&units=metric&lang=pt_br&appid=${API_KEY}`
        );
        return res.data;
    } catch (error) {
        console.error(`Erro ao buscar ${city}:`, error);
        return null;
    }
};