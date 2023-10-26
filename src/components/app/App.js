import React, { Component } from 'react'
import { Pagination } from 'antd'
import './app.css'

import NavTabs from '../nav-tabs'
import Search from '../search'
import MoviesList from '../movies-list'
import GeneralApiService from '../../services/api'

class App extends Component {
  apiService = new GeneralApiService()

  constructor(props) {
    super(props)
    this.state = {
      arrFilms: [],
      isLoading: true,
    }
  }

  componentDidMount() {
    this.apiService
      .getFilms()
      .then((films) => {
        //arrFilms = films
        //console.log(films)
        this.setState({
          arrFilms: films,
          isLoading: false,
        })
        console.log(films)
      })
      .catch((err) => {
        console.error('Отсутствие фильмов', err)
      })
  }

  render() {
    const { arrFilms, isLoading } = this.state

    return (
      <section className="movies">
        <NavTabs />
        <Search />
        {isLoading ? <p>Spinner</p> : <MoviesList arrFilms={arrFilms} />}

        <Pagination
          style={{ textAlign: 'center' }}
          defaultCurrent={null}
          pageSize={null}
          total={null}
          onChange={null}
          showSizeChanger={false}
        />
      </section>
    )
  }
}
export default App
