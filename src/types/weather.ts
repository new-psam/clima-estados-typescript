export interface WeatherData {
    id: number;
    name: string;
    main: {
        temp: number;
        temp_min: number;
        temp_max: number;
        humidity: number;
        pressure: number;
        feels_like: number;
    };
    weather: Array<{
        description: string;
        icon: string;
    }>;
    wind: {
        speed: number;
    };
}

export interface CityItem {
    id: string;
    name: string;
}