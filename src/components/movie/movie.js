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
        src={'https://image.tmdb.org/t/p/original/mOX5O6JjCUWtlYp5D8wajuQRVgy.jpg'}
      />
    </li>
  )
}
export default Movie
