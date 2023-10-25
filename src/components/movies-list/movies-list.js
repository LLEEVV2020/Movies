import { Component } from 'react'
import { Space, Typography } from 'antd'

import GeneralApiService from '../../services/api'
import './movies-list.css'
import Movie from '../movie'

const { Text } = Typography

class MoviesList extends Component {
  apiService = new GeneralApiService()
  customFilm = null

  state = {
    films: null,
  }
  componentDidMount() {
    this.updateFilms()
  }

  updateFilms() {
    this.apiService
      .getFilms()
      .then((films) => {
        this.customFilm = films
        //console.log(films)
        //console.log(this.customFilm)
        //console.log(this.state.films)
      })
      .catch((err) => {
        console.error('Отсутствие фильмов', err)
      })
  }

  render() {
    return (
      <ul className="movies__list">
        <Space direction="vertical" style={{ textAlign: 'center', width: '100%' }}>
          <Text type="secondary">There are no films matching your request.</Text>
          {Math.floor(Math.random() * 19)}
        </Space>
        {console.log(this.customFilm)}
        <Movie />
        <Movie />
        <Movie />
        <Movie />
        <Movie />
        <Movie />
      </ul>
    )
  }
}

export default MoviesList
