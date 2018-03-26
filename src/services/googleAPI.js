import { get } from './request';
const BASE_MAPS_URL = 'https://maps.googleapis.com/maps/api/';
const PROXY_URL = 'https://us-central1-park-place-pnw.cloudfunctions.net';
const API_KEY = 'AIzaSyCcWQftr51E8GZR0nFG2N207HZm8cLIM2Y';

// since many of these are doing body => body.results, cloud function should have only sent back results...

export const getPlacesByTextSearch = (query) => get(`${PROXY_URL}/getPlacesByTextSearch?query=${query}`)
  .then(body  => body.results);

export const getGeocodeByQuery = (query) => get(`${PROXY_URL}/getGeocodeByQuery?query=${query}`);
  
export const getPlacesByLocation = (query) => getGeocodeByQuery(query)
  .then(({ lat, long }) => get(`${PROXY_URL}/getParksByLocation?lat=${lat}&long=${long}`))
  .then(body => body.results);

export const getParkImage = (id, width) => `${BASE_MAPS_URL}place/photo?photoreference=${id}&maxwidth=${width}&key=${API_KEY}`;


export const getParkDetail = (id) => get(`${PROXY_URL}/getParkDetail?id=${id}`)
  .then(body  => body.result);