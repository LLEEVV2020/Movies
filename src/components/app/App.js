import React, { Component } from 'react'

import './app.css'

import NavTabs from '../nav-tabs'
import Search from '../search'
import MoviesList from '../movies-list'

class App extends Component {
  render() {
    return (
      <section className="movies">
        <NavTabs />
        <Search />
        <MoviesList />
      </section>
    )
  }
}
export default App
