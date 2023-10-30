import './genres-list.css'
import Genre from '../genre'

function GenresList({ genres }) {
  return (
    <ul className="movie__genres-lsit">
      {genres.map((genre) => (
        <Genre genreName={genre.name} key={genre.id} />
      ))}
    </ul>
  )
}

export default GenresList
