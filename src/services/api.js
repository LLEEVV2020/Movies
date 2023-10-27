const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NGQwMDc5ODYyMmUxN2U4NTYxZmUxZTE2MGYyYjYyZiIsInN1YiI6IjY1MzYxMDFmOTFmMGVhMDBlMWFiZjAxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kKFU3t1hLbBasFrwRHQ165a5ou17x8jEXii39AL6BEk',
  },
}

export default class GeneralApiService {
  /*async getResource(url) {
    try {
      const res = await fetch(url, options)
      if (!res.ok) {
        throw new Error(`Возможно не правильный путь ссылки ${url}  ${res.status}`)
        //
      }
  
      const body = await res.json()
      return body

    } catch (error) {
      return res.status
      //console.error('Error:', error);
    }
  }*/
  _PAGE = 1
  _URL = 'https://api.themoviedb.org/3/search/movie?query='
  _QUERU = 'return'
  _URLPar = '&include_adult=false&language=en-US&page='

  async getResource(url) {
    const res = await fetch(url, options)
    if (!res.ok) {
      throw new Error(`Возможно не правильный путь ссылки ${url}  ${res.status}`)
      //
    }

    const body = await res.json()

    return body
  }

  async getFilms(page) {
    this._PAGE = page
    const res = await this.getResource(this._URL + this._QUERU + this._URLPar + this._PAGE)
    //console.log(res)
    return res
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
