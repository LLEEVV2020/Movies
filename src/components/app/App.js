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
      total: 0, // количество фильмов
      currentPage: 1, // текущая странница пагинации
      isLoading: true,
      error: false,
      offline: false,
    }
  }

  loadingService = (page = 1) => {
    this.apiService
      .getFilms(page)

      .then((films) => {
        // console.log(films)
        this.setState({
          arrFilms: films.results,
          total: films.total_results,
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
  componentDidMount() {
    if (!navigator.onLine) {
      this.setState({
        offline: true,
      })
    }

    this.loadingService(this.state.currentPage)
  }

  /*componentDidUpdate(prevState) {
    if (this.state.currentPage == !prevState.currentPage) {
      this.loadingService(this.state.currentPage)
    }
  }*/

  paginationChangeHandler = (page) => {
    console.log(page)
    this.setState({
      currentPage: page,
      isLoading: true,
    })
    this.loadingService(page)
  }

  render() {
    const { arrFilms, isLoading, error, offline } = this.state
    let contentLoading = isLoading ? (
      <Spinner />
    ) : (
      <>
        <MoviesList arrFilms={arrFilms} />
        <Pagination
          style={{ textAlign: 'center' }}
          defaultCurrent={this.state.currentPage}
          pageSize={20}
          total={this.state.total}
          onChange={this.paginationChangeHandler}
          showSizeChanger={false}
        />
      </>
    )

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
      </section>
    )
  }
}
export default App
