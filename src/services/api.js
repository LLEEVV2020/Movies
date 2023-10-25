const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NGQwMDc5ODYyMmUxN2U4NTYxZmUxZTE2MGYyYjYyZiIsInN1YiI6IjY1MzYxMDFmOTFmMGVhMDBlMWFiZjAxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kKFU3t1hLbBasFrwRHQ165a5ou17x8jEXii39AL6BEk',
  },
}

export default class GeneralApiService {
  async getResource(url) {
    const res = await fetch(url, options)

    if (!res.ok) {
      throw new Error(`Возможно не правильный путь ссылки ${url}  ${res.status}`)
    }

    const body = await res.json()
    return body
  }

  async getFilms() {
    const res = await this.getResource(
      'https://api.themoviedb.org/3/search/movie?query=return&include_adult=false&language=en-US&page=1'
    )
    return res.results
  }
}

/*const apiService = new GeneralApiService()
apiService
  .getFilms()
  .then((films) => {
    films.forEach((film) => {
      console.log(film)
      console.log(film.overview)
    })
  })
  .catch((err) => {
    console.error('Ошибка', err)
  })*/
