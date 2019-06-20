const spomenici = [];
const resultList = document.querySelector('#resultList');
const searchInp = document.querySelector('#searchInp');
let latlng;

fetch('https://spomenici-api.herokuapp.com/kolekcija/novogroblje')
  .then(response => response.json())
  .then(data => {
    return spomenici.push(data.data);
  });

function search() {
  let matched = '';
  resultList.innerHTML = '';
  if (this.value !== '' && this.value !== ' ') {
    const inpValue = this.value.toUpperCase();

    matched = spomenici[0].filter(spomenik => {
      return spomenik.naslov.toUpperCase().indexOf(inpValue) !== -1;
    });

    matched.forEach(match => {
      const li = document.createElement('li');
      li.innerText = match.naslov;
      const { lat, lon } = match.lokacija;
      li.dataset.lat = lat;
      li.dataset.lon = lon;
      resultList.appendChild(li);
      resultList.style.display = 'block';
      li.addEventListener('click', () => {
        latlng = new google.maps.LatLng(li.dataset.lat, li.dataset.lon);
        searchInp.value = li.innerText;
        resultList.style.display = 'none';
      });
    });
  }
}

function showChosenLocation(map) {
  searchInp.value = '';
  map.setCenter(latlng);
  map.setZoom(18);
}

export { search, showChosenLocation };
