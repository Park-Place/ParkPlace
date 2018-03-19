import { get, getCORS } from './request';
const BASE_MAPS_URL = 'https://maps.googleapis.com/maps/api/';
const API_KEY = 'AIzaSyCcWQftr51E8GZR0nFG2N207HZm8cLIM2Y';


export const getPlacesByTextSearch = (query) => get(`https://us-central1-park-place-pnw.cloudfunctions.net/getPlacesByTextSearch?query=${query}`);

export const getGeocodeByQuery = (query) => get(`https://us-central1-park-place-pnw.cloudfunctions.net/getGeocodeByQuery?query=${query}`);


export const getPlacesByLocation = (query) => getGeocodeByQuery(query)
  .then(({ lat, long }) => get(`https://us-central1-park-place-pnw.cloudfunctions.net/getParksByLocation?lat=${lat}&long=${long}`));




