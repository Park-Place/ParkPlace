import { get, getCORS } from './request';
const BASE_MAPS_URL = 'https://maps.googleapis.com/maps/api/';
const API_KEY = 'AIzaSyCcWQftr51E8GZR0nFG2N207HZm8cLIM2Y';


export const getPlacesByTextSearch = (query) => get(`https://us-central1-park-place-pnw.cloudfunctions.net/getPlacesByTextSearch?query=${query}`);

export const getGeocodeByQuery = (query) => get(`${BASE_MAPS_URL}place/geocode/json?address=${encodeURI(query)}&${API_KEY}`)
  .then(response => {
    const lat = response.results[0].geometry.location.lat;
    const long = response.results[0].geometry.location.lng;
    return { lat, long };
  });


export const getPlacesByLocation = (query) => getGeocodeByQuery(query)
  .then(({ lat, long }) => get(`${BASE_MAPS_URL}place/nearbysearch/json?location=${lat},${long}&radius=500000&types=park&${API_KEY}`));




