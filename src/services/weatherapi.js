import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/weather',
});
export default function getWeatherDetails(cityId) {
  return api
    .get(`?appid=13fdb39fa4267ca2300edbfdd1e93501&id=${cityId}`)
    .then((response) => {
      return response.data;
    })
    .catch((e) => ({
      error: e.message,
    }));
}
