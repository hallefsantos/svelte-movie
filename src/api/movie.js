import {API_KEY, http} from './http';

export const fetchMovies = term => {
   return http.get(`search/movie?api_key=${API_KEY}&query=${term}`)
}

export const fetchMovie = movieId => {
   return http.get(`movie/${movieId}?api_key=${API_KEY}`)
}