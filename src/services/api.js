const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NGQwMDc5ODYyMmUxN2U4NTYxZmUxZTE2MGYyYjYyZiIsInN1YiI6IjY1MzYxMDFmOTFmMGVhMDBlMWFiZjAxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kKFU3t1hLbBasFrwRHQ165a5ou17x8jEXii39AL6BEk',
  },
}

fetch('https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1', options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err))
