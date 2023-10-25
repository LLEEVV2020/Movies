import './movie.css'
import { Rate } from 'antd'
import { Component } from 'react'

import GeneralApiService from '../../services/api'
import GenresList from '../genres-list'

class Movie extends Component {
  apiService = new GeneralApiService()

  state = {
    id: null,
    poster_path: './none-poster.jpg',
    overview: 'loremlorem loremlorem loremlorem lorem',
    title: 'film.title2',
    release_date: 'film.releaseDate',
    vote_average: null,
  }

  constructor() {
    super()
    this.updateFilms()
  }

  updateFilms() {
    this.apiService
      .getFilms()
      .then((films) => {
        films.forEach((film, index) => {
          if (index === 9) {
            this.setState({
              overview: film.overview,
              title: film.title,
              release_date: film.release_date,
              poster_path: film.poster_path
                ? 'https://image.tmdb.org/t/p/original' + film.poster_path
                : './none-poster.jpg',
            })
          }
          console.log(film)
          console.log(film.poster_path)
        })
      })
      .catch((err) => {
        console.error('Ошибка', err)
      })
  }

  render() {
    const { overview, title, release_date, poster_path } = this.state

    return (
      <li className="movies__item movie">
        <div className="movie__content">
          <div className="movie__inner">
            <h3 className="movie__title">{title}</h3>
            <h4 className="movie__date">{release_date}</h4>
            <GenresList />
            <div className="movie__desc">{overview}</div>
            <div className="movie__rating-number rating-number">7 </div>
          </div>
          <Rate
            className="movie__rating"
            allowHalf
            defaultValue={null}
            count={10}
            style={{ fontSize: '15px' }}
            onChange={null}
          />
        </div>
        <img className="movie__poster" width="183" height="281" alt="Movie poster" src={poster_path} />
      </li>
    )
  }
}
export default Movie
