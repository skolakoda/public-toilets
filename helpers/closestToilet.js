/* eslint-disable func-names */
import map from './map.js';

let allMarkers;
let start;
let end;
function rad(x) {
  return (x * Math.PI) / 180;
}
function findNearestMarker(lat, lng) {
  const R = 6371; // radius of earth in km
  const distances = [];
  let closest = -1;
  allMarkers.forEach((marker, i) => {
    const mlat = marker.position.lat();
    const mlng = marker.position.lng();
    const dLat = rad(mlat - lat);
    const dLong = rad(mlng - lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(lat)) * Math.cos(rad(lat)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    distances[i] = d;
    if (closest === -1 || d < distances[closest]) {
      closest = i;
    }
  });
  return closest;
}
function drawRoute() {
  const directionsService = new google.maps.DirectionsService();
  const directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);
  const request = {
    origin: start,
    destination: end,
    travelMode: 'WALKING'
  };
  directionsService.route(request, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    }
  });
}
function findNearest(lat, lng) {
  const nearestMarker = allMarkers[findNearestMarker(lat, lng)];
  map.panTo(nearestMarker.getPosition());
  end = `${nearestMarker.getPosition().lat()},${nearestMarker.getPosition().lng()}`;
  map.setZoom(14);
  drawRoute();
}
function findNearestLocation(markers) {
  allMarkers = markers;
  let pos;
  navigator.geolocation.getCurrentPosition(({ coords }) => {
    pos = {
      lat: coords.latitude,
      lng: coords.longitude
    };
    start = `${pos.lat},${pos.lng}`;
  });
  function ab() {
    findNearest(pos.lat, pos.lng);
  }
  setTimeout(ab, 1000);
}
export default findNearestLocation;
