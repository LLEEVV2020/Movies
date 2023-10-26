import { Space, Typography } from 'antd'

import './movies-list.css'
import Movie from '../movie'

const { Text } = Typography

function MoviesList({ arrFilms }) {
  return (
    <ul className="movies__list">
      {console.log(arrFilms)}

      {arrFilms.length ? (
        arrFilms.map((film) => {
          return <Movie key={film.id} film={film} />
        })
      ) : (
        <Space direction="vertical" style={{ textAlign: 'center', width: '100%' }}>
          <Text type="secondary">There are no films matching your request.</Text>
        </Space>
      )}
    </ul>
  )
}

export default MoviesList
