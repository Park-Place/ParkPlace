import { get } from './request';
const BASE_MAPS_URL = 'https://maps.googleapis.com/maps/api/';
const API_KEY = 'AIzaSyCcWQftr51E8GZR0nFG2N207HZm8cLIM2Y';

export const getPlacesByTextSearch = (query) => get(`https://us-central1-park-place-pnw.cloudfunctions.net/getPlacesByTextSearch?query=${query}`)
  .then(body  => body.results);

export const getGeocodeByQuery = (query) => get(`https://us-central1-park-place-pnw.cloudfunctions.net/getGeocodeByQuery?query=${query}`);

export const getPlacesByLocation = (query) => getGeocodeByQuery(query)
  .then(({ lat, long }) => get(`https://us-central1-park-place-pnw.cloudfunctions.net/getParksByLocation?lat=${lat}&long=${long}`))
  .then(body => body.results);

export const getParkImage = (id, width) => `${BASE_MAPS_URL}place/photo?photoreference=${id}&maxwidth=${width}&key=${API_KEY}`;


export const getParkDetail = (id) => get(`https://us-central1-park-place-pnw.cloudfunctions.net/getParkDetail?id=${id}`)
  .then(body  => body.result);