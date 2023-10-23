import './movie.css'

function Movie() {
  return (
    <li className="movies__item movie">
      <div className="movie__content">
        <h3 className="movie__title">film.title</h3>
        <h4 className="movie__date">film.releaseDate</h4>
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
