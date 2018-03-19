import { get } from './request';
const BASE_MAPS_URL = 'https://maps.googleapis.com/maps/api/';
const API_KEY = 'AIzaSyCcWQftr51E8GZR0nFG2N207HZm8cLIM2Y';


export const getSearchByKeyword = (query) => get(`${BASE_MAPS_URL}place/textsearch/json?query=${query}&types=park&${API_KEY}`);

export const getSearchByLocation = (query) => get(`${BASE_MAPS_URL}place/geocode/json?address=${encodeURI(query)}&${API_KEY}`);

(lat, long) => get(`${BASE_MAPS_URL}place/nearbysearch/json?location=${lat},${long}&radius=500000&types=park&${API_KEY}`);




