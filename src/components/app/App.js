import React, { Component } from 'react'
import { Pagination } from 'antd'
import './app.css'

import NavTabs from '../nav-tabs'
import Search from '../search'
import MoviesList from '../movies-list'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arrFilms: this.props.arrFilms,
    }
  }

  render() {
    const { arrFilms } = this.state

    return (
      <section className="movies">
        <NavTabs />
        <Search />
        <MoviesList arrFilms={arrFilms} />
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
