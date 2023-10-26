import './movie.css'
import { Rate } from 'antd'
import { Component } from 'react'

import GenresList from '../genres-list'
import { hideLongDescription } from '../../utils'

class Movie extends Component {
  state = {
    id: this.props.film.id,
    poster_path: this.props.film.poster_path
      ? 'https://image.tmdb.org/t/p/original' + this.props.film.poster_path
      : './none-poster.jpg',
    overview: this.props.film.overview,
    title: this.props.film.title,
    release_date: this.props.film.release_date,
    vote_average: null,
  }

  componentDidMount() {}

  render() {
    const { overview, title, release_date, poster_path } = this.state

    return (
      <li className="movies__item movie">
        <div className="movie__content">
          <div className="movie__inner">
            <h3 className="movie__title">{title}</h3>
            <h4 className="movie__date">{release_date}</h4>
            <GenresList />
            <div className="movie__desc">{hideLongDescription(overview)}</div>
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
