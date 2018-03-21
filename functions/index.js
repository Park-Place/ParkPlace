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
// https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=YOUR_API_KEY

exports.updateAverageReviewRating = functions.database.ref(`/parksReviewed/{parkId}/reviews/{parkId}/rating`).onWrite((event) => {
  console.log(event.data);
  const allReviews = event.data.ref.parent.parent.val();
  const avgRating = event.data.ref.parent.parent.set.parent.child('averageRating');
  const total = allReviews.reduce((accumulator, review) => accumulator + review.child('rating').val());
  const numberOfReviews = Object.keys(allReviews).length;

  return avgRating.set(total / numberOfReviews);

});

// exports.updateAmenitiesList = functions.database.ref('/parksReviewed/{parkId}/reviews/{parkId}/amenities').onWrite((event) => {
//   const amenities = event.data.val();

// });