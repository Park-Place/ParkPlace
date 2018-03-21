const functions = require('firebase-functions');
const BASE_MAPS_URL = 'https://maps.googleapis.com/maps/api/';
const API_KEY = 'AIzaSyCcWQftr51E8GZR0nFG2N207HZm8cLIM2Y';
const client = require('superagent');
const cors = require('cors')();

exports.getPlacesByTextSearch = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    client.get(`${BASE_MAPS_URL}place/textsearch/json?query=${req.query.query}&types=park&key=${API_KEY}`)
      .pipe(res);
  });
});


exports.getGeocodeByQuery = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    client.get(`${BASE_MAPS_URL}geocode/json?address=${req.query.query}&key=${API_KEY}`)
      .then(({ body }) => { 
        const lat = body.results[0].geometry.location.lat;
        const long = body.results[0].geometry.location.lng;    
        res.json({ lat, long });
      })
      .catch(error => {
        console.log(error);
        res.sendStatus(500);
      });
  });
});

exports.getParksByLocation = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    client.get(`${BASE_MAPS_URL}place/nearbysearch/json?location=${req.query.lat},${req.query.long}&radius=500000&types=park&key=${API_KEY}`)
      .pipe(res);
  });
});


exports.getParkDetail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    client.get(`${BASE_MAPS_URL}place/details/json?placeid=${req.query.id}&key=${API_KEY}`)
      .pipe(res);
  });
});

exports.updateUserDerived = functions.database.ref('/parksReviewed/{parkId}/reviews').onWrite((event) => {
  const reviews = event.data.val();
  const averageRatingRef = event.data.ref.parent.child('averageRating');
  const tagsRef = event.data.ref.parent.child('tags');
  const amenitiesRef = event.data.ref.parent.child('amenities');
  const reviewsArray = Object.keys(reviews).map(key => reviews[key]);

  const sum = reviewsArray.map(review => review.rating).reduce((a, b) => a + b);
  const count = reviewsArray.length;

  const averageRating = Math.round(sum / count);

  const tags = createTagsObject(reviewsArray, 'tags');
  const amenities = createTagsObject(reviewsArray, 'amenities');

  return Promise.all([
    averageRatingRef.set(averageRating),
    tagsRef.set(tags),
    amenitiesRef.set(amenities)
  ]);
});

const createTagsObject = (array, tagName) => {
  return array.reduce((map, review) => {
    review[tagName].forEach(tag => {
      if(map[tag]) map[tag]++;
      else map[tag] = 1;
    });
    return map;
  }, Object.create(null));
};