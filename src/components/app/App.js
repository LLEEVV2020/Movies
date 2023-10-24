import React, { Component } from 'react'
import { Pagination } from 'antd'
import './app.css'

import NavTabs from '../nav-tabs'
import Search from '../search'
import MoviesList from '../movies-list'

//import { getFilmsByQuery } from '../../services/api'

class App extends Component {
  render() {
    return (
      <section className="movies">
        <NavTabs />
        <Search />
        <MoviesList />
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
