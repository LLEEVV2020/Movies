import React, { Component } from 'react'
import { Pagination } from 'antd'
import _ from 'lodash'
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
      queru: 'return',
      isLoading: true,
      error: false,
      offline: false,

      ratedFilmsStorage: this.props.ratedFilmsStorage,
    }
  }

  loadingService = (page = 1, queru) => {
    this.apiService
      .getFilms(page, queru)

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

    this.loadingService(this.state.currentPage, this.state.queru)
  }

  /*componentDidUpdate(prevState) {
    if (this.state.currentPage == !prevState.currentPage) {
      this.loadingService(this.state.currentPage)
    }
  }*/

  /** переключение пагинации */
  paginationChangeHandler = (page) => {
    //console.log(page)
    this.setState({
      currentPage: page,
      isLoading: true,
    })
    this.loadingService(page, this.state.queru)
  }

  debauncedSearchInputChangeHandler = _.debounce((searchQuery) => {
    //if (searchQuery) fetchData(getFilmsByQuery.bind(null, searchQuery, DEFAULT_PAGE), searchQuery)
    // else fetchData(getRandomFilms.bind(null, currentPage))
    if (searchQuery) {
      this.setState({
        isLoading: true,
      })
      this.loadingService(this.state.currentPage, searchQuery)
    }
  }, 1000)

  render() {
    const { arrFilms, isLoading, error, offline, queru } = this.state
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
    // проверка на ошибку 404
    if (error) {
      return <ErrorPopap type={'error'} name={error.name} message={error.message} />
    }

    return (
      <section className="movies">
        <NavTabs />
        {this.state.ratedFilmsStorage.getItems()}
        {this.state.ratedFilmsStorage._storeKey}

        <Search searchQuery={queru} changeHandler={this.debauncedSearchInputChangeHandler} />
        {contentLoading}
      </section>
    )
  }
}
export default App
