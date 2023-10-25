import { Component } from 'react'
import { Space, Typography } from 'antd'

import GeneralApiService from '../../services/api'
import './movies-list.css'
import Movie from '../movie'

const { Text } = Typography

class MoviesList extends Component {
  apiService = new GeneralApiService()

  constructor() {
    super()
    this.updateFilms()
  }

  state = {
    films: null,
  }

  updateFilms() {
    this.apiService
      .getFilms()
      .then((films) => {
        /*this.setState(({ films }) => {
          return {
            films: films,
          }
        })*/
        console.log(films)
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
        {
          //this.state.films.map((film) => {
          // return film
          //})
        }
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
