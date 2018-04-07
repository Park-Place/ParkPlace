const functions = require('firebase-functions');
const BASE_MAPS_URL = 'https://maps.googleapis.com/maps/api/';
const API_KEY = 'AIzaSyCcWQftr51E8GZR0nFG2N207HZm8cLIM2Y';
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
        const { lat, long } = body.results[0].geometry.location;    
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

exports.updateUserDerived = functions.database.ref('/parksReviewed/{parkId}/reviews').onWrite(({ data }) => {
  const reviews = data.val();
  const { parent } = data.ref.parent;
  const averageRatingRef = parent.child('averageRating');
  const tagsRef = parent.child('tags');
  const amenitiesRef = parent.child('amenities');

  const { averageRating, tags, amenities } = getAggregates(reviews);
  
  return Promise.all([
    averageRatingRef.set(averageRating),
    tagsRef.set(tags),
    amenitiesRef.set(amenities)
  ]);
});

const EMPTY = {
  averageRating: null,
  tags: null,
  amenities: null
};

const getAggregates = reviews => {
  if(!reviews || Object.keys(reviews).length === 0) return EMPTY;

  const reviewsArray = Object.keys(reviews).map(key => reviews[key]);

  const sum = reviewsArray.map(review => review.rating).reduce((a, b) => a + b);
  const count = reviewsArray.length;

  return {
    averageRating: count !== 0 ? Math.round(sum / count) : null,
    tags: createTagsObject(reviewsArray, 'tags'),
    amenities: createTagsObject(reviewsArray, 'amenities')
  };
};

const createTagsObject = (array, tagName) => {
  return array.reduce((map, review) => {
    review[tagName].forEach(tag => {
      if(map[tag]) map[tag]++;
      else map[tag] = 1;
    });
    return map;
  }, Object.create(null));
};

