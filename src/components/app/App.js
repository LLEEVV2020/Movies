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
import { ProviderMovie } from '../genres-context/genres-context'
// https://platform.kata.academy/user/courses/3/2/3/13   ---- 6 34

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

      currentTab: 'Search',
      genres: [],
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
  loadingMovieGenresList = () => {
    this.apiService
      .getMovieGenresList()

      .then((films) => {
        //console.log(films)

        // получаем список жанров фильмов
        //
        this.setState({
          genres: films,
        })
      })
      .catch((err) => {
        console.error('Отсутствие жанров', err)
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
    this.loadingMovieGenresList()
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

  /** поиск фильмов через инпут */
  debauncedSearchInputChangeHandler = _.debounce((searchQuery) => {
    if (searchQuery) {
      this.setState({
        isLoading: true,
      })
      this.loadingService(this.state.currentPage, searchQuery)
    }
  }, 1000)

  tabChangeHandler = (newTab) => {
    if (newTab === this.state.currentTab) return
    if (newTab === 'Search') {
      console.log(newTab)
      this.setState({
        currentTab: 'Search',
      })
      this.loadingService(this.state.currentPage, this.state.queru)
    }
    if (newTab === 'Rated') {
      console.log(newTab)
      this.setState({
        currentTab: 'Rated',
      })
      this.loadingService(this.state.currentPage, 'king')
    }
  }

  filmRateChangeHandler = (movieId, newRating) => {
    console.log(movieId, newRating)
  }

  render() {
    const { arrFilms, isLoading, error, offline, queru, currentTab, genres } = this.state
    let contentLoading = isLoading ? (
      <Spinner />
    ) : (
      <>
        <ProviderMovie value={genres}>
          {
            /*genres.map((home) => (
            <div key={Math.floor(Math.random())}>{home}</div>
          ))*/
            //console.log(genres, 'hghhhh')
          }
          <MoviesList arrFilms={arrFilms} onRatingChange={this.filmRateChangeHandler} />
          <Pagination
            style={{ textAlign: 'center' }}
            defaultCurrent={this.state.currentPage}
            pageSize={20}
            total={this.state.total}
            onChange={this.paginationChangeHandler}
            showSizeChanger={false}
          />
        </ProviderMovie>
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
        <NavTabs onChnage={this.tabChangeHandler} />

        {this.state.ratedFilmsStorage.getItems()}
        {this.state.ratedFilmsStorage._storeKey}

        {currentTab === 'Search' ? (
          <Search searchQuery={queru} changeHandler={this.debauncedSearchInputChangeHandler} />
        ) : null}

        {contentLoading}
      </section>
    )
  }
}
export default App
