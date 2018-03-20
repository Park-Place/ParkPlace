const functions = require('firebase-functions');
const BASE_MAPS_URL = 'https://maps.googleapis.com/maps/api/';
const API_KEY = 'AIzaSyCcWQftr51E8GZR0nFG2N207HZm8cLIM2Y';
const client = require('superagent');
const cors = require('cors')();

exports.getPlacesByTextSearch = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    client.get(`${BASE_MAPS_URL}place/textsearch/json?query=${req.query.query}&types=park&key=${API_KEY}`)
      .then(({ body }) => res.json(body.results))
      .catch(error => {
        console.log(error);
        res.sendStatus(500);
      });
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
      .then(({ body }) => res.json(body.results))
      .catch(error => {
        console.log(error);
        res.sendStatus(500);
      });
  });
});

exports.getParkImage = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    client.get(`${BASE_MAPS_URL}place/photo?photoreference=${req.query.photoId}&maxwidth=${req.query.maxWidth}&key=${API_KEY}`)
      .then(({ body }) => res.json(body))
      .catch(error => {
        console.log(error);
        res.sendStatus(500);
      });
  });
});