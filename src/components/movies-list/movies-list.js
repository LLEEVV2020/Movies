import { Space, Typography } from 'antd'

import './movies-list.css'
import Movie from '../movie'

const { Text } = Typography

function MoviesList() {
  return (
    <ul className="movies__list">
      <Space direction="vertical" style={{ textAlign: 'center', width: '100%' }}>
        <Text type="secondary">There are no films matching your request.</Text>
        {Math.floor(Math.random() * 19)}
      </Space>

      <Movie />
      <Movie />
      <Movie />
      <Movie />
      <Movie />
      <Movie />
    </ul>
  )
}

export default MoviesList
