import React, { Component } from 'react'
import { Pagination } from 'antd'
import './app.css'

import NavTabs from '../nav-tabs'
import Search from '../search'
import MoviesList from '../movies-list'
import GeneralApiService from '../../services/api'
import Spinner from '../spinner'
import ErrorPopap from '../popup'

class App extends Component {
  apiService = new GeneralApiService()

  constructor(props) {
    super(props)
    this.state = {
      arrFilms: [],
      isLoading: true,
      error: false,
      offline: false,
    }
  }

  componentDidMount() {
    if (!navigator.onLine) {
      this.setState({
        offline: true,
      })
    }

    this.apiService
      .getFilms()

      .then((films) => {
        this.setState({
          arrFilms: films,
          isLoading: false,
        })
        //
      })
      .catch((err) => {
        console.error('Отсутствие фильмов', err)
        this.setState({
          error: err,
        })
      })
  }

  render() {
    const { arrFilms, isLoading, error, offline } = this.state
    let contentLoading = isLoading ? <Spinner /> : <MoviesList arrFilms={arrFilms} />

    // проверка есть ли интернет у пользователя
    if (offline) {
      return <ErrorPopap offline />
    }
    if (error) {
      return <ErrorPopap type={'error'} name={error.name} message={error.message} />
    }

    return (
      <section className="movies">
        <NavTabs />
        <Search />
        {contentLoading}

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
