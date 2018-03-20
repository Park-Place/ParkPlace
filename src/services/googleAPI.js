import { get } from './request';

export const getPlacesByTextSearch = (query) => get(`https://us-central1-park-place-pnw.cloudfunctions.net/getPlacesByTextSearch?query=${query}`);

export const getGeocodeByQuery = (query) => get(`https://us-central1-park-place-pnw.cloudfunctions.net/getGeocodeByQuery?query=${query}`);


export const getPlacesByLocation = (query) => getGeocodeByQuery(query)
  .then(({ lat, long }) => get(`https://us-central1-park-place-pnw.cloudfunctions.net/getParksByLocation?lat=${lat}&long=${long}`))
  .then(res => {
    const images = res.map(park => {
      if(park.photos) return getParkImage(park.photos[0].photo_reference, 500)
        .then(image => park.image = image);
    });
    return Promise.all(images)
      .then(resp => resp);
  });

export const getParkImage = (id, width) => get(`https://us-central1-park-place-pnw.cloudfunctions.net/getParkImage?maxWidth=${width}&photoId=${id}`);


