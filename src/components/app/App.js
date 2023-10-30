import React, { Component } from 'react'
import { Pagination } from 'antd'
import _ from 'lodash'
import './app.css'

import NavTabs from '../nav-tabs'
import Search from '../search'
import MoviesList from '../movies-list'
import GeneralApiService from '../../services/api'
import AppStorage from '../../services/storage'
import Spinner from '../spinner'
import ErrorPopap from '../popup'
import { ProviderMovie } from '../genres-context/genres-context'
// https://platform.kata.academy/user/courses/3/2/3/13   ---- 6 34

class App extends Component {
  apiService = new GeneralApiService()
  ratedFilms = new AppStorage('rated-films3', window.localStorage)

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
      ratedFilmsStorage: this.ratedFilms /*this.props.ratedFilmsStorage*/,
    }
  }

  loadingService = (page = 1, queru) => {
    this.apiService
      .getFilms(page, queru)

      .then((films) => {
        films.results.forEach((item) => {
          const arrFILMStorage = this.state.ratedFilmsStorage.getItems()

          //console.log(arrFILMStorage)
          //console.log(item)
          //console.log(item.id)

          const movieGenres = arrFILMStorage.filter((genre) => {
            if (item.id === genre.id) {
              item.rating = genre.rating
              return true
            } else {
              return false
            }
          })
          if (movieGenres.length === 0) {
            item.rating = null
          }
        })
        //console.log(films.results)

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

      .then((genres) => {
        //console.log(genres)

        // получаем список жанров фильмов
        //
        this.setState({
          genres: genres,
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
        isLoading: true,
      })
      this.loadingService(this.state.currentPage, this.state.queru)
    }
    if (newTab === 'Rated') {
      console.log(newTab)
      this.setState({
        currentTab: 'Rated',
        isLoading: true,
      })

      this.loadingService(this.state.currentPage, 'king')
    }
  }

  filmRateChangeHandler = (movieId, newRating) => {
    //console.log(movieId, newRating, 'hhhhhhh')
    const index = this.state.arrFilms.findIndex((film) => film.id === movieId)
    const newFilm = Object.assign({}, this.state.arrFilms[index])
    newFilm.rating = newRating

    this.setState({
      arrFilms: [...this.state.arrFilms.slice(0, index), newFilm, ...this.state.arrFilms.slice(index + 1)],
    })

    const storagedFilms = this.state.ratedFilmsStorage.getItems()
    const storageIndex = storagedFilms.findIndex((film) => {
      //console.log(film.id)
      return film.id === movieId
    })

    //console.log(storagedFilms)
    //console.log(storageIndex)

    //if (~storageIndex) storagedFilms[storageIndex] = newFilm
    //else storagedFilms.unshift(newFilm)
    if (~storageIndex) {
      storagedFilms[storageIndex] = newFilm
    } else {
      storagedFilms.unshift(newFilm)
    }

    this.state.ratedFilmsStorage.setItems(storagedFilms)

    //console.log(hyhh)
    //console.log(newFilm.rating)
    //console.log(index)
    //console.log(newFilm)
    //console.log(this.state.arrFilms)
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

        {currentTab === 'Search' ? (
          <Search searchQuery={queru} changeHandler={this.debauncedSearchInputChangeHandler} />
        ) : null}

        {contentLoading}
      </section>
    )
  }
}
export default App
