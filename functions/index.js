const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')();
const BASE_MAPS_URL = 'https://maps.googleapis.com/maps/api/';
const API_KEY = 'AIzaSyCcWQftr51E8GZR0nFG2N207HZm8cLIM2Y';
admin.initializeApp(functions.config().firebase);

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

exports.updateUserDerived = functions.database.ref('/reviewsByPark/{parkId}').onWrite(({ data, params }) => {
  const derivedParkDataRef = admin.database().ref('derivedParkData');
  const reviewsRef = admin.database().ref('reviews');
  const reviewIds = data.val();
  const parkId = params.parkId;
  const parent = derivedParkDataRef.child(parkId);
  const averageRatingRef = parent.child('averageRating');
  const tagsRef = parent.child('tags');
  const amenitiesRef = parent.child('amenities');
  
  getReviews(reviewsRef, reviewIds)
    .then((reviews) => {
      const { averageRating, tags, amenities } = getAggregates(reviews);

      return Promise.all([
        averageRatingRef.set(averageRating),
        tagsRef.set(tags),
        amenitiesRef.set(amenities)
      ]);
    });
  
});

const getReviews = (reviewsRef, reviewIds) => {
  let reviews = [];
  for(let key in reviewIds) {
    reviews.push(reviewsRef.child(key).once('value'));
  }
  return Promise.all(reviews);
};

const EMPTY = {
  averageRating: null,
  tags: null,
  amenities: null
};

const getAggregates = reviews => {
  if(!reviews || reviews.length === 0) return EMPTY;

  const sum = reviews.map(review => review.val().rating).reduce((a, b) => a + b);
  const count = reviews.length;

  return {
    averageRating: count !== 0 ? Math.round(sum / count) : null,
    tags: createTagsObject(reviews, 'tags'),
    amenities: createTagsObject(reviews, 'amenities')
  };
};

const createTagsObject = (array, tagName) => {
  return array.reduce((map, review) => {
    const alteredReview = review.val();
    alteredReview[tagName].forEach(tag => {
      if(map[tag]) map[tag]++;
      else map[tag] = 1;
    });
    return map;
  }, Object.create(null));
};

