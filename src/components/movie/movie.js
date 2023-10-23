import './movie.css'
import { Rate } from 'antd'

import GenresList from '../genres-list'

function Movie() {
  return (
    <li className="movies__item movie">
      <div className="movie__content">
        <div className="movie__inner">
          <h3 className="movie__title">film.title</h3>
          <h4 className="movie__date">film.releaseDate</h4>
          <GenresList />
          <div className="movie__desc">loremlorem loremlorem loremlorem lorem</div>
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
      <img
        className="movie__poster"
        width="183"
        height="281"
        alt="Movie poster"
        src={'https://re.pro-dex.ru/img.jpg'}
      />
    </li>
  )
}
export default Movie
