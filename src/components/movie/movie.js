import './movie.css'
import { Rate } from 'antd'
import { Component } from 'react'
import format from 'date-fns/format'

import GenresList from '../genres-list'
import { hideLongDescription } from '../../utils'

class Movie extends Component {
  state = {
    onRatingChange: this.props.onRatingChange,

    id: this.props.film.id,
    poster_path: this.props.film.poster_path
      ? 'https://image.tmdb.org/t/p/original' + this.props.film.poster_path
      : './none-poster.jpg',
    overview: this.props.film.overview,
    title: this.props.film.title,

    release_date:
      this.props.film.release_date === '' ? '' : format(new Date(this.props.film.release_date), 'MMMM d, yyyy'),
    //vote_average: this.props.film.vote_average,
    vote_average: null,
  }

  render() {
    const { onRatingChange, id, overview, title, release_date, poster_path, vote_average } = this.state
    //console.log(this.props.film)

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
            defaultValue={Number(vote_average)}
            count={10}
            style={{ fontSize: '15px' }}
            onChange={(newRating) => {
              onRatingChange(id, newRating)
              console.log(this.props.film)
            }}
          />
        </div>
        <img className="movie__poster" width="183" height="281" alt="Movie poster" src={poster_path} />
      </li>
    )
  }
}
export default Movie
