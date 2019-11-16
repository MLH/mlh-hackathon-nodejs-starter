const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBDt1MrMe8V_FVK3sEjIDdgs2PDkvVvnW0'
});

// Should return GeoCode (Cooridnates) for Googles HQ
googleMapsClient.geocode({
  address: '1600 Amphitheatre Parkway, Mountain View, CA'
}, function(err, response) {
  if (!err) {
    console.log(response.json.results);
  }
});

// Promise based solution 
// const googleMapsClient = require('@google/maps').createClient({
//   key: 'your API key here',
//   Promise: Promise
// });

// googleMapsClient.geocode({address: '1600 Amphitheatre Parkway, Mountain View, CA'})
//   .asPromise()
//   .then((response) => {
//     console.log(response.json.results);
//   })
//   .catch((err) => {
//     console.log(err);
//   });