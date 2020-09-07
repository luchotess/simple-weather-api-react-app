import {useEffect, useState} from "react";
import axios from "axios";

class CityWeatherInformation {
    humidity = 0;
    pressure = 0;
    temp = 0;
    temp_max = 0;
    temp_min = 0;

    lon = '';
    lat = '';
    name = '';

    constructor(weatherData) {
        const {name} = weatherData;
        const {humidity, pressure, temp, temp_max, temp_min} = weatherData.main;
        const {lon, lat} = weatherData.coord;

        this.name = name;
        this.humidity = humidity;
        this.pressure = pressure;
        this.temp = temp;
        this.temp_max = temp_max;
        this.temp_min = temp_min;
        this.lon = lon;
        this.lat = lat;
    }
}

export const useDataApi = (initialUrl, initialData) => {
    const [data, setData] = useState(initialData);
    const [url, setUrl] = useState(initialUrl);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);

            try {
                const result = await axios(url);
                setData(new CityWeatherInformation(result.data));
            } catch (error) {
                setIsError(true);
            }

            setIsLoading(false);
        };

        fetchData();
    }, [url]);

    return [{ data, isLoading, isError }, setUrl];
};
