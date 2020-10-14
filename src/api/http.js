import axios from 'axios';
export const API_KEY = 'ab872c8346e93a873401a241a30f8c44';
export const http = axios.create({
   baseURL: 'https://api.themoviedb.org/3/'
});